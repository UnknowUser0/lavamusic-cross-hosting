import { Bridge } from 'discord-cross-hosting';
import { env } from './env';
import Logger from "./structures/Logger";
import {Signale} from "signale";
import {ColorANSI} from "./structures/ColorANSI";

const interactonOption = {
    disabled: false,
    interactive: true,
    types: {
        update: {
            badge: '🔄',
            color: 'green',
            label: 'Update',
        },
    }
};

const interactive = new Signale(interactonOption);

export async function startServer() {
    const server = new Bridge({
        port:parseInt(env.PORT_BOT),
        authToken: `${env.AUTHTOKEN}`,
        totalShards: parseInt(env.TOTALSHARDS),
        totalMachines: parseInt(env.TOTALMACHINES),
        shardsPerCluster: parseInt(env.SHARDPERCLUSTER),
        token: `${env.TOKEN}`,
    });

    const logger = new Logger();
    // server.on("debug", logger.debug);
    server.start();
    logger.success('✅ Cross-Hosting Server is Ready!');
    server.on('ready', () => {
        setInterval(() => {
            const availableShards = new Set(server.shardClusterListQueue.flat(2));

            const coloredShardList = server.shardClusterList
                .map((cluster: any) =>
                    `[ ${cluster.map((shards: any) =>
                        shards.map((shard: number) =>
                            availableShards.has(shard) ? `${ColorANSI.BRIGHT_RED}${shard}${ColorANSI.RESET}` : `${ColorANSI.BRIGHT_GREEN}${shard}${ColorANSI.RESET}`
                        ).join(', ') 
                    ).join(' ] [ ')} ]`
                ).join(' ');

            interactive.update(`🔄  Shard list queue: ${coloredShardList}`);
            }, 1000);
    })

    server.on('disconnect', async () =>{
        server.initializeShardData().then(() => {
            server.shardClusterListQueue = server.shardClusterListQueue.sort((a: any, b: any) => a[0][0] - b[0][0]);
    });
    });

    logger.info(`🌍  Hosting ${server.totalShards} shards across ${server.totalMachines} machines.`);
};

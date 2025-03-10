import { Client } from 'discord-cross-hosting';
import {
    ClusterManager,
    HeartbeatManager,
    ReClusterManager,/* HeartbeatManager, ReClusterManager*/
} from "discord-hybrid-sharding";
import {env} from "./env";
import type Logger from "./structures/Logger";

export async function clusterStart(logger: Logger) {
    const client = new Client({
        agent: 'bot', // must 'bot'
        host: env.HOST_SERVER || 'localhost',
        port: parseInt(env.PORT_BOT),
        authToken: `${env.AUTHTOKEN}`,//env.AUTHTOKEN,
        rollingRestarts: true,
        retries: 360,
    });

    const manager = new ClusterManager(`./dist/LavaClient.js`, {
        token: `${env.TOKEN}`,
        queue: {
            auto: true,
        },
    });

    const requestShardData = async () => {
        const data = await client.requestShardData();
        if (data && data.shardList?.length) {

            manager.totalShards = data.totalShards;
            manager.totalClusters = data.clusterList.length;
            manager.shardList = data.shardList || [];
            manager.clusterList = data.clusterList || [];

            logger.info(`🚀 Spawning ${manager.totalClusters} Clusters...`);
            logger.info(`📌 Total Shards: ${manager.totalShards}`);
            logger.info(`📌 Total Clusters: ${manager.totalClusters}`);
            logger.info(`📌 Shard Distribution: ${manager.shardList.join(", ")}`);

            manager.spawn({timeout: -1})
                .then(() => {
                    logger.success("✅ All Clusters Spawned Successfully!");
                })
                .catch(err => logger.error("❌ Error Spawning Clusters:", err));
        }
    }

    manager.on('clusterCreate', cluster => {
        logger.start(`✅ Launched Cluster ${cluster.id} with shards: [${cluster.shardList.join(", ")}]`);
    });

    manager.on('shardCreate', shard => {
        logger.info(`🟢 Shard ${shard.id} has been created.`);
    });

    manager.on('spawn', (cluster) => {
        logger.info(`🔄 Spawning Cluster ${cluster.id} with shards: ${cluster.shardList.join(", ")}`);
    });

    manager.on('debug', console.log);

    manager.extend(
        new HeartbeatManager({
            interval: 2000, // Interval to send a heartbeat
            maxMissedHeartbeats: 5, // Maximum amount of missed Heartbeats until Cluster will get respawned
        })
    );
    // Enable for zero downtime reclustering : https://github.com/meister03/discord-hybrid-sharding#zero-downtime-reclustering
    manager.extend(
        new ReClusterManager({
            restartMode: 'gracefulSwitch',
        })
    );


    manager.on('clusterDisconnect', (cluster) => {
        logger.warn(`⚠️ Cluster ${cluster.id} disconnected. Reallocating shards...`);
        client.requestShardData(); // Meminta Bridge untuk mendistribusikan ulang shard
    });

    manager.on('clusterError', (cluster, error) => {
        logger.error(`❌ Cluster ${cluster.id} encountered an error: ${error}`);
        client.requestShardData();
    });

    const startClusterManager = async () => {
        try {
            client.connect();
            client.on('ready', () => logger.star('Client is ready'));
            client.listen(manager)
            requestShardData()
        } catch (error) {
            console.error("Discord-Cluster: Start Error", { error });
        }
    }
    startClusterManager();
};

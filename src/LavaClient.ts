import { type ClientOptions, GatewayIntentBits } from 'discord.js';
import { env } from './env';
import Lavamusic from './structures/Lavamusic';
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import { Shard } from "discord-cross-hosting";
import { updateShardStatus } from "./API/updateShardStatus";
const Discord = require('discord.js');
import Logger from "./structures/Logger";
import { formatUptime } from "./structures/formatTime";
import * as readline from "node:readline";
import {ColorANSI} from "./structures/ColorANSI";

const { GuildMembers, MessageContent, GuildVoiceStates, GuildMessages, Guilds, GuildMessageTyping } = GatewayIntentBits;
const { Signale } = require('signale');

const options = {
	disabled: false,
	interactive: false,
	logLevel: 'info',
	scope: 'Lavamusic',
	types: {
		botjoin: {
			badge: '➤',
			color: 'green',
			label: 'Bot Join',
		},
		botleave: {
			badge: '❌',
			color: 'red',
			label: 'Bot Leave',
		}
	}
};

const custom = new Signale(options);
const logger = new Logger();

const clientOptions: ClientOptions = {
	intents: [Guilds, GuildMessages, MessageContent, GuildVoiceStates, GuildMembers, GuildMessageTyping],
	allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
	shards: getInfo().SHARD_LIST,
	shardCount: getInfo().TOTAL_SHARDS,
};

const client1 = new Discord.Client({
	intents: [Guilds, GuildMessages],
	shards: getInfo().SHARD_LIST,
	shardCount: getInfo().TOTAL_SHARDS,
});

const client = new Lavamusic(clientOptions);

client1.cluster = new ClusterClient(client1);
client1.machine = new Shard(client1.cluster);

client1.login(env.TOKEN);
client.start(env.TOKEN);

//===================================================================================//

client.on("guildCreate", (guild) => {
	const shardId = guild.shardId;
	custom.botjoin(`Bot joins server: ${guild.name} (Shard ${shardId})`);
});

client.on("guildDelete", (guild) => {
	const shardId = guild.shardId;
	custom.botleave(`Bot removed from server: ${guild.name} (Shard ${shardId})`);
});

let isFirstLog = true;

async function simulateBotStatusUpdate() {
	const shardData = client.ws.shards.map((shard) => ({
		shardId: shard.id,
		latency: shard.ping,
		status: shard.status,
		servers: client1.guilds.cache.filter((g: any) => g.shardId === shard.id).size,
	}));

	const clusterId = client1.cluster?.id ?? "Unknown";
	const uptime = Math.floor(process.uptime());

	if (isFirstLog) {
		console.clear();
		isFirstLog = false;
	}

	readline.cursorTo(process.stdout, 0, 0);
	readline.clearScreenDown(process.stdout);

	logger.success(`\nUpdated Cluster ${ColorANSI.BRIGHT_CYAN}${clusterId}${ColorANSI.RESET} status:`);
	console.log(ColorANSI.BRIGHT_CYAN + "========================================================" + ColorANSI.RESET);
	shardData.forEach((shard) => {
		let statusShard = "Offline"
		switch (shard.status) {
			case 0: // Ready
				statusShard = `${ColorANSI.BRIGHT_CYAN}Ready${ColorANSI.RESET}`;
				break;
			default:
				statusShard = `${ColorANSI.BRIGHT_GREEN}Offline${ColorANSI.RESET}`;
				break;
		}

		console.log(
			`{ ${ColorANSI.BRIGHT_GREEN}"shardId"${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${shard.shardId}${ColorANSI.RESET}, ${ColorANSI.BRIGHT_GREEN}"latency"${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${shard.latency}${ColorANSI.RESET}ms, ${ColorANSI.BRIGHT_GREEN}"status"${ColorANSI.RESET}: ${statusShard}${ColorANSI.RESET}, ${ColorANSI.BRIGHT_GREEN}"servers"${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${shard.servers}${ColorANSI.RESET} }`
		);
	});
	console.log(ColorANSI.BRIGHT_CYAN + "========================================================" + ColorANSI.RESET);
	console.log(`\nUptime ==> ${await formatUptime(uptime)} <==\n`);

	await Promise.all(
		shardData.map(async (shard) => {
			try {
				await updateShardStatus(clusterId, shard.status, shard.shardId, shard.latency, shard.servers, uptime);
			} catch (err) {
				logger.error(`${ColorANSI.RED}❌ Error updating Cluster ${clusterId} Shard ${shard.shardId} status: ${err}${ColorANSI.RESET}`);
			}
		})
	);
}

client.on("ready", () => setInterval(simulateBotStatusUpdate, 1000));

export async function lastUpdate() {
	const clusterId = client1.cluster?.id ?? "Unknown";
	logger.warn(`${ColorANSI.YELLOW}⚠️ Cluster ${ColorANSI.BRIGHT_CYAN}${clusterId}${ColorANSI.RESET} is disconnecting... Setting cluster to offline.${ColorANSI.RESET}`);

	await Promise.all(
		await client.ws.shards.map(async (shard) => {
			try {
				await updateShardStatus(clusterId, 2, shard.id, -1, client1.guilds.cache.filter((g: any) => g.shardId === shard.id).size, -1);
			} catch (err) {
				logger.error(`${ColorANSI.RED}❌ Error updating offline status for Cluster ${clusterId} Shard ${shard.id}: ${err}${ColorANSI.RESET}`);
			}
		})
	);
};

/**
 * Project: lavamusic
 * Author: Appu
 * Main Contributor: LucasB25
 * Company: Coders
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/YQsGbTwPBx
 */

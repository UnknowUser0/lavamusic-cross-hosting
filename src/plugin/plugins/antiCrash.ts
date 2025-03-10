import type { Lavamusic } from '../../structures/index';
import type { BotPlugin } from '../index';
import {lastUpdate} from "../../LavaClient";


const antiCrash: BotPlugin = {
	name: 'AntiCrash Plugin',
	version: '1.0.0',
	author: 'Appu',
	initialize: (client: Lavamusic) => {
		const handleExit = async (): Promise<void> => {
			if (client) {
				client.logger.star('Disconnecting from Discord...');
				client.logger.info('Offline');
				await lastUpdate().then(() =>  client.destroy());
				client.logger.success('Successfully disconnected from Discord!');
				process.exit(0);
				client.logger.success('Bye bye .........');
			}
		};
		process.on('unhandledRejection', (reason, promise) => {
			client.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
		});
		process.on('uncaughtException', err => {
			client.logger.error('Uncaught Exception thrown:', err);
		});
		process.on('SIGINT', handleExit);
		process.on('SIGTERM', handleExit);
		process.on('SIGQUIT', handleExit);
	},
};

export default antiCrash;

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

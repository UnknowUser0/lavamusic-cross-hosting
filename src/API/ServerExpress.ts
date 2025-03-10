import express from "express";
import cors from "cors";
import statusRoutes from "./endPoint";
import Logger from "../structures/Logger";
import { env } from "../env";
import os from 'os';
import * as https from "node:https";

export async function startAPI() {
    const logger = new Logger();
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/status", statusRoutes);

    function getLocalIP() {
        const interfaces = os.networkInterfaces();
        for (const iface of Object.values(interfaces)) {
            if (!iface) continue;
            for (const config of iface) {
                if (config.family === 'IPv4' && !config.internal) {
                    return config.address;
                }
            }
        }
        return 'IP not found';
    }

    function getPublicIP(): Promise<string | null> {
        return new Promise((resolve) => {
            https.get('https://api64.ipify.org?format=json', (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        const ip = JSON.parse(data).ip;
                        resolve(ip);
                    } catch {
                        resolve(null);
                    }
                });
            }).on('error', () => resolve(null));
        });
    }

    const PORT = env.API_PORT;

    app.listen(PORT, async () => {
        logger.star(`🚀  Server running at Localhost : http://localhost:${PORT}/status`);
        logger.star(`🚀  Server running at WAN : http://${getLocalIP()}:${PORT}/status`);

        const publicIP = await getPublicIP();
        if (publicIP) {
            logger.info('If you have Ip public')
            logger.star(`🚀  Server running at Public : http://${publicIP}:${PORT}/status`);
        }
    });
    logger.success("✅ API Ready to connect")
}

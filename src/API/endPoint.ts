import { Router } from "express";
import redis from "./redis";
import Logger from "../structures/Logger";

const router = Router();
const logger = new Logger();

const getStatusString = (status: number) => {
    switch (status) {
        case 0: return "Online";
        case 1: return "connecting";
        case 2: return "Offline";
        case 3: return "idle";
        case 4: return "dnd";
        default: return "unknown";
    }
};

router.get("/", async (_req, res) => {
    try {
        const keys = await redis.keys("bot:status:cluster-*:shard-*");

        if (keys.length === 0) {
            res.json({ status: "No data available" });
            return;
        }

        let totalServers = 0;
        let totalLatency = 0;
        let shardCount = 0;
        const clusterData: Record<number, any> = {};

        const values = await Promise.all(keys.map((key) => redis.get(key)));

        for (const data of values) {
            if (!data) continue;

            let shardInfo;
            try {
                shardInfo = JSON.parse(data);
            } catch (error) {
                logger.error(`❌ Error parsing shard data:`, error);
                continue;
            }

            const { clusterId, shardId, latency, servers, uptime, status } = shardInfo;

            if (clusterId === undefined || shardId === undefined || latency === undefined || servers === undefined) {
                logger.warn(`⚠️ Incomplete data for shard ${shardId} in cluster ${clusterId}, skipping.`);
                continue;
            }

            if (!clusterData[clusterId]) {
                clusterData[clusterId] = {
                    status: getStatusString(status).toString(),
                    clusterId,
                    uptime,
                    servers: 0,
                    shard: [],
                    totalLatency: 0,
                };
            }


            clusterData[clusterId].shard.push({ shardId, latency, servers });
            clusterData[clusterId].servers += servers;
            clusterData[clusterId].totalLatency += latency;

            totalLatency += latency;
            shardCount += 1;
            totalServers += servers;
        }

        for (const clusterId in clusterData) {
            const cluster = clusterData[clusterId];

            cluster.shard.sort((a: any, b: any) => a.shardId - b.shardId);

            cluster.avgLatency = cluster.shard.length > 0 ? parseFloat((cluster.totalLatency / cluster.shard.length).toFixed(2)) : 0;

            delete cluster.totalLatency;
        }

        const avgLatency = shardCount > 0 ? totalLatency / shardCount : 0;
        const response = {
            avgLatency: parseFloat(avgLatency.toFixed(2)),
            totalServers,
            uptime: Math.floor(process.uptime()),
            cluster: Object.values(clusterData),
        };

        res.json(response);
    } catch (error) {
        logger.error("❌ Error fetching bot status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;

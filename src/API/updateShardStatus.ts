import redis from "./redis";

export async function updateShardStatus(clusterId: number, status: number, shardId: number, latency: number, servers: number, uptime: number) {
    const key = `bot:status:cluster-${clusterId}:shard-${shardId}`;

    const shardData = {
        clusterId,
        shardId,
        status,
        latency,
        servers,
        uptime,
    };

    await redis.set(key, JSON.stringify(shardData));
}

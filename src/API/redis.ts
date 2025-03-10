import Redis from "ioredis";
import {env} from "../env";

const redis = new Redis({
    host: env.REDIS_HOST || "127.0.0.1",
    port: parseInt(env.REDIS_PORT) || 6379,
});

export default redis;

import { createClient } from 'redis';
import { promisify } from 'util';

const redisClient = createClient({
    socket: {
        host: 'redis',
        port: 6379
    },
    legacyMode: true
});

redisClient.connect().then(() => {
    console.log("redis connected successfully");
}).catch((error) => {
    console.log(error);
});
redisClient.on('error', (error) => {
    console.log(error);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);
const redisDelAsync = promisify(redisClient.del).bind(redisClient);

export {redisGetAsync,redisSetAsync,redisDelAsync}
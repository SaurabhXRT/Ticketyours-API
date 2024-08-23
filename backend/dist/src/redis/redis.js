import { createClient } from 'redis';
import { promisify } from 'util';
var redisClient = createClient({
    socket: {
        host: 'redis',
        port: 6379
    },
    legacyMode: true
});
redisClient.connect().then(function() {
    console.log("redis connected successfully");
}).catch(function(error) {
    console.log(error);
});
redisClient.on('error', function(error) {
    console.log(error);
});
var redisGetAsync = promisify(redisClient.get).bind(redisClient);
var redisSetAsync = promisify(redisClient.set).bind(redisClient);
var redisDelAsync = promisify(redisClient.del).bind(redisClient);
export { redisGetAsync, redisSetAsync, redisDelAsync };

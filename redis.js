// const Redis = require('ioredis');
//
// const connectToRedis = () => {
//     const redisClient = new Redis({
//         host: 'localhost', // Change to '127.0.0.1' if necessary
//         port: 6379,
//     });
//
//     redisClient.on('error', (err) => {
//         console.error('Redis connection error:', err);
//         setTimeout(connectToRedis, 1000); // Retry connection after 1 second
//     });
//
//     redisClient.on('connect', () => {
//         console.log('Connected to Redis');
//     });
// };
//
// connectToRedis();


const Redis = require('ioredis');

// Create and configure a Redis client
const redisClient = new Redis({
    host: 'localhost', // Change to '127.0.0.1' if necessary
    port: 6379,
});

module.exports = redisClient;

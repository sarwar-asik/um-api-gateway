import { createClient } from 'redis';
import logger from './logger';

let redisClient = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => logger.error('RedisError from redis.ts', err));
redisClient.on('connect', (err) => logger.info('Redis connected from redis.ts'));

const connect = async (): Promise<void> => {
    await redisClient.connect()

};

export const RedisClient ={
    connect
}

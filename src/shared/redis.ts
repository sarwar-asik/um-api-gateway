import { createClient } from 'redis';
import logger from './logger';
import config from '../config';
import 'colors';

let redisClient = createClient({
  url: config.redis.url
});

redisClient.on('error', (err) => console.error('RedisError from redis.ts'.red.bold, err));
redisClient.on('connect', (err) =>
  console.info('Redis connected from redis.ts'.yellow.underline.bold)
);

const connect = async (): Promise<void> => {
  await redisClient.connect();
};

export const RedisClient = {
  connect
};

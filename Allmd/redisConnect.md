### redis installation

### connect redis

###### src>shared>redis.ts >>>>

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

#### in server.ts >>>

                async function bootstrap() {

                    await RedisClient.connect();
                }


#### create a src>axios.ts :::


    import axios, { AxiosInstance } from "axios";

    const HttpService = (baseurl:string):AxiosInstance=>{
        
        const instance =axios.create({
            baseURL:baseurl,
            timeout:10000,
            headers:{
                "Content-Type":"application/json"
            }
        })
        // request interceptors //

        instance.interceptors.request.use(
            (config)=>{
                return config
            },
            (error)=>{
                return error
            }
        )

        // response interceptors//
        instance.interceptors.response.use(
            (response)=>{
                return response.data
            },
            (error)=>{
                return Promise.reject(error)
            }
        )

        

        return instance
}



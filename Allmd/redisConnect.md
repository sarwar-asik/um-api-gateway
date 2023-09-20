### redis installation

### connect redis

**main um-api-getway (localhost://3030)**

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

### ADD URL IN .env

`REDIS_URL=redis://localhost:6379`

`AUTH_SERVICE_URL=http://localhost:3001/api/v1`

`CORE_SERVICE_URL=http://localhost:3002/api/v1`

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

# connect 2 server with redis

**server-1(um-auth-service) (localhost://3001)**

            yarn add redis



###### in .env:::

`REDIS_URL='redis://localhost:6379'`
`REDIS_TOKEN_EXPIRES_IN=846000`

### src>shared>redis.ts (servcer-1 localhost://3000) :::

    import { createClient, SetOptions } from 'redis';
    import config from '../config';

        //! step-1
        const redisClient = createClient({
             url: config.redis.url,
        });
        const redisPubClient = createClient({
            url: config.redis.url,
        });
        const redisSubClient = createClient({
            url: config.redis.url,
        });

        //! step-2
        redisClient.on('error', error => console.log('Redis Error', error));
        redisClient.on('connect', error => console.log('Redis connected'));

        //! step-3
        const connect = async (): Promise<void> => {
            await redisClient.connect();
            await redisPubClient.connect();
            await redisSubClient.connect();
        };

        // ! step-4

        const set = async (
            key: string,
            value: string,
            options?: SetOptions
        ): Promise<void> => {
            await redisClient.set(key, value, options);
        };

        const get = async (key: string): Promise<string | null> => {
             return await redisClient.get(key);
        };

        const del = async (key: string): Promise<void> => {
             await redisClient.del(key);
        };

        const setAccessToken = async (userId: string, token: string): Promise<void> => {
            const key = `access-token:${token}`;

            await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
        };

        const getAccessToken = async (userId: string): Promise<string | null> => {
            const key =`access-token: ${userId}`
            return await redisClient.get(key)
        };

        const delAccessToken = async(userId:string):Promise<void>=>{
            const key =`access-token:${userId}`
            await redisClient.del(key)
        }

        // for disconnect redis server ///
        const disconnect = async (): Promise<void> => {
            await redisClient.quit();
            await redisPubClient.quit();
            await redisSubClient.quit();
        };

    //! step-4
    export const RedisClient = {
    connect,
    set,
    get,
    del,
    setAccessToken,
    getAccessToken,
    delAccessToken,
    disconnect,

    publish: redisPubClient.publish.bind(redisPubClient),
    subscribe: redisSubClient.publish.bind(redisSubClient),
    };

include same jwt secret

`JWT_SECRET=sarwar-um-scret`

#### in server.ts >>>

                async function bootstrap() {

                    await RedisClient.connect();
                }

**server-2(um-core-service) (localhost://3001)**

            yarn add redis



###### in .env:::

`REDIS_URL='redis://localhost:6379'`
`REDIS_TOKEN_EXPIRES_IN=846000`

### src>shared>redis.ts (servcer-1 localhost://3002) :::

    import { createClient, SetOptions } from 'redis';
    import config from '../config';

        //! step-1
        const redisClient = createClient({
             url: config.redis.url,
        });
        const redisPubClient = createClient({
            url: config.redis.url,
        });
        const redisSubClient = createClient({
            url: config.redis.url,
        });

        //! step-2
        redisClient.on('error', error => console.log('Redis Error', error));
        redisClient.on('connect', error => console.log('Redis connected'));

        //! step-3
        const connect = async (): Promise<void> => {
            await redisClient.connect();
            await redisPubClient.connect();
            await redisSubClient.connect();
        };

        // ! step-4

        const set = async (
            key: string,
            value: string,
            options?: SetOptions
        ): Promise<void> => {
            await redisClient.set(key, value, options);
        };

        const get = async (key: string): Promise<string | null> => {
             return await redisClient.get(key);
        };

        const del = async (key: string): Promise<void> => {
             await redisClient.del(key);
        };

        const setAccessToken = async (userId: string, token: string): Promise<void> => {
            const key = `access-token:${token}`;

            await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
        };

        const getAccessToken = async (userId: string): Promise<string | null> => {
            const key =`access-token: ${userId}`
            return await redisClient.get(key)
        };

        const delAccessToken = async(userId:string):Promise<void>=>{
            const key =`access-token:${userId}`
            await redisClient.del(key)
        }

        // for disconnect redis server ///
        const disconnect = async (): Promise<void> => {
            await redisClient.quit();
            await redisPubClient.quit();
            await redisSubClient.quit();
        };

    //! step-4
    export const RedisClient = {
    connect,
    set,
    get,
    del,
    setAccessToken,
    getAccessToken,
    delAccessToken,
    disconnect,

    publish: redisPubClient.publish.bind(redisPubClient),
    subscribe: redisSubClient.publish.bind(redisSubClient),
    };

include same jwt secret

`JWT_SECRET=sarwar-um-scret`

#### in server.ts >>>

                async function bootstrap() {

                    await RedisClient.connect();
                }



## um-api-gateway (main server localhost://3030):::::::::::::::::
### FInally create modules>academicSemester.routes.ts>academicSemester.controller.ts>academicSemester.service.ts

    import { CoreService as HttpService } from "../../../shared/axios"

        const insertToDb =async(req:any) => {

                console.log("🚀insertToDb", req.body)

                const response  = await HttpService.post('/academic-semester',req.body,{
                    headers:{
                        Authorization:req.headers.authorization
                    }
                })

                return response
        }

    export  const AcademicSemesterService ={
        insertToDb
    }

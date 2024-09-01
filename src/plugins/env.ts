import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env';
import { IObjectSchema } from '../types';

export type TEnvs = {
    MONGO_URL: string;
    MONGO_PORT: string;
    MONGO_NAME: string;
}

const schema: IObjectSchema<keyof TEnvs> = {
    type: 'object',
    properties: {
        MONGO_URL: {
            type: 'string'
        },
        MONGO_PORT: {
            type: 'string',
        },
        MONGO_NAME: {
            type: 'string',
        },
    },
    required: ['MONGO_URL', 'MONGO_PORT', 'MONGO_NAME'],
}

export default fp(async (fastify) => {
  await fastify.register(fastifyEnv, {
    schema,
  });
})
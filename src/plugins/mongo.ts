import fastifyPlugin from "fastify-plugin";
import mongoose from "mongoose";
import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import { TEnvs } from "./env";

const connectToDb: FastifyPluginCallback = async (
  fastify: FastifyInstance,
  options: Record<string, any>,
  done: (err?: Error | undefined) => void,
) => {
const { MONGO_URL, MONGO_PORT, MONGO_NAME } = fastify.getEnvs<TEnvs>();
  await mongoose.connect(`${MONGO_URL}:${MONGO_PORT}/`, {
    dbName: MONGO_NAME,
  });
};

export default fastifyPlugin(connectToDb);
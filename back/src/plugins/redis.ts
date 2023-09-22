import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyRedis from "@fastify/redis";

import { REDIS_HOST } from "../lib/constants.js";

const redis: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  Fastify.register(fastifyRedis, {
    host: process.env.REDIS_HOST || REDIS_HOST,
  });
};

export default fastifyPlugin(redis);

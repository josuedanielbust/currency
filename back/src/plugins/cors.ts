import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyCors from "@fastify/cors";

const cors: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  Fastify.register(fastifyCors, {});
};

export default fastifyPlugin(cors);

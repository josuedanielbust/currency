import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyWebSocket from "@fastify/websocket";

const websocket: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  Fastify.register(fastifyWebSocket, {});
};

export default fastifyPlugin(websocket);

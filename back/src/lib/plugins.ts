import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import * as Plugins from "../plugins/index.js";

const plugins: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  try {
    Object.keys(Plugins).forEach((plugin) => {
      Fastify.register((Plugins as any)[plugin], {});
    });
  } catch (error: any) {
    Fastify.log.error(error);
  }
};

export default fastifyPlugin(plugins, {
  name: "plugins",
});

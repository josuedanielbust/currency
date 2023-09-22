import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import * as Routes from "../routes/index.js";

const routes: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  try {
    Object.keys(Routes).forEach((route) => {
      Fastify.register((Routes as any)[route], {});
    });
  } catch (error: any) {
    Fastify.log.error(error);
  }
};

export default fastifyPlugin(routes, {
  name: "routes",
});

import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import * as dotenv from "dotenv";

declare module "fastify" {
  interface FastifyInstance {
    config: dotenv.DotenvParseOutput;
  }
}

const dotEnvConfig: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  try {
    const envConfig = dotenv.config();
    if (envConfig.error) {
      throw envConfig.error;
    }
  } catch (err) {
    console.error(err);
  }
};

export default fastifyPlugin(dotEnvConfig);

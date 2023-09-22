import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyCron from "fastify-cron";

import Currencies from "../services/currencies.js";

const crons: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  Fastify.register(fastifyCron, {
    jobs: [
      {
        name: "at-minute-10-get-rates-from-api",
        cronTime: "5 * * * *",
        onTick: async () => {
          Fastify.log.info("[CRON]: at-minute-10-get-rates-from-api");
          const { axios, redis } = Fastify;
          const actualRates = await Currencies.getActual(axios, redis);
          Fastify.websocketServer.clients.forEach((client) => {
            client.send(JSON.stringify({ rates: actualRates }));
          });
        },
      },
    ],
  });
};

export default fastifyPlugin(crons);

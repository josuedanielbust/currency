import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from "fastify";
import CurrenciesService from "../services/currencies.js";

interface Currencies {
  service: typeof CurrenciesService;
}

const routes: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: FastifyPluginOptions,
) => {
  Fastify.get("/currency", Currencies.service.getRatesHandler);
  Fastify.get("/currency/convert", Currencies.service.getActualHandler);
  Fastify.get("/currency/historical", Currencies.service.getHistoricalHandler);
  Fastify.get("/currency/ws", { websocket: true }, Currencies.service.getWs);
};

const Currencies = {
  service: CurrenciesService,
  routes,
};

export default Currencies.routes;

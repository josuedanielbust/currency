import { RouteHandler, FastifyReply } from "fastify";

import { CURRENCY_TO } from "../lib/constants.js";
import UtilsDates from "../utils/dates.js";
import { AxiosInstance } from "axios";

const getActual = async (axios: AxiosInstance, redis: any) => {
  // Used for object positioning
  const date: Date = new Date();

  let redisData = JSON.parse(await redis.call("JSON.GET", "rates"));
  if (!redisData) {
    await redis.call("JSON.SET", "rates", "$", "{}");
    redisData = {};
  }
  if (!Object.hasOwn(redisData, date.getHours())) {
    const queryAndInsert = await axios
      .get("/currency/convert")
      .then(async (res: any) => {
        await redis
          .multi()
          .call(
            "JSON.SET",
            "rates",
            `$.${date.getHours()}`,
            JSON.stringify(res.data.rates[CURRENCY_TO]),
          )
          .expireat("rates", UtilsDates.getSecondsBeforeMignight())
          .exec((err: Error, result: any) => {
            if (err) {
              throw new Error(`Error: ${err}`);
            }
            return result;
          });
        return res.data.rates[CURRENCY_TO];
      })
      .catch((err: Error) => {
        console.log(err);
        throw new Error(`Error: ${err}`);
      });
    return {
      data: {
        ...redisData,
        [date.getHours()]: queryAndInsert,
      },
    };
  } else {
    return {
      data: redisData,
    };
  }
};

const getHistorical = async (axios: AxiosInstance, redis: any) => {
  const redisData = await redis.call("JSON.GET", "historical");
  if (!redisData) {
    const date = UtilsDates.getDateForAPI();
    const queryAndInsert = await axios
      .get(`/currency/historical/${date}`)
      .then(async (res: any) => {
        if (res.status !== 200) {
          throw new Error(`Error: ${res.status}`);
        }
        await redis
          .multi()
          .call(
            "JSON.SET",
            "historical",
            "$",
            JSON.stringify(res.data.rates[CURRENCY_TO]),
          )
          .expireat("historical", UtilsDates.getSecondsBeforeMignight())
          .exec((err: Error, result: any) => {
            if (err) {
              throw new Error(`Error: ${err}`);
            }
            return result;
          });
        return res.data.rates[CURRENCY_TO];
      })
      .catch((err: any) => {
        console.log(err);
        throw new Error(`Error: ${err}`);
      });
    return {
      data: queryAndInsert,
    };
  } else {
    return {
      data: JSON.parse(redisData),
    };
  }
};

const getActualHandler: RouteHandler = async (
  request: any,
  reply: FastifyReply,
) => {
  const { axios, redis } = request.server;
  try {
    const data = await getActual(axios, redis);
    if (data) {
      reply.send(data);
    }
  } catch (err) {
    reply.status(500).send(err);
  }
};

const getHistoricalHandler: RouteHandler = async (
  request: any,
  reply: FastifyReply,
) => {
  const { axios, redis } = request.server;
  try {
    const data = await getHistorical(axios, redis);
    if (data) {
      reply.send(data);
    }
  } catch (err) {
    reply.status(500).send(err);
  }
};

const getRatesHandler: RouteHandler = async (
  request: any,
  reply: FastifyReply,
) => {
  const { axios, redis } = request.server;
  try {
    const rates = await getActual(axios, redis);
    const historical = await getHistorical(axios, redis);
    reply.send({
      rates: rates.data,
      historical: historical.data,
    });
  } catch (err) {
    reply.status(500).send(err);
  }
};

const getWs: RouteHandler = async (connection: any, request: any) => {
  connection.socket.on("message", (message: any) => {
    connection.socket.send(message);
  });
};

const Currencies = {
  getActual,
  getActualHandler,
  getHistorical,
  getHistoricalHandler,
  getRatesHandler,
  getWs,
};

export default Currencies;

import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import axios, { AxiosInstance } from "axios";

import {
  API_URL,
  API_KEY,
  CURRENCY_FROM,
  CURRENCY_TO,
} from "../lib/constants.js";

declare module "fastify" {
  interface FastifyInstance {
    axios: AxiosInstance;
  }
}

const axiosInstance: FastifyPluginAsync = async (
  Fastify: FastifyInstance,
  opts: any,
) => {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.API_URL || API_URL,
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY || API_KEY,
      "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
    },
    params: {
      from: CURRENCY_FROM,
      to: CURRENCY_TO,
      format: "json",
    },
  });
  Fastify.decorate("axios", instance);
};

export default fastifyPlugin(axiosInstance);

import fastify, { FastifyInstance } from "fastify";
import env from "./plugins/env.js";

import { PORT } from "./lib/constants.js";
import plugins from "./lib/plugins.js";
import routes from "./lib/routes.js";

const server: FastifyInstance = fastify.fastify({
  logger: true,
});

// Load environment variables from .env file
server.register(env);
await server.after();

// Register plugins and routes
server.register(plugins);
server.register(routes);

const start = async () => {
  try {
    // Run decorators before starting server
    await server.ready();

    // Start server
    await server.listen({
      port: PORT,
      host: "::"
    });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    server.log.info(`Server listening on port ${port}`);

    // Start cron jobs
    server.cron.startAllJobs();
    server.log.info("Cron jobs started");
  } catch (error) {
    server.log.error(error);
    process.exit(0);
  }
};

start();

export default server;

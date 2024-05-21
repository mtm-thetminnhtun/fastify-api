import Fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import sequelize from './models/sequelize';
import logger from './config/logger';
import { swaggerOptions, swaggerUiOptions } from "./config/swagger";
import userRoutes from "./routes/user.route";

const port = Number(process.env.APP_PORT) || 3000;

const fastify: FastifyInstance = Fastify({
  logger: logger,
});

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);
fastify.register(userRoutes, { prefix: '/api' });

const start = async () => {
  try {
      await sequelize.sync();
      await fastify.listen({ port: port });
      fastify.log.info(`server listening on ${port}`)
  } catch (error) {
      fastify.log.error(error);
      process.exit(1);
  }
};

start();
import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import sequelize from './database/sequelize';
import fastifyConfig from './config/app';
import { swaggerOptions, swaggerUiOptions } from "./config/swagger";

const port = Number(process.env.APP_PORT) || 3000;

const fastify = Fastify(fastifyConfig);

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);
fastify.register(require('./routes/users.route'), { prefix: '/api' });

const start = async () => {
  try {
      await sequelize.sync();
      await fastify.listen({ port: port });
      fastify.log.info(`server listening on ${port}`)
  } catch (err) {
      fastify.log.error(err);
      process.exit(1);
  }
};

start();
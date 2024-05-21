import Fastify from "fastify";
import sequelize from './database/sequelize';
import fastifyConfig from './config/app';
const port = Number(process.env.APP_PORT) || 3000;

const fastify = Fastify(fastifyConfig);

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
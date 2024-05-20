const fastify = require('fastify')({ logger: true });
const sequelize = require('./database/sequelize');

fastify.register(require('./routes/users.route'), { prefix: '/api' });

const start = async () => {
  try {
      await sequelize.sync();
      await fastify.listen({ port: process.env.APP_PORT || 3000});
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
      fastify.log.error(err);
      process.exit(1);
  }
};

start();
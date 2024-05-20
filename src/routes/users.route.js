const usersController = require('../controllers/users.controller');
const userSchema = require('../schemas/users.scheme');

async function userRoutes(fastify, options) {
    fastify.get('/users', userSchema.getAllSchema, usersController.index);
    fastify.get('/users/:id', userSchema.getSingleSchema, usersController.show);
    fastify.post('/users', userSchema.storeSchema, usersController.store);
    fastify.put('/users/:id', userSchema.updateSchema, usersController.update);
    fastify.delete('/users/:id', userSchema.deleteSchema, usersController.destroy);
}

module.exports = userRoutes;
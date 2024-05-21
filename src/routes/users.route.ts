import { FastifyInstance } from 'fastify';
import usersController from '../controllers/users.controller';
import userSchema from '../schemas/users.schema';

async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', userSchema.getAllSchema, usersController.index);
    fastify.get('/users/:id', userSchema.getSingleSchema, usersController.show);
    fastify.post('/users', userSchema.storeSchema, usersController.store);
    fastify.put('/users/:id', userSchema.updateSchema, usersController.update);
    fastify.delete('/users/:id', userSchema.deleteSchema, usersController.destroy);
}

export default userRoutes;
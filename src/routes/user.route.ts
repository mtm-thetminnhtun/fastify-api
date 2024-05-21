import { FastifyInstance } from "fastify";
import usersController from "../controllers/user.controller";
import {
    indexSchema,
    showSchema,
    storeSchema,
    updateSchema,
    destroySchema,
} from "../schemas/user.scheme";

async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/users", indexSchema, usersController.index);
    fastify.get("/users/:id", showSchema, usersController.show);
    fastify.post("/users", storeSchema, usersController.store);
    fastify.put("/users/:id", updateSchema, usersController.update);
    fastify.delete("/users/:id", destroySchema, usersController.destroy);
}

export default userRoutes;

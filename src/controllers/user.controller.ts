import User from "../models/user";
import { FastifyReply, FastifyRequest } from "fastify";
import { ValidationError } from "sequelize";

async function index(request: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await User.findAll();
        reply.send(users);
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function show(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) {
    try {
        const user = await User.findByPk(request.params.id);
        if (user) {
            reply.send(user);
        } else {
            reply.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function store(
    request: FastifyRequest<{ Body: { name: string; email: string } }>,
    reply: FastifyReply
) {
    try {
        const user = await User.create({
            name: request.body.name,
            email: request.body.email,
        });
        reply.send(user);
    } catch (e) {
        if (e instanceof ValidationError) {
            console.log(e.errors)
            reply
                .status(400)
                .send({ message: e.errors.map((e) => {
                    if(e.validatorKey == 'not_unique') {
                        return 'The email has already been taken.'
                    }
                    return e.message
                }).join(", ") });
        } else {
            reply.status(500).send({ message: "Internal Server Error" });
        }
    }
}

async function update(
    request: FastifyRequest<{ Params: { id: number }, Body: { name: string, email: string} }>,
    reply: FastifyReply
) {
    try {
        const user = await User.findByPk(request.params.id);
        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }

        await User.update(request.body, {
            where: { id: request.params.id },
        });

        const updatedUser = await User.findByPk(request.params.id);
        reply.send(updatedUser);
    } catch (e) {
        if (e instanceof ValidationError) {
            console.log(e.errors)
            reply
                .status(400)
                .send({ message: e.errors.map((e) => {
                    if(e.validatorKey == 'not_unique') {
                        return 'The email has already been taken.'
                    }
                    return e.message
                }).join(", ") });
        } else {
            reply.status(500).send({ message: "Internal Server Error" });
        }
    }
}

async function destroy(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) {
    try {
        const deleted = await User.destroy({
            where: { id: request.params.id },
        });
        if (deleted) {
            reply.status(204).send();
        } else {
            reply.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        reply.status(500).send(error);
    }
}

export default {
    index,
    show,
    store,
    update,
    destroy,
};

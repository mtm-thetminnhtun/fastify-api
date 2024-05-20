const User = require("../models/user");
const Joi = require("joi");

async function index(request, reply) {
    try {
        const users = await User.findAll();
        reply.send(users);
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function show(request, reply) {
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

async function store(request, reply) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        const { error, value } = schema.validate(request.body);

        if (error) {
            return reply
                .status(400)
                .send({ message: error.details[0].message });
        }

        const oldUser = await User.findOne({ where: { email: value.email } });
        if (oldUser) {
            return reply
                .status(400)
                .send({ message: "The email has already been taken." });
        }

        const user = await User.create(value);
        reply.send(user);
    } catch (err) {
        reply.status(500).send(err);
    }
}

async function update(request, reply) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        const { error, value } = schema.validate(request.body);

        if (error) {
            return reply
                .status(400)
                .send({ message: error.details[0].message });
        }

        const user = await User.findByPk(request.params.id);
        if (!user) {
            return reply.status(404).send({ message: "User not founxd" });
        }

        await User.update(value, {
            where: { id: request.params.id },
        });

        const updatedUser = await User.findByPk(request.params.id);
        reply.send(updatedUser);
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function destroy(request, reply) {
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

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};

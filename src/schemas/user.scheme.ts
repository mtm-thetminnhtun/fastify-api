const bodySchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
    },
    required: ["name", "email"],
};

const paramsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
    },
    required: ["id"],
};

const errorResponseSchema = {
    type: "object",
    properties: {
        message: { type: "string" },
    },
};

const indexSchema = {
    schema: {
        response: {
            200: {
                type: "array",
                items: bodySchema,
            },
        },
    },
};

const showSchema = {
    schema: {
        params: paramsSchema,
        response: {
            200: bodySchema,
            404: errorResponseSchema,
        },
    },
};

const storeSchema = {
    schema: {
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string", format: "email" },
            },
            required: ["name", "email"],
        },
        response: {
            200: bodySchema,
            400: errorResponseSchema,
        },
    },
};

const updateSchema = {
    schema: {
        params: paramsSchema,
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string", format: "email" },
            },
        },
        response: {
            200: bodySchema,
            400: errorResponseSchema,
            404: errorResponseSchema,
        },
    },
};

const destroySchema = {
    schema: {
        params: paramsSchema,
        response: {
            204: { type: "null" },
            404: errorResponseSchema,
        },
    },
};

export { indexSchema, showSchema, storeSchema, updateSchema, destroySchema };

const swaggerOptions = {
    swagger: {
        info: {
            title: "Fastify API",
            description: "Demo API",
            version: "1.0.0",
        },
        host: "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "Default", description: "Default" }],
    },
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

export { swaggerOptions, swaggerUiOptions };

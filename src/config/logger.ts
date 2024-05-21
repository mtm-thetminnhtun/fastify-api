import dotenv from 'dotenv';
dotenv.config();

const logger = {
    local: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
            },
        },
    },
    production: true,
    test: false,
};

export default logger;


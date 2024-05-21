import dotenv from 'dotenv';
dotenv.config();

const logger = {
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
        },
    },
};

export default process.env.APP_LOG == 'true' ? logger : false;


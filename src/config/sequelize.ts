import { Options } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelizeOptions: Options = {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
}

export default sequelizeOptions;

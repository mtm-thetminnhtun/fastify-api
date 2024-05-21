import { Sequelize } from "sequelize-typescript";
import dbConfig from "../config/db";

const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  dialect: 'mysql'
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Database connected succefully");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testConnection();

export default sequelize;

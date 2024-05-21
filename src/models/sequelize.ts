import { Sequelize } from "sequelize";
import sequelizeOptions from '../config/sequelize'

const sequelize = new Sequelize(sequelizeOptions);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testConnection();

export default sequelize;

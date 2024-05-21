import sequelize from "./sequelize";
import { DataTypes } from "sequelize";

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The name is required.'
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'The email is required.'
            },
        }
    },
});

export default User;

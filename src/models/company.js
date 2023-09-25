import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import City from "./city.js";

const Company = db.define('company', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },


    id_city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: "id",
        }
    }
});

Company.belongsTo(City, {
    foreignKey: 'id_city',
});

export default Company;

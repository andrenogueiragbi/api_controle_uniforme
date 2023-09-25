import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import Country from "./country.js";

const State = db.define('states', {
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
    abbreviation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    id_country: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: "id",
        }
    }
});

State.belongsTo(Country, {
    foreignKey: 'id_country',
});

export default State;

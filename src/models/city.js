import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import State from "./state.js";

const City = db.define('city', {
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
    id_state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: "id",
        }
    }
});

City.belongsTo(State, {
    foreignKey: 'id_state',
});

export default City;

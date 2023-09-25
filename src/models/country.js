import { Sequelize } from 'sequelize';
import db from '../database/index.js';

export default db.define('countries', {
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


})
import { Sequelize } from 'sequelize';
import db from '../database/index.js';

const Category = db.define('category', {
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

export default Category
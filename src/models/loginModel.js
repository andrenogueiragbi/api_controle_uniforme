import { Sequelize } from 'sequelize';
import db from '../database/index.js';

export default db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['master', 'admin']], // Defina os valores permitidos aqui
          },
    },
    active: {
        type: Sequelize.CHAR,
        allowNull: false,
        validate: {
            isIn: [['Y', 'N']], // Defina os valores permitidos aqui
          },
    },


})
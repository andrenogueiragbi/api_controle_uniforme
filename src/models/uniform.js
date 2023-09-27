import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import Category from "./category.js";


const Uniform = db.define('uniform', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    photo:{
        type: Sequelize.BLOB,
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    id_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id",
        }
    },


})

Uniform.belongsTo(Category, {
    foreignKey: 'id_category',
});



export default Uniform;
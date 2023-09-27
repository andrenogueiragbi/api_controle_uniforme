import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import Location from './location.js';
import Uniform from './uniform.js';


const Store = db.define('store', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_uniform: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Uniform,
            key: "id",
        }
    },

    qtdade: {
        type: Sequelize.INTEGER,
    },


    id_location: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Location,
            key: "id",
        }
    },


})

Store.belongsTo(Uniform, {
    foreignKey: 'id_uniform',
});
Store.belongsTo(Location, {
    foreignKey: 'id_location',
});


export default Store;
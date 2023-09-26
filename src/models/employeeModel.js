import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import City from "./city.js";


const Employee = db.define('employee', {
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
    birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    photo_face:{
        type: Sequelize.BLOB,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    telephone_1: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    telephone_2: {
        type: Sequelize.STRING,
        unique: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    company: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['M', 'F']], // Defina os valores permitidos aqui
        },
    },
    active: {
        type: Sequelize.CHAR,
        allowNull: false,
        validate: {
            isIn: [['Y', 'N']], // Defina os valores permitidos aqui
        },
    },
    id_city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: "id",
        }
    }

})

Employee.belongsTo(City, {
    foreignKey: 'id_city',
});


export default Employee;
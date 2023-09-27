import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import Uniform from './uniform.js';
import Employee from './employeeModel.js';


const Movement = db.define('movement', {
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

    id_employee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: "id",
        }
    },

})

Movement.belongsTo(Uniform, {
    foreignKey: 'id_uniform',
});

Movement.belongsTo(Employee, {
    foreignKey: 'id_employee',
});



export default Movement;
import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import Company from './company.js';
import City from './city.js';
import Employee from './employeeModel.js';


const Location = db.define('location', {
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

    obs:{
        type: Sequelize.TEXT,
    },

    id_company: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: "id",
        }
    },
    id_city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: "id",
        }
    },
    id_employee_responsably: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: "id",
        }
    },


})

Location.belongsTo(Company, {
    foreignKey: 'id_company',
});
Location.belongsTo(City, {
    foreignKey: 'id_city',
});
Location.belongsTo(Employee, {
    foreignKey: 'id_employee_responsably',
});



export default Location;
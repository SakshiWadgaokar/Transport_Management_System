const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Vehicle = sequelize.define('Vehicle', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    capacity: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Available'
    }
});

module.exports = Vehicle;

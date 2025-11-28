const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Driver = sequelize.define('Driver', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    license: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Available'
    },
    phone: {
        type: DataTypes.STRING
    }
});

module.exports = Driver;

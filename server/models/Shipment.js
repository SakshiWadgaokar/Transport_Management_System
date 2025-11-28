const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Shipment = sequelize.define('Shipment', {
    customer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    },
    trackingId: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = Shipment;

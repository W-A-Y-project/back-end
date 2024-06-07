const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    CPF: {
        type: DataTypes.CHAR(11),
        primaryKey: true,
        allowNull: false
    },
    FullName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            len: [8, 20]
        }
    },
    Phone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    City: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    State: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    PostalCode: {
        type: DataTypes.CHAR(8),
        allowNull: false
    }
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = User;

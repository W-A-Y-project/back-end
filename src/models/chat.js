const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('./db');

const Chat = sequelize.define('Chat', {
    ChatID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    User1_CPF: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        references: {
            model: 'User',
            key: 'CPF'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
            name: 'fk_user1_cpf'
        }
    },
    User2_CPF: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        references: {
            model: 'User',
            key: 'CPF'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
            name: 'fk_user2_cpf'
        }
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Chat',
    timestamps: false
});

module.exports = Chat;

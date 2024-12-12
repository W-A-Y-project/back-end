const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Chat = require('./chat');

const Message = sequelize.define('Message', {
    MessageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ChatID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Chat, // Associa com a tabela `Chat`
            key: 'ChatID'
        }
    },
    Sender_CPF: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        references: {
            model: 'User', // Associa com a tabela `User`
            key: 'CPF'
        }
    },
    Text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    SentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Message',
    timestamps: false
});

module.exports = Message;

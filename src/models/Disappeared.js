const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Certifique-se de que o caminho está correto

const Disappeared = sequelize.define('Disappeared', {
    CPF: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false
    },
    Photo: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    FullName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    BirthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Gender: {
        type: DataTypes.ENUM('Masculino', 'Feminino'),
        allowNull: false
    },
    LastSeenLocation: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    LastSeenDate: {
        type: DataTypes.DATEONLY,
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
    },
    SkinColor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    EyeColor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Characteristics: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Hair: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Illness: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IllnessDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ClothingWorn: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Vehicle: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    VehicleDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    BoDocument: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    BoVerified: {
        type: DataTypes.ENUM('True', 'False', 'Pending'),
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    tableName: 'DISAPPEARED',
    timestamps: false
});

module.exports = Disappeared;
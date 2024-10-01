const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Disappeared = sequelize.define('Disappeared', {
    CPF: {
        type: DataTypes.STRING(11),
        primaryKey: true,
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
    HomeAddress: {
        type: DataTypes.STRING(255),
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
        allowNull: true, // This field is optional and should only be filled if 'Illness' is true
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
        allowNull: true // This field is optional and should only be filled if 'Vehicle' is true
    },
  /*  BoDocument: {
        type: DataTypes.BLOB, // Campo para armazenar o documento PDF
        allowNull: true
    },
    BoVerified: {
        type: DataTypes.ENUM('True', 'False', 'Pending'),
        allowNull: false, // Garante que este campo não pode ser nulo
        defaultValue: 'Pending' // Valor padrão
    }
        */
}, {
    tableName: 'Disappeared',
    timestamps: false
});

module.exports = Disappeared;

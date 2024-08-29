const { Sequelize } = require('sequelize');

// Configuração da conexão
const sequelize = new Sequelize("way", "avnadmin", "AVNS_xAt7KNlYrkTcoryod9x", {
    host: "way-raapphaaeell-b0c3.k.aivencloud.com",
    dialect: 'mysql',
    port: 15186,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Para bancos de dados que utilizam SSL, mas não possuem certificado assinado por uma autoridade confiável
        },
        connectTimeout: 10000 // Tempo limite de conexão em milissegundos
    }
});

// Autenticar a conexão
sequelize.authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!");

        // Sincronizar o banco de dados com os modelos
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error("Erro na conexão ou sincronização do banco de dados:", err);
    });

module.exports = sequelize;

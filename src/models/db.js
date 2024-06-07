const Sequelize = require('sequelize')

const sequelize = new Sequelize( "way", "avnadmin", "AVNS_xAt7KNlYrkTcoryod9x", {
    host: "way-raapphaaeell-b0c3.k.aivencloud.com",
    dialect: 'mysql',
    port: 15186,
    dialectOptions: {
        connectTimeOut: 10000
    }
}) //connection

sequelize.authenticate().then(function(){
    console.log("Conexão realizada com sucesso!")

}).catch((err) => console.log(err))

module.exports = sequelize;
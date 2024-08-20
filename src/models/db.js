const Sequelize = require('sequelize')

const sequelize = new Sequelize( "BD23334", "BD23334", "BD23334", {// troque pelo seu ra
    host: "regulus.cotuca.unicamp.br",
    dialect: 'mysql',
    port: 3306,
    dialectOptions: {
        connectTimeOut: 10000
    }
}) //connection

sequelize.authenticate().then(function(){
    console.log("Conexão realizada com sucesso!")

}).catch((err) => console.log(err))

module.exports = sequelize;
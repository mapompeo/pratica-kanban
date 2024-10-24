const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('kanban', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('conexão realizada')
}).catch((err) => {
    console.error('erro na conexão', err)
})

module.exports = sequelize
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('kanban', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('conexão realizada')
}).catch((err) => {
    console.error('erro na conexão', err)
})

module.exports = sequelize
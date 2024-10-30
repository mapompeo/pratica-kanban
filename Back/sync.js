const { associacao } = require('./model/associacao')
const conn = require('./db/conn')

async function syncDatabase() {
    try {
        await conn.sync({ force: true })
    } catch (error) {
        console.error('erro de conexão', error)
    } finally {
        await conn.close()
        console.log('conexão fechada')
    }
}

syncDatabase()
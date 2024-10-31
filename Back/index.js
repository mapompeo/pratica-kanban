const express = require('express')
const app = express()
const conn = require('./db/conn')
const cors = require('cors')
const controllerUsuario = require('./controller/controllerUsuario')
const controllerTarefa = require('./controller/controllerTarefa')

const PORT = 3000
const hostname = 'localhost'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ messege: 'Servidor Ativo!' })
})

app.post('/usuario', controllerUsuario.cadastrarUsuario)
app.get('/usuarios', controllerUsuario.listarUsuario)

app.post('/tarefa', controllerTarefa.cadastrarTarefa)
app.get('/tarefas', controllerTarefa.listarTarefa)
app.delete('/tarefa/:id', controllerTarefa.excluirTarefa)
app.put('/tarefa', controllerTarefa.atualizarTarefa)

conn.sync().then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando em ${hostname} : ${PORT}`)
    })
}).catch((err) => {
    console.error('erro ao rodar servidor', err)
})
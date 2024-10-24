const { Usuario } = require('../model/associacao')

const cadastrarUsuario = async (req, res) => {
    const dados = req.body
    console.log(dados)
    try {
        const gravar = await Usuario.create(dados, { raw: true })
        console.log(gravar)
        res.status(200).json(gravar)
    } catch (error) {
        console.error('erro ao gravar dados', error)
        res.status(500).json({ message: 'erro ao gravar dados' })
    }
}

const listarUsuario = async (req, res) => {
    try {
        const pesq = await Usuario.findAll()
        console.log(pesq)
        res.status(200).json(pesq)
    } catch (error) {
        console.log('erro ao listar')
        res.status(200).json({ message: 'erro ao listar' })
    }
}

module.exports = { cadastrarUsuario, listarUsuario }
const { Usuario } = require('../model/associacao') // Importa o modelo Usuario do arquivo associacao no diretório model

const cadastrarUsuario = async (req, res) => { // Função para cadastrar um novo usuário
    const dados = req.body // Obtém os dados do usuário do corpo da requisição
    console.log(dados) // Log dos dados recebidos

    try {
        const gravar = await Usuario.create(dados, { raw: true }) // Tenta criar um novo usuário no banco de dados
        console.log(gravar) // Log do usuário gravado
        res.status(201).json(gravar) // Envia resposta de sucesso com o usuário gravado e status 201 (Created)
    } catch (error) {
        console.error('Erro ao gravar dados', error) // Log do erro
        res.status(500).json({ message: 'Erro ao cadastrar usuário' }) // Envia resposta de erro com status 500 (Internal Server Error)
    }
}

const listarUsuario = async (req, res) => { // Função para listar todos os usuários
    try {
        const pesq = await Usuario.findAll() // Tenta buscar todos os usuários no banco de dados
        console.log(pesq) // Log dos usuários encontrados
        res.status(200).json(pesq) // Envia resposta de sucesso com a lista de usuários
    } catch (error) {
        console.error('Erro ao listar usuários', error) // Log do erro ao listar
        res.status(500).json({ message: 'Erro ao listar usuários' }) // Envia resposta de erro com status 500 (Internal Server Error)
    }
}

module.exports = { cadastrarUsuario, listarUsuario } // Exporta as funções para uso em outros módulos
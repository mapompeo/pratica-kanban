const { Tarefa, Usuario } = require('../model/associacao') // Importa os modelos Tarefa e Usuario do arquivo associacao no diretório model

const cadastrarTarefa = async (req, res) => { // Função para cadastrar uma nova tarefa
    const dados = req.body // Obtém os dados da tarefa do corpo da requisição
    console.log(dados) // Log dos dados recebidos

    try {
        const gravar = await Tarefa.create(dados, { raw: true }) // Tenta criar uma nova tarefa no banco de dados
        console.log(gravar) // Log da tarefa gravada
        res.status(201).json(gravar) // Envia resposta de sucesso com a tarefa gravada e status 201 (Created)
    } catch (error) {
        console.error('Erro ao gravar dados', error) // Log do erro
        res.status(500).json({ message: 'Erro ao cadastrar tarefa' }) // Envia resposta de erro com status 500 (Internal Server Error)
    }
}

const listarTarefa = async (req, res) => { // Função para listar todas as tarefas
    try {
        const pesq = await Tarefa.findAll({ // Tenta buscar todas as tarefas no banco de dados
            include: {
                model: Usuario, // Inclui o modelo Usuario para retornar informações do usuário relacionado
                as: 'usuario' // Define o alias para a associação
            }
        })
        res.status(200).json(pesq) // Envia resposta de sucesso com a lista de tarefas
    } catch (error) {
        console.error('Erro ao listar tarefas', error) // Log do erro ao listar
        res.status(500).json({ message: 'Erro ao listar tarefas' }) // Envia resposta de erro com status 500 (Internal Server Error)
    }
}

const excluirTarefa = async (req, res) => { // Função para excluir uma tarefa
    const valor = req.params // Obtém os parâmetros da requisição, que contêm o id da tarefa
    try {
        const pesq = await Tarefa.destroy({ where: { id_tarefa: valor.id } }) // Tenta excluir a tarefa com o id fornecido
        res.status(200).json({ message: `Tarefa excluída com sucesso` }) // Envia resposta de sucesso
    } catch (err) {
        console.error('Erro ao excluir tarefa', err) // Log do erro
        res.status(500).json({ message: "Erro ao excluir tarefa" }) // Envia resposta de erro com status 500 (Internal Server Error)
    }
}

const atualizarTarefa = async (req, res) => { // Função para atualizar o status de uma tarefa
    const valores = req.body // Obtém os dados da atualização do corpo da requisição
    console.log(valores) // Log dos valores recebidos

    try {
        const pesq = await Tarefa.update({ status: valores.status }, { where: { id_tarefa: valores.id_tarefa } }) // Tenta atualizar o status da tarefa com o id fornecido
        res.status(200).json({ message: "Dados atualizados com sucesso" }) // Envia resposta de sucesso
    } catch (err) {
        console.error(`Erro ao atualizar o status da tarefa. ${err}`) // Log do erro
        res.status(500).json({ message: "Erro ao atualizar status da tarefa" }) // Envia resposta de erro com status 500 (Internal Server Error)
    }
}

module.exports = { cadastrarTarefa, listarTarefa, excluirTarefa, atualizarTarefa } // Exporta as funções para uso em outros módulos
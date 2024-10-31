const { Tarefa, Usuario } = require('../model/associacao')

const cadastrarTarefa = async (req, res) => {
    const dados = req.body
    console.log(dados)
    try {
        const gravar = await Tarefa.create(dados, { raw: true })
        console.log(gravar)
        res.status(200).json(gravar)
    } catch (error) {
        console.error('erro ao gravar dados', error)
        res.status(500).json({ message: 'erro ao gravar dados' })
    }
}

const listarTarefa = async (req, res) => {
    try {
        const pesq = await Tarefa.findAll({
            include: {
                model: Usuario,
                as: 'usuario'
            }
        })
        res.status(200).json(pesq)
    } catch (error) {
        console.log('erro ao listar')
        res.status(200).json({ message: 'erro ao listar' })
    }
}

const excluirTarefa = async (req, res) => {
    const valor = req.params
    try {
        const pesq = Tarefa.destroy({ where: { id_tarefa: valor.id } })
        res.status(200).json(pesq)
    } catch (err) {
        res.status(500).json({ Message: "Erro ao excluir tarefa" })
    }
}

const atualizarTarefa = async (req, res) => {
    const valores = req.body
    console.log(valores)
    try {
        const pesq = await Tarefa.update({ status: valores.status }, { where: { id_tarefa: valores.id_tarefa } })
        res.status(200).json({ Message: "Dados atualizados com sucesso" })
    }
    catch (err) {
        console.error(`Erro ao atualizar o status da tarefa. ${err}`)
        res.status(500).json({ Message: "Erro ao atualizar status da tarefa" })
    }
}

module.exports = { cadastrarTarefa, listarTarefa, excluirTarefa, atualizarTarefa }
const Tarefa = require('./Tarefa')
const Usuario = require('./Usuario')

Usuario.hasMany(Tarefa, {
    foreignKey: 'id_usuario',
    as: 'tarefas',
    onDelete: 'CASCADE'
})

Tarefa.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario',
    allowNull: false
})

module.exports = { Tarefa, Usuario }
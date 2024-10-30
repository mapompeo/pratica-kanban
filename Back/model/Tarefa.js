const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Tarefa = db.define('tarefa', {
    id_tarefa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    area: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    prioridade: {
        type: DataTypes.ENUM("Baixa", "Media", "Alta"),
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM("A Fazer", "Fazendo", "Pronto"),
        defaultValue: "A fazer"
    }
}, {
    timestamps: false,
    tableName: 'tarefas'
})

module.exports = Tarefa
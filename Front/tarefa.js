function gerarBotao(status) {
    if (status === 'A Fazer') {
        return `<button data-status="Fazendo">Fazendo</button>
                <button data-status="Pronto">Pronto</button>`
    } else if (status === 'Fazendo') {
        return `<button data-status="A Fazer">A Fazer</button>
                <button data-status="Pronto">Pronto</button>`
    } else if (status === 'Pronto') {
        return `<button data-status="Fazendo">Fazendo</button>
                <button data-status="a Fazer">A Fazer</button>`
    }
}

function criarCard(tarefa) {
    const cartao = document.createElement('div')
    cartao.className = 'card'
    cartao.dataset.id = tarefa.id_tarefa

    cartao.innerHTML = `
    <p><strong>Tipo: </strong>${tarefa.tipo}</p>
    <p><strong>Area: </strong>${tarefa.area}</p>
    <p><strong>prioridade: </strong>${tarefa.prioridade}</p> 
    <p><strong>Usúario: </strong>${tarefa.usuario.nome}</p> 
    <div class="btn">
     <button id="editar">Editar</button>
        <button id="excluir">excluir</button>
    </div>
    <p><strong>Status: </strong></p>
    <div class="btn">
        ${gerarBotao(tarefa.status)}
    </div> `

    return cartao
}

function carregarTarefas() {
    fetch('http://localhost:3000/tarefas')
        .then(res => res.json())
        .then(tarefas => {
            console.log(tarefas)
            tarefas.forEach(tarefa => {
                const card = criarCard(tarefa)
                const coluna = document.getElementById(`${tarefa.status.toLowerCase().replace(' ', '-')}`)
                if (coluna) {
                    coluna.appendChild(card)
                }
            })
        })
        .catch((err) => {
            console.error('erro ao listar usuarios', err)
        })


    //     const tarefas = [
    //         {
    //             id_tarefa: "1",
    //             id_usuario: "1",
    //             tipo: "suporte",
    //             area: "tecnologia",
    //             prioridade: "Baixa",
    //             status: "A Fazer"
    //         },
    //         {
    //             id_tarefa: "2",
    //             id_usuario: "1",
    //             tipo: "concerto",
    //             area: "manutenção",
    //             prioridade: "Alta",
    //             status: "A Fazer"
    //         },
    //         {
    //             id_tarefa: "3",
    //             id_usuario: "1",
    //             tipo: "programação",
    //             area: "Desenvolvimento",
    //             prioridade: "Alta",
    //             status: "Fazendo"
    //         },
    //         {
    //             id_tarefa: "4",
    //             id_usuario: "1",
    //             tipo: "instalação",
    //             area: "suporte",
    //             prioridade: "media",
    //             status: "Pronto"
    //         },
    //     ]

    //     tarefas.forEach(tarefa =>{
    //         const card = criarCard(tarefa)
    //         const coluna = document.getElementById(`${tarefa.status.toLowerCase().replace(' ', '-')}`)
    //         if(coluna){
    //             coluna.appendChild(card)
    //         }
    //     })
}



onload = carregarTarefas


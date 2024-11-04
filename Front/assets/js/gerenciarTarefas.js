// Função para gerar botões de status baseados no status atual da tarefa.
function gerarBotao(status) {
    if (status === 'A Fazer') {
        return `<button data-status="Fazendo">Fazendo</button>
                <button data-status="Pronto">Pronto</button>`
    } else if (status === 'Fazendo') {
        return `<button data-status="A Fazer">A Fazer</button>
                <button data-status="Pronto">Pronto</button>`
    } else if (status === 'Pronto') {
        return `<button data-status="Fazendo">Fazendo</button>
                <button data-status="A Fazer">A Fazer</button>`
    }
}

// Função para criar um card HTML para uma tarefa específica.
function criarCard(tarefa) {
    const cartao = document.createElement('div')
    cartao.className = 'card'
    cartao.dataset.id = tarefa.id_tarefa

    // Define o conteúdo HTML do card, incluindo tipo, área, prioridade, e status da tarefa.
    cartao.innerHTML = `
    <p><strong>Tipo: </strong>${tarefa.tipo}</p>
    <p><strong>Área: </strong>${tarefa.area}</p>
    <p><strong>Prioridade: </strong>${tarefa.prioridade}</p> 
    <p><strong>Usuário: </strong>${tarefa.usuario.nome}</p> 
    <div class="btn">
        <button id="editar">Editar</button>
        <button id="excluir">Excluir</button>
    </div>
    <p><strong>Status: </strong></p>
    <div class="btn">
        ${gerarBotao(tarefa.status)}
    </div>`

    // Adiciona um evento de clique para o botão "editar".
    const editar = cartao.querySelector('#editar')
    editar.addEventListener('click', () => {
        editarTarefa()
    })

    // Adiciona um evento de clique para o botão "excluir".
    const excluir = cartao.querySelector('#excluir')
    excluir.addEventListener('click', () => {
        excluirTarefa(tarefa.id_tarefa)
    })

    // Adiciona eventos aos botões de status, para atualizar o status da tarefa quando clicado.
    const btnStatus = cartao.querySelectorAll('button[data-status]')
    btnStatus.forEach(btn => {
        btn.addEventListener('click', () => {
            const novoStatus = btn.getAttribute('data-status')
            atualizarTarefa(novoStatus, tarefa.id_tarefa)
        })
    })

    return cartao
}

// Função para carregar todas as tarefas da API e renderizá-las nas colunas corretas.
function carregarTarefas() {
    document.getElementById('a-fazer').innerHTML = ''
    document.getElementById('fazendo').innerHTML = ''
    document.getElementById('pronto').innerHTML = ''

    // Faz uma requisição GET para buscar as tarefas.
    fetch('http://localhost:3000/tarefas')
        .then(res => res.json())               // Converte a resposta para JSON
        .then(tarefas => {
            console.log(tarefas)               // Exibe as tarefas no console
            tarefas.forEach(tarefa => {        // Para cada tarefa:
                const card = criarCard(tarefa) // Cria um card da tarefa
                const coluna = document.getElementById(`${tarefa.status.toLowerCase().replace(' ', '-')}`)
                if (coluna) {                  // Adiciona o card na coluna correspondente ao status
                    coluna.appendChild(card)
                }
            })
        }).catch((err) => {
            console.error('Erro ao listar tarefas', err)
        })
}

// Função para excluir uma tarefa específica ao confirmar a exclusão.
function excluirTarefa(id_tarefa) {
    const apagar = confirm('Deseja apagar a tarefa?')
    if (apagar) {
        // Faz uma requisição DELETE para remover a tarefa pelo ID.
        fetch(`http://localhost:3000/tarefa/${id_tarefa}`, {
            method: 'DELETE'
        })
            .then(resposta => resposta.json()) // Converte a resposta para JSON
            .then(dados => {
                console.log(dados)
                if (dados.message) {           // Recarrega as tarefas após exclusão bem-sucedida
                    carregarTarefas()
                }
            }).catch((err) => {
                console.log("Erro ao excluir a tarefa!", err)
            })
    }
}

// Função para atualizar o status de uma tarefa.
function atualizarTarefa(status, id_tarefa) {
    const valores = {
        status: status,
        id_tarefa: id_tarefa
    }

    // Faz uma requisição PUT para atualizar o status da tarefa.
    fetch("http://localhost:3000/tarefa", {
        method: 'PUT',                         // Define o método como PUT para atualizar
        headers: { 'Content-Type': 'application/json' }, // Define o formato do corpo como JSON
        body: JSON.stringify(valores)          // Converte o objeto 'valores' para JSON e envia
    })
        .then(response => response.json())     // Converte a resposta para JSON
        .then(dados => {
            console.log(dados)
            if (dados.message) {               // Recarrega as tarefas após atualização bem-sucedida
                carregarTarefas()
            }
        })
}

// Carrega as tarefas ao carregar a página.
onload = carregarTarefas()
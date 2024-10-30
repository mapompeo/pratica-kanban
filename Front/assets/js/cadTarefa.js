let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')
let nomeSelect = document.getElementById('nome')


cadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    const id_usuario = document.getElementById('nome').value
    const tipo = document.getElementById('tipo').value
    const area = document.getElementById('area').value
    const prioridade = document.getElementById('prioridade').value

    const dados = {
        id_usuario: id_usuario,
        area: area,
        tipo: tipo,
        prioridade: prioridade
    }

    console.log(dados)

    fetch('http://localhost:3000/tarefa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(dados => {
            console.log(dados)
            //    res.innerHTML = ''
            //    res.innerHTML += 'Cadastro Feito com sucesso, <br/> ID do Usuario: ' + dados.id_usuario
        })
        .catch((err) => {
            console.error('nao foi possivel cadastrar', err)
        })
})

function carregarUsuarios() {
    fetch('http://localhost:3000/usuarios')
        .then(res => res.json())
        .then(usuarios => {
            console.log(usuarios)
            usuarios.forEach(usuario => {
                const option = document.createElement('option')
                option.value = usuario.id_usuario
                option.textContent = usuario.nome
                nomeSelect.appendChild(option)
            });
        })
        .catch((err) => {
            console.error('nao foi possivel cadastrar', err)
        })
}

onload = carregarUsuarios()
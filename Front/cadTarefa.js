

let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')
let prioridade = document.getElementById('prioridade')
let nomeSelect = document.getElementById('nome')
let area = document.getElementById('area')
let tipo = document.getElementById('tipo')

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
            })
        })
        .catch((err) => {
            console.error('nao foi possivel cadastrar', err)
        })
}

onload = carregarUsuarios()
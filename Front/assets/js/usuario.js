
let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value

    const dados = {
        nome: nome,
        email: email
    }

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(dados => {
            res.innerHTML = ''
            res.innerHTML += 'Cadastro Feito com sucesso, <br/> ID do Usuario: ' + dados.id_usuario
        })
        .catch((err) => {
            console.error('nao foi possivel cadastrar', err)
        })

})
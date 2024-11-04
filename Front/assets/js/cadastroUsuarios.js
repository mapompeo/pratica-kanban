// Seleciona o elemento HTML onde a resposta será exibida e o botão de cadastrar.
let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')

// Adiciona um evento de clique ao botão "Cadastrar".
cadastrar.addEventListener('click', (e) => {
    e.preventDefault() // Evita que a página recarregue ao enviar o formulário.

    // Coleta os valores dos campos de nome e email.
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value

    // Cria um objeto com os dados a serem enviados.
    const dados = {
        nome: nome,
        email: email
    }

    // Envia uma requisição POST para cadastrar o usuário.
    fetch('http://localhost:3000/usuario', {
        method: 'POST',                            // Define o método como POST.
        headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho para JSON.
        body: JSON.stringify(dados)                // Converte o objeto dados para JSON e o envia no corpo da requisição.
    })
        .then(res => res.json())                   // Converte a resposta para JSON.
        .then(dados => {
            res.innerHTML = ''                     // Limpa qualquer mensagem anterior.
            res.innerHTML += 'Cadastro feito com sucesso,<br/> ID do Usuário: ' + dados.id_usuario
        })
        .catch((err) => {
            console.error('Não foi possível cadastrar', err) // Exibe uma mensagem de erro no console.
        })
})

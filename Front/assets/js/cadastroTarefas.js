// Seleciona os elementos HTML necessários.
let res = document.querySelector('.res'); // Modificado para selecionar a div correta
let cadastrar = document.getElementById('cadastrar');
let nomeSelect = document.getElementById('nome');

// Função chamada quando o botão "cadastrar" é clicado.
cadastrar.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do botão.

    // Obtém os valores dos campos de entrada.
    const id_usuario = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const area = document.getElementById('area').value;
    const prioridade = document.getElementById('prioridade').value;

    // Cria um objeto com os dados que serão enviados no cadastro.
    const dados = {
        id_usuario: id_usuario,
        area: area,
        tipo: tipo,
        prioridade: prioridade
    };

    console.log(dados); // Exibe os dados no console para conferência.

    // Faz uma requisição POST para cadastrar uma nova tarefa no servidor.
    fetch('http://localhost:3000/tarefa', {  // URL do servidor
        method: 'POST',                      // Define que a requisição é POST
        headers: { 'Content-Type': 'application/json' }, // Informa o formato dos dados (JSON)
        body: JSON.stringify(dados)          // Converte o objeto 'dados' para JSON e envia no corpo da requisição
    })
    .then(res => res.json())                 // Converte a resposta do servidor para JSON
    .then(dados => {
        res.innerHTML = '';                   // Limpa qualquer mensagem anterior
        res.innerHTML += 'Cadastro feito com sucesso,<br/> ID da Tarefa: ' + dados.id_tarefa; // Exibe o ID da tarefa cadastrada
    })
    .catch((err) => {
        console.error('Não foi possível cadastrar', err); // Exibe um erro no console caso falhe
        res.innerHTML = 'Erro ao cadastrar tarefa. Tente novamente.'; // Mensagem de erro na interface
    });
});

// Função chamada ao carregar a página para obter e listar os usuários.
function carregarUsuarios() {
    fetch('http://localhost:3000/usuarios')  // Faz uma requisição GET para buscar os usuários
        .then(res => res.json())             // Converte a resposta do servidor para JSON
        .then(usuarios => {
            console.log(usuarios);            // Exibe os usuários no console
            usuarios.forEach(usuario => {     // Para cada usuário na lista
                const option = document.createElement('option'); // Cria uma nova opção para o <select>
                option.value = usuario.id_usuario;              // Define o valor da opção como o ID do usuário
                option.textContent = usuario.nome;              // Define o texto da opção como o nome do usuário
                nomeSelect.appendChild(option);                 // Adiciona a opção ao <select>
            });
        })
        .catch((err) => {
            console.error('Não foi possível carregar usuários', err); // Exibe um erro no console caso falhe
        });
}

// Chama a função 'carregarUsuarios' quando a página é carregada.
onload = carregarUsuarios()
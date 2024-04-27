function cadastrarUsuario() {
    const nome = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const setor_id = document.getElementById('setor').value; // Aqui você precisa obter o ID do setor selecionado

    // Verificar se os campos obrigatórios estão preenchidos
    if (!nome || !email || !setor_id) {
        console.error('Todos os campos devem ser preenchidos.');
        alert('Todos os campos devem ser preenchidos.');
        return;
    }

    // Dados do usuário a serem enviados para o servidor
    const userData = {
        name: nome,
        email: email,
        username: email, // Utilizei o e-mail como username, adapte conforme necessário
        setor_id: setor_id
    };

    // Enviar dados para o servidor usando fetch API
    fetch('/salvar_usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuário cadastrado:', data);
        alert('Usuário cadastrado com sucesso!');
        // Redirecionar ou fazer outras ações após o cadastro bem-sucedido
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error.message);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
    });
}

// Função para voltar para a página de menu
function voltar() {
    window.location.href = '/menu';
}
function salvarSetor() {
    console.log('Clicou no botão "Salvar"');

    const nome = document.getElementById('nome').value;
    const responsavel = document.getElementById('responsavel').value;

    console.log('Nome do setor:', nome);
    console.log('Responsável:', responsavel);

    // Verificar se os campos obrigatórios foram preenchidos
    if (!nome || !responsavel) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const data = {
        nome: nome,
        responsavel: responsavel
    };

    console.log('Enviando dados para o servidor:', data);

    fetch('/salvar_setor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar setor');
        }
        return response.json(); // Espera uma resposta JSON do servidor
    })
    .then(result => {
        console.log('Resposta do servidor:', result);
        alert('Setor cadastrado com sucesso!');
        // Redirecionar para outra página ou fazer outra ação após o cadastro bem-sucedido
    })
    .catch(error => {
        console.error('Erro ao cadastrar setor:', error);
        alert('Erro ao cadastrar setor. Por favor, tente novamente.');
    });
}

function carregarSolicitacoes() {
    // Requisição AJAX para obter as solicitações do servidor
    fetch('/listar_solicitacoes')
        .then(response => response.json())
        .then(data => {
            const setorSelect = document.getElementById('setor');

            // Limpar opções existentes
            setorSelect.innerHTML = '';

            // Adicionar opções de solicitação ao menu suspenso
            data.forEach(solicitacao => {
                const option = document.createElement('option');
                option.value = solicitacao.id;
                option.textContent = solicitacao.descricao;
                setorSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar solicitações:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const setorSelect = document.getElementById('setor');

    if (setorSelect) {
        carregarSolicitacoes();
    } else {
        console.error('Elemento com ID "setor" não encontrado na página.');
    }
});

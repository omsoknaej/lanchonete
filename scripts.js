// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

// Armazena os itens do carrinho
let carrinho = [];

// Armazena a forma de pagamento selecionada
let pagamentoSelecionado = null;


// ========================================
// FUNÇÕES DO CARRINHO
// ========================================

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

// Remove um item do carrinho pelo índice
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Atualiza a exibição do carrinho na tela
function atualizarCarrinho() {
    const container = document.getElementById('carrinho-items');
    
    // Se o carrinho estiver vazio, mostra mensagem
    if (carrinho.length === 0) {
        container.innerHTML = '<div class="carrinho-vazio">Seu carrinho está vazio</div>';
    } else {
        // Cria o HTML para cada item do carrinho
        container.innerHTML = carrinho.map((item, index) => `
            <div class="item-carrinho">
                <div class="item-info">
                    <div class="item-nome">${item.nome}</div>
                    <div class="item-preco">R$ ${item.preco.toFixed(2)}</div>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${index})">Remover</button>
            </div>
        `).join('');
    }

    // Calcula e atualiza o valor total
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    document.getElementById('total-valor').textContent = `R$ ${total.toFixed(2)}`;
    
    // Atualiza o estado do botão finalizar
    atualizarBotaoFinalizar();
}


// ========================================
// FUNÇÕES DE PAGAMENTO
// ========================================

// Seleciona a forma de pagamento
function selecionarPagamento(elemento, tipo) {
    // Remove a seleção de todos os elementos
    document.querySelectorAll('.opcao-pag').forEach(el => {
        el.classList.remove('selecionado');
    });
    
    // Adiciona a classe 'selecionado' ao elemento clicado
    elemento.classList.add('selecionado');
    
    // Armazena o tipo de pagamento selecionado
    pagamentoSelecionado = tipo;
    
    // Atualiza o estado do botão finalizar
    atualizarBotaoFinalizar();
}

// Atualiza o estado do botão de finalizar pedido
function atualizarBotaoFinalizar() {
    const btn = document.getElementById('btn-finalizar');
    // Desabilita o botão se o carrinho estiver vazio OU se não houver pagamento selecionado
    btn.disabled = carrinho.length === 0 || !pagamentoSelecionado;
}

// Retorna o nome amigável da forma de pagamento
function obterNomePagamento(tipo) {
    const nomes = {
        'dinheiro': 'Dinheiro',
        'cartao': 'Cartão de Crédito',
        'debito': 'Cartão de Débito',
        'pix': 'PIX'
    };
    return nomes[tipo] || tipo;
}


// ========================================
// FUNÇÕES DE PEDIDO
// ========================================

// Finaliza o pedido
function finalizarPedido() {
    // Validação: verifica se há itens no carrinho e se a forma de pagamento foi selecionada
    if (carrinho.length === 0 || !pagamentoSelecionado) {
        alert('Adicione itens ao carrinho e selecione uma forma de pagamento!');
        return;
    }

    // Calcula o valor total do pedido
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    
    // Cria uma lista formatada dos itens do pedido
    const itens = carrinho.map(item => `- ${item.nome}: R$ ${item.preco.toFixed(2)}`).join('\n');
    
    // Exibe mensagem de confirmação com os detalhes do pedido
    alert(`Pedido confirmado! 🎉\n\nItens:\n${itens}\n\nTotal: R$ ${total.toFixed(2)}\nPagamento: ${obterNomePagamento(pagamentoSelecionado)}\n\nSeu pedido será preparado em breve!`);
    
    // Limpa o carrinho
    carrinho = [];
    
    // Reseta a forma de pagamento
    pagamentoSelecionado = null;
    
    // Remove a seleção visual das opções de pagamento
    document.querySelectorAll('.opcao-pag').forEach(el => {
        el.classList.remove('selecionado');
    });
    
    // Atualiza a exibição do carrinho
    atualizarCarrinho();
}
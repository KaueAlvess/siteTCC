// carrinho.js

// Definir os cupons com seu valor de desconto e validade
const cupons = {
    'DESCONTO10': { desconto: 0.10, validoAte: '2025-12-31' },  // 10% de desconto válido até 31 de Dezembro de 2025
    'DESCONTO20': { desconto: 0.20, validoAte: '2025-06-30' },  // 20% de desconto válido até 30 de Junho de 2025
};

// Variável global para armazenar o valor total do carrinho
let totalCarrinho = 149.80; // Exemplo de valor inicial do carrinho

// Função para formatar os valores monetários
function formatarValor(valor) {
    return `R$ ${valor.toFixed(2)}`;
}

// Função para calcular e aplicar o cupom de desconto
function aplicarCupom(cupom) {
    const cupomInfo = cupons[cupom];

    // Verifica se o cupom existe
    if (!cupomInfo) {
        alert("Cupom inválido.");
        return;
    }

    // Verifica se o cupom está expirado
    const dataAtual = new Date();
    const dataValidade = new Date(cupomInfo.validoAte);
    if (dataAtual > dataValidade) {
        alert("Este cupom expirou.");
        return;
    }

    // Aplica o desconto
    const desconto = cupomInfo.desconto;
    const valorComDesconto = totalCarrinho - (totalCarrinho * desconto);

    // Atualiza a interface com o valor com desconto
    document.getElementById('total').textContent = formatarValor(valorComDesconto);
    document.getElementById('desconto').textContent = `Desconto: ${desconto * 100}%`;
    document.getElementById('cupom-aplicado').textContent = `Cupom aplicado: ${cupom}`;
    document.getElementById('cupom').value = ''; // Limpa o campo de cupom
}

// Função para atualizar o total do carrinho (sem cupom)
function atualizarTotal() {
    document.getElementById('total').textContent = formatarValor(totalCarrinho);
    document.getElementById('desconto').textContent = '';
    document.getElementById('cupom-aplicado').textContent = 'Nenhum cupom aplicado';
}

// Função para aplicar o cupom quando o botão for clicado
document.getElementById('aplicarCupom').addEventListener('click', function () {
    const cupomInserido = document.getElementById('cupom').value.trim().toUpperCase();
    aplicarCupom(cupomInserido);
});

// Função para remover cupom
document.getElementById('removerCupom').addEventListener('click', function () {
    atualizarTotal(); // Restaura o total sem cupom
    document.getElementById('cupom').value = ''; // Limpa o campo do cupom
    alert("Cupom removido.");
});

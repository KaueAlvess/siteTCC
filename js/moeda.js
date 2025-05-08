let totalMoedas = 100;  // Valor inicial de moedas

function atualizarMoedas() {
    document.getElementById('moedas').textContent = totalMoedas;
    document.getElementById('quantidade').value = '';
    document.getElementById('mensagem').textContent = '';
}

document.getElementById('adicionarMoedas').addEventListener('click', function () {
    const quantidade = parseInt(document.getElementById('quantidade').value);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Digite uma quantidade válida de moedas.');
        return;
    }

    totalMoedas += quantidade;
    atualizarMoedas();
    document.getElementById('mensagem').textContent = `${quantidade} moedas adicionadas com sucesso!`;
});

document.getElementById('removerMoedas').addEventListener('click', function () {
    const quantidade = parseInt(document.getElementById('quantidade').value);

    if (isNaN(quantidade) || quantidade <= 0 || quantidade > totalMoedas) {
        alert('Digite uma quantidade válida de moedas a ser removida.');
        return;
    }

    totalMoedas -= quantidade;
    atualizarMoedas();
    document.getElementById('mensagem').textContent = `${quantidade} moedas removidas com sucesso!`;
});

// Inicializar a página com o valor atual das moedas
atualizarMoedas();

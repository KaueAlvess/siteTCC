let totalCarrinho = 199.80;

function formatarValor(valor) {
    return `R$ ${valor.toFixed(2)}`;
}

function atualizarTotal() {
    document.getElementById('total').textContent = formatarValor(totalCarrinho);
    document.getElementById('desconto').textContent = '';
    document.getElementById('cupom-aplicado').textContent = 'Nenhum cupom aplicado';
}

document.getElementById('aplicarCupom').addEventListener('click', async function () {
    const cupom = document.getElementById('cupom').value.trim();

    if (cupom === '') {
        alert('Digite um cupom.');
        return;
    }

    try {
        const response = await fetch('validar-cupom.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'cupom=' + encodeURIComponent(cupom)
        });

        const data = await response.json();

        if (data.success) {
            const novoTotal = totalCarrinho - (totalCarrinho * data.desconto);
            document.getElementById('total').textContent = formatarValor(novoTotal);
            document.getElementById('desconto').textContent = `Desconto: ${data.desconto * 100}%`;
            document.getElementById('cupom-aplicado').textContent = `Cupom aplicado: ${cupom}`;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao validar o cupom.');
    }
});

document.getElementById('removerCupom').addEventListener('click', function () {
    atualizarTotal();
    document.getElementById('cupom').value = '';
    alert("Cupom removido.");
});

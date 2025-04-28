// Crie um arquivo produtos.js e adicione ao HTML
document.querySelectorAll('.produto-item button').forEach(btn => {
    btn.addEventListener('click', function() {
        const nomeProduto = this.closest('.produto-info').querySelector('h3').textContent;
        alert(`${nomeProduto} adicionado ao carrinho!`);
        // (Podemos redirecionar para o carrinho ou atualizar um contador)
    });
});
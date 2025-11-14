// Pequeno script para prevenir erro 404 e adicionar comportamento simples de navegação
document.addEventListener('DOMContentLoaded', function () {
  // Marca link ativo no menu (compara href com o arquivo atual)
  try {
    var path = window.location.pathname.split('/').pop();
    var links = document.querySelectorAll('nav a');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      if (href === path || href === './' + path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  } catch (e) {
    console.warn('Erro ao inicializar script de navegação:', e);
  }

  // Mensagem simples para confirmar carregamento do script
  if (window.console && console.log) console.log('js/script.js carregado');
});

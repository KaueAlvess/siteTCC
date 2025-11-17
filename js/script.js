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

// Mobile menu injector: floating button + overlay (only on small screens)
(function(){
  function createMobileMenu(){
    if (window.innerWidth > 720) return; // only on small screens

    // avoid duplicate
    if (document.querySelector('.mobile-menu-button')) return;

    var btn = document.createElement('button');
    btn.className = 'mobile-menu-button';
    btn.setAttribute('aria-label','Abrir menu');
    btn.innerHTML = '\u2630'; // hamburger

    var overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.setAttribute('aria-hidden','true');

    var menu = document.createElement('div');
    menu.className = 'mobile-menu';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label','Fechar menu');
    menu.appendChild(closeBtn);

    var links = [
      {href:'index.html', label:'Início'},
      {href:'produtos.html', label:'Produtos'},
      {href:'doacao.html', label:'Doar'},
      {href:'sobrenos.html', label:'Sobre nós'},
      {href:'moeda.html', label:'Trevos'}
    ];

    links.forEach(function(item){
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      menu.appendChild(a);
    });

    overlay.appendChild(menu);
    document.body.appendChild(overlay);
    // Append the mobile menu button into the header when possible so it remains visible
    var headerEl = document.querySelector('header');
    if (headerEl) headerEl.appendChild(btn);
    else document.body.appendChild(btn);

    // Ensure the button is visible on small screens even if CSS wasn't applied yet
    try{
      if (window.innerWidth <= 720){
        btn.style.display = 'flex';
        btn.style.zIndex = '2200';
        btn.style.position = 'fixed';
        btn.style.left = '16px';
        btn.style.top = 'calc(var(--header-height,72px) + 8px)';
        btn.style.width = '56px';
        btn.style.height = '56px';
        btn.style.borderRadius = '50%';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
      }
    }catch(e){ console.warn('Erro ao aplicar estilos inline no botão móvel', e); }

    function openMenu(){
      overlay.style.display = 'flex';
      // allow layout then add classes to trigger CSS transitions
      requestAnimationFrame(function(){
        overlay.classList.add('open');
        menu.classList.add('open');
        overlay.setAttribute('aria-hidden','false');
        document.body.style.overflow='hidden';
        // focus the first link for accessibility
        var firstLink = menu.querySelector('a'); if(firstLink) firstLink.focus();
      });
    }

    function closeMenu(){
      overlay.classList.remove('open');
      menu.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      // wait the CSS transition then hide from layout
      setTimeout(function(){
        overlay.style.display='none';
        document.body.style.overflow='auto';
        btn.focus();
      }, 300);
    }

    btn.addEventListener('click', function(e){ e.stopPropagation(); openMenu(); });
    closeBtn.addEventListener('click', function(e){ e.stopPropagation(); closeMenu(); });
    overlay.addEventListener('click', function(e){ if (e.target === overlay) closeMenu(); });
    window.addEventListener('keydown', function(e){ if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false'){ closeMenu(); } });
  }

  // create on load
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createMobileMenu);
  else createMobileMenu();

  // re-evaluate on resize (throttled)
  var to; window.addEventListener('resize', function(){ clearTimeout(to); to = setTimeout(createMobileMenu, 200); });
})();

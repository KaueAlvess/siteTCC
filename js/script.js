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

// Mobile menu injection removed: site will use the top `nav` as single navigation on all viewports.
// The original injector created a floating button + overlay for small screens; it has been intentionally disabled
// to keep a single consistent navbar across pages. If you later want a slide-in mobile menu, we can add
// a focused implementation that uses an accessible toggle inside the header.

// Inject a bottom navigation bar (mimics mobile app bottom-tabs)
(function(){
  // Use matchMedia for reliable detection (DevTools emulation can make innerWidth unreliable)
  var mq = window.matchMedia('(max-width:720px)');

  function shouldShowBottomNav(){
    return mq.matches;
  }

  function createBottomNav(){
    if (document.querySelector('.bottom-nav')) return; // already present
    if (!shouldShowBottomNav()) return;

    var nav = document.createElement('nav');
    nav.className = 'bottom-nav';

    var items = [
      {href:'index.html', icon:'🏠', label:'Início'},
      {href:'produtos.html', icon:'🛍️', label:'Produtos'},
      {href:'doacao.html', icon:'❤️', label:'Doar'},
      {href:'sobrenos.html', icon:'ℹ️', label:'Sobre'},
      {href:'moeda.html', icon:'🍀', label:'Trevos'}
    ];

    items.forEach(function(it){
      var a = document.createElement('a');
      a.href = it.href;
      a.innerHTML = '<span class="bn-icon">'+it.icon+'</span><span class="bn-label">'+it.label+'</span>';
      try{
        var path = window.location.pathname.split('/').pop();
        if(path === it.href || (path === '' && it.href === 'index.html')) a.classList.add('active');
      }catch(e){ }
      nav.appendChild(a);
    });

    // Before appending, check if any ancestor of `body` has a transform/filter which
    // would create a containing block that breaks `position:fixed`. If found, append
    // to <html> and mark `html.bn-force-root` so CSS fallback rules apply.
    try{
      nav.style.cssText += ';position:fixed;left:0;right:0;bottom:0;height:72px;z-index:2147483646;';
    }catch(e){}
    var appendTarget = document.body || document.documentElement;

    // detect transformed/filtering ancestor starting from <body> up to <html>
    try{
      var transformed = null;
      var walker = document.body;
      while(walker){
        var cs = window.getComputedStyle(walker);
        if((cs.transform && cs.transform !== 'none') || (cs.filter && cs.filter !== 'none') || (cs.backdropFilter && cs.backdropFilter !== '')){
          transformed = walker; break;
        }
        walker = walker.parentElement;
      }
      if(transformed){
        // append to <html> instead and mark for CSS fallback
        appendTarget = document.documentElement;
        try{ document.documentElement.classList.add('bn-force-root'); }catch(e){}
      }
    }catch(e){ /* ignore detection errors */ }

    appendTarget.appendChild(nav);

    // If this is the Trevos page, enforce inline styles for header and bottom-nav to avoid
    // any specificity/context issues that prevented fixed behavior in the past.
    try{
      if(document.body && document.body.classList.contains('page-moeda')){
        // Ensure header is fixed
        var hdr = document.querySelector('header');
        if(hdr){
          hdr.style.position = 'fixed'; hdr.style.top = '0'; hdr.style.left = '0'; hdr.style.right = '0';
          hdr.style.width = '100%'; hdr.style.zIndex = '999999'; hdr.style.transform = 'none';
        }

        // Ensure bottom-nav is pinned and its children have consistent sizing
        try{
          nav.style.position = 'fixed'; nav.style.left='0'; nav.style.right='0'; nav.style.bottom='0';
          nav.style.height = '72px'; nav.style.zIndex = '2147483646'; nav.style.padding = '8px 12px';
          var links = nav.querySelectorAll('a');
          links.forEach(function(a){
            a.style.display='flex'; a.style.flexDirection='column'; a.style.alignItems='center'; a.style.justifyContent='center';
            a.style.height='56px'; a.style.minWidth='0'; a.style.maxWidth='84px'; a.style.boxSizing='border-box';
          });
        }catch(e){/* ignore */}
      }
    }catch(e){ /* ignore */ }

    // Small runtime check: detect if a transformed ancestor is causing `position: fixed` to behave
    // like absolute (i.e. the bottom-nav appears at end of document). If detected, apply a
    // stronger inline style and add a debug class to the body so CSS fallback rules can apply.
    setTimeout(function(){
      try{
        var rect = nav.getBoundingClientRect();
        var stuck = (Math.abs(rect.bottom - window.innerHeight) > 2); // not at viewport bottom

        // Walk up ancestors to find any transformed element which can change fixed positioning
        var el = nav.parentElement;
        var transformedAncestor = null;
        while(el){
          var cs = window.getComputedStyle(el);
          if(cs.transform && cs.transform !== 'none'){ transformedAncestor = el; break; }
          if(cs.filter && cs.filter !== 'none'){ transformedAncestor = el; break; }
          el = el.parentElement;
        }

        if(stuck || transformedAncestor){
          console.warn('bottom-nav: detected layout issue. transformedAncestor=', transformedAncestor, 'rect=', rect);
          document.body.classList.add('bn-force-root');
          // attempt to force with inline !important styles
          try{
            nav.style.cssText += ';position:fixed !important; left:0 !important; right:0 !important; bottom:0 !important; z-index: 2147483647 !important;';
          }catch(e){ /* ignore */ }
        }
      }catch(e){ console.warn('bottom-nav: runtime check failed', e); }
    }, 60);
  }

  function removeBottomNav(){
    var nb = document.querySelector('.bottom-nav');
    if(nb) nb.remove();
  }

  function updateBottomNav(){
    if(shouldShowBottomNav()) createBottomNav();
    else removeBottomNav();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateBottomNav);
  else updateBottomNav();

  // respond to viewport changes reliably
  try{
    mq.addEventListener('change', updateBottomNav);
  }catch(e){
    // fallback for browsers that use addListener
    if(mq.addListener) mq.addListener(updateBottomNav);
  }

  // also ensure on resize (throttled)
  var t2; window.addEventListener('resize', function(){ clearTimeout(t2); t2 = setTimeout(updateBottomNav, 180); });
})();

// Page-specific safety: for moeda page, force header to be fixed via inline styles
(function(){
  try{
    if(document.body && document.body.classList.contains('page-moeda')){
      document.addEventListener('DOMContentLoaded', function(){
        var hdr = document.querySelector('header');
        if(!hdr) return;
        // apply inline styles to force fixed positioning
        hdr.style.position = 'fixed';
        hdr.style.top = '0px';
        hdr.style.left = '0px';
        hdr.style.right = '0px';
        hdr.style.width = '100%';
        hdr.style.zIndex = '999999';
        hdr.style.background = getComputedStyle(hdr).background || 'rgba(255,255,255,0.98)';
        // ensure no transform on header
        hdr.style.transform = 'none';
        hdr.style.webkitTransform = 'none';

        // adjust body padding-top to header height so content is not hidden
        var h = hdr.getBoundingClientRect().height || 72;
        document.body.style.paddingTop = (h + 8) + 'px';
      });
    }
  }catch(e){ console.warn('moeda header enforcement failed', e); }
})();

// Debug toggle: add `body.debug-nav` when URL contains `?debug_nav=1` (temporary helper)
(function(){
  try{
    var params = new URLSearchParams(window.location.search);
    if(params.get('debug_nav') === '1'){
      document.addEventListener('DOMContentLoaded', function(){
        document.body.classList.add('debug-nav');
        console.log('DEBUG: debug_nav enabled — header/nav outlines active');
      });
    }
  }catch(e){ console.warn('Debug toggle failed', e); }
})();

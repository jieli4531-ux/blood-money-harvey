/* Basic interaction and constraints */
(function() {
  const frame = document.getElementById('gameFrame');
  const overlay = document.getElementById('gameOverlay');

  const btnStart = document.getElementById('btnStart');
  const btnRestart = document.getElementById('btnRestart');
  const btnFullscreen = document.getElementById('btnFullscreen');

  const btnStart2 = document.getElementById('btnStart2');
  const btnRestart2 = document.getElementById('btnRestart2');
  const btnFullscreen2 = document.getElementById('btnFullscreen2');

  const downloadBtn = document.getElementById('downloadBtn');
  const downloadCta = document.getElementById('downloadCta');

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Prevent iframe inner scrolling visibility (host page)
  document.documentElement.style.overflowX = 'hidden';

  // Dynamic mobile sizing to keep game visible without inner scroll
  function adjustGameHeight() {
    var header = document.querySelector('.site-header');
    var controls = document.querySelector('.game-controls');
    var aspect = document.querySelector('.game-aspect');
    if (!aspect) return;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var headerH = header ? header.getBoundingClientRect().height : 0;
    var controlsH = controls ? controls.getBoundingClientRect().height : 0;
    if (vw <= 420) {
      var h = Math.max(240, vh - headerH - controlsH - 16);
      aspect.style.height = h + 'px';
      aspect.style.aspectRatio = 'auto';
    } else {
      aspect.style.height = '';
      aspect.style.aspectRatio = '16/9';
    }
  }
  window.addEventListener('resize', adjustGameHeight);
  window.addEventListener('orientationchange', function(){ setTimeout(adjustGameHeight, 200); });
  document.addEventListener('visibilitychange', adjustGameHeight);
  adjustGameHeight();

  function startGame() {
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.style.display = 'none';
    if (overlay) overlay.style.pointerEvents = 'none';
    try { frame.contentWindow && frame.contentWindow.focus && frame.contentWindow.focus(); } catch (e) {}
  }

  function restartGame() {
    try {
      var currentUrl = new URL(frame.src);
      currentUrl.searchParams.set('reload', Date.now().toString());
      frame.src = currentUrl.toString();
    } catch (e) {
      const src = frame.getAttribute('src');
      frame.setAttribute('src', src + (src.indexOf('?') > -1 ? '&' : '?') + 'reload=' + Date.now());
    }
    if (overlay) {
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';
    }
  }

  function requestFullscreen(el) {
    const anyEl = el;
    const req = anyEl.requestFullscreen || anyEl.webkitRequestFullscreen || anyEl.msRequestFullscreen || anyEl.mozRequestFullScreen;
    if (req) req.call(anyEl);
  }

  function goFullscreen() {
    requestFullscreen(document.querySelector('.game-aspect'));
  }

  [btnStart, btnStart2].forEach(function(b){ b && b.addEventListener('click', startGame); });
  [btnRestart, btnRestart2].forEach(function(b){ b && b.addEventListener('click', restartGame); });
  [btnFullscreen, btnFullscreen2].forEach(function(b){ b && b.addEventListener('click', goFullscreen); });

  // Mobile download restriction
  function isMobile() {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  if (isMobile()) {
    if (downloadBtn) downloadBtn.setAttribute('aria-disabled', 'true');
    if (downloadBtn) downloadBtn.classList.add('disabled');
    if (downloadBtn) downloadBtn.addEventListener('click', function(e){ e.preventDefault(); });
    if (downloadCta) downloadCta.setAttribute('aria-disabled', 'true');
    if (downloadCta) downloadCta.classList.add('disabled');
    if (downloadCta) downloadCta.addEventListener('click', function(e){ e.preventDefault(); });
  }
})();



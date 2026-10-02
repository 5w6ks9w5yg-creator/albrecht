/* Albrecht Sanitär – Bewertungs-Laufband & mobiles Menü */
function rvCreateLane(dir) {
  return { dir: dir, lane: null, track: null, pos: 0, vel: 0, speed: 0, drag: false, hover: false, hasOpen: false, resumeAt: 0, lastX: 0, lastT: 0, off: null };
}
function rvBind(l) {
  var el = l.lane;
  var now = function () { return performance.now(); };
  var down = function (e) {
    if (e.target.closest && e.target.closest('button, a')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    l.drag = true; l.vel = 0; l.lastX = e.clientX; l.lastT = now();
    el.style.cursor = 'grabbing';
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
  };
  var move = function (e) {
    if (!l.drag) return;
    var t = now(), dx = e.clientX - l.lastX, dt = Math.max(1, t - l.lastT);
    l.pos += dx; l.vel = 0.8 * (dx / dt) + 0.2 * l.vel; l.lastX = e.clientX; l.lastT = t;
  };
  var up = function () {
    if (!l.drag) return;
    l.drag = false; el.style.cursor = 'grab';
    if (now() - l.lastT > 80) l.vel = 0;
    l.vel = Math.max(-3, Math.min(3, l.vel));
    l.speed = 0; l.resumeAt = now() + 1500;
  };
  var enter = function (e) { if (e.pointerType === 'mouse') l.hover = true; };
  var leave = function (e) { if (e.pointerType === 'mouse') l.hover = false; };
  el.addEventListener('pointerdown', down);
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('lostpointercapture', up);
  el.addEventListener('pointerenter', enter);
  el.addEventListener('pointerleave', leave);
  el.style.cursor = 'grab';
  l.off = function () {
    el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
    el.removeEventListener('lostpointercapture', up); el.removeEventListener('pointerenter', enter);
    el.removeEventListener('pointerleave', leave);
  };
}
function rvStep(l, dt, t, reduce) {
  if (!l.track) return;
  var cards = l.track.querySelectorAll('.rv-card');
  var n = Math.floor(cards.length / 2);
  if (n < 1) return;
  var half = cards[n].offsetLeft - cards[0].offsetLeft;
  if (half <= 0) return;
  if (!l.drag) {
    if (Math.abs(l.vel) > 0.02) {
      l.pos += l.vel * dt; l.vel *= Math.pow(0.95, dt / 16); l.resumeAt = t + 1500;
    } else {
      l.vel = 0;
      var target = (reduce || l.hover || l.hasOpen || t < l.resumeAt) ? 0 : 0.035;
      l.speed += (target - l.speed) * Math.min(1, dt / 500);
      l.pos += l.dir * l.speed * dt;
    }
  }
  while (l.pos <= -half) l.pos += half;
  while (l.pos > 0) l.pos -= half;
  l.track.style.transform = 'translate3d(' + l.pos.toFixed(2) + 'px, 0, 0)';
}

(function () {
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var lanes = [];
  document.querySelectorAll('.rv-lane').forEach(function (el) {
    var l = rvCreateLane(parseInt(el.getAttribute('data-dir'), 10));
    l.lane = el; l.track = el.querySelector('.rv-track'); rvBind(l); lanes.push(l);
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.rv-toggle'); if (!b) return;
      var key = b.getAttribute('data-key'), open = b.getAttribute('aria-expanded') !== 'true';
      el.querySelectorAll('.rv-toggle[data-key="' + key + '"]').forEach(function (bb) {
        bb.setAttribute('aria-expanded', open ? 'true' : 'false');
        bb.textContent = open ? 'Weniger anzeigen' : 'Weiterlesen';
        var p = bb.parentNode.querySelector('.rv-text'); if (p) p.classList.toggle('is-clamped', !open);
      });
      l.hasOpen = !!el.querySelector('.rv-toggle[aria-expanded="true"]');
    });
  });
  var last = performance.now();
  (function tick(t) { var dt = Math.min(50, t - last); last = t; lanes.forEach(function (l) { rvStep(l, dt, t, reduce); }); requestAnimationFrame(tick); })(last);
  var tg = document.getElementById('navToggle'), nm = document.getElementById('navMobile');
  var setMenu = function (o) {
    nm.hidden = !o; tg.setAttribute('aria-expanded', o ? 'true' : 'false');
    tg.querySelector('.ic-menu').style.display = o ? 'none' : 'inline-flex';
    tg.querySelector('.ic-close').style.display = o ? 'inline-flex' : 'none';
  };
  tg.addEventListener('click', function () { setMenu(nm.hidden); });
  nm.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
})();


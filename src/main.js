// Thème clair / sombre (préférence mémorisée si le navigateur l'autorise)
(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) root.setAttribute('data-theme', 'light');

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Menu mobile
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Halo qui suit la souris sur les cartes (effet Cybernetic Bento Grid)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  });
});

// Apparition au défilement + remplissage des barres de niveau
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    entry.target.querySelectorAll('.bar i[data-w]').forEach(b => { b.style.width = b.dataset.w + '%'; });
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Lien actif dans la navigation
const sections = [...document.querySelectorAll('main section[id]')];
const links = new Map([...navLinks.querySelectorAll('a')].map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.remove('active'));
    const a = links.get(entry.target.id);
    if (a) a.classList.add('active');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// Onglets des spécialisations de l'IA (clavier : flèches gauche/droite)
const tabs = [...document.querySelectorAll('.spec-tab')];
function selectTab(tab) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

// Images de projets absentes : on garde l'illustration de remplacement
document.querySelectorAll('.project-media img').forEach(img => {
  img.addEventListener('error', () => img.remove());
});

// Terminal du hero : saisie animée
(function () {
  const body = document.getElementById('term-body');
  if (!body) return;
  const lines = [...body.querySelectorAll('[data-line]')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lines.forEach(l => { l.style.display = 'none'; });
  let i = 0;
  (function next() {
    if (i >= lines.length) return;
    lines[i].style.display = '';
    i++;
    setTimeout(next, lines[i - 1].dataset.line === 'cmd' ? 550 : 160);
  })();
})();

document.getElementById('year').textContent = new Date().getFullYear();

(() => {
  const projects = window.PROJECTS || [];
  const config = window.SITE_CONFIG || {};

  const toneClass = tone => `tone-${tone || 'blue'}`;

  function renderCards() {
    const workGrid = document.querySelector('#project-grid');
    const funGrid = document.querySelector('#fun-grid');
    if (!workGrid || !funGrid) return;

    projects.filter(p => p.category === 'work').forEach(p => {
      workGrid.insertAdjacentHTML('beforeend', `
        <a class="project-card reveal" href="project.html?id=${p.id}">
          <div class="card-accent ${toneClass(p.tone)}"></div>
          <div class="card-top"><span>${p.eyebrow}</span><span class="card-arrow">↗</span></div>
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
          <div class="tag-row">${p.stack.slice(0,4).map(t => `<span>${t}</span>`).join('')}</div>
        </a>`);
    });

    projects.filter(p => p.category === 'fun').forEach(p => {
      funGrid.insertAdjacentHTML('beforeend', `
        <a class="fun-card reveal" href="project.html?id=${p.id}">
          <div class="card-accent ${toneClass(p.tone)}"></div>
          <div class="card-top"><span>${p.eyebrow}</span><span class="card-arrow">↗</span></div>
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
        </a>`);
    });
  }

  function renderProject() {
    const root = document.querySelector('#project-root');
    if (!root) return;
    const id = new URLSearchParams(location.search).get('id');
    const p = projects.find(x => x.id === id) || projects[0];
    document.title = `${p.title} — Adriamo Han`;
    const current = projects.indexOf(p);
    const next = projects[(current + 1) % projects.length];

    root.innerHTML = `
      <a class="backlink" href="index.html#work">← BACK TO WORK</a>
      <section class="case-hero reveal">
        <div class="project-meta"><span class="dot ${p.tone}"></span>${p.eyebrow} · ${p.year}</div>
        <h1>${p.title}</h1>
        <p class="case-lede">${p.tagline}</p>
        <div class="tag-row case-tags">${p.stack.map(t => `<span>${t}</span>`).join('')}</div>
        ${p.url ? `<div class="case-actions"><a class="button primary project-cta" href="${p.url}" target="_blank" rel="noreferrer">${p.urlLabel || 'Visit project'} <span>↗</span></a></div>` : ''}
        <div class="case-stats">
          <div class="case-stat"><strong>${p.statA}</strong><span>PROJECT CHARACTER</span></div>
          <div class="case-stat"><strong>${p.statB}</strong><span>WHAT MAKES IT INTERESTING</span></div>
        </div>
      </section>
      ${p.video ? `
      <section class="case-media reveal" aria-labelledby="project-showcase-title">
        <div class="case-media-heading">
          <span class="case-label">PROJECT SHOWCASE</span>
          <h2 id="project-showcase-title">${p.title} in action</h2>
        </div>
        <video class="case-video" controls playsinline preload="metadata" aria-label="${p.title} project showcase">
          <source src="${p.video}" type="video/mp4">
          Your browser does not support embedded video.
        </video>
      </section>` : ''}
      <section class="case-grid reveal">
        <div class="case-label">01 · THE PROBLEM</div>
        <div class="case-content"><h2>Why this exists</h2><p>${p.why}</p></div>
      </section>
      <section class="case-grid reveal">
        <div class="case-label">02 · THE BUILD</div>
        <div class="case-content"><h2>What I made</h2><p>${p.solution}</p><div class="case-list">${p.details.map(d => `<div>${d}</div>`).join('')}</div></div>
      </section>
      <section class="case-grid reveal">
        <div class="case-label">03 · THE TAKEAWAY</div>
        <div class="case-content"><h2>What mattered</h2><p>${p.lessons}</p></div>
      </section>
      <a class="next-project reveal" href="project.html?id=${next.id}"><span><span class="case-label">NEXT PROJECT</span><br><strong>${next.title}</strong></span><span class="card-arrow">↗</span></a>
    `;
  }

  function applyConfig() {
    document.querySelectorAll('[data-config-link]').forEach(link => {
      const key = link.dataset.configLink;
      const value = config[key];
      if (!value) return;
      link.href = key === 'email' ? `mailto:${value}` : value;
    });
  }

  function initTheme() {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) document.documentElement.dataset.theme = saved;
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('portfolio-theme', next);
    }));
  }

  function initReveal() {
    const items = [...document.querySelectorAll('.reveal')];
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: .08 });
    items.forEach(el => io.observe(el));
  }

  function initCursor() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow || matchMedia('(pointer:coarse)').matches) return;
    addEventListener('pointermove', e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  renderCards();
  renderProject();
  applyConfig();
  initTheme();
  initReveal();
  initCursor();
  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
})();

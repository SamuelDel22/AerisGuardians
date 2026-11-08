/* AERIS Community Report — final campaign screen */
(function () {
  'use strict';
  const shell = document.getElementById('rpgGameShell');
  const map = document.getElementById('rpgMapScreen');
  if (!shell || !map) return;
  const CAMPAIGN_KEY = 'aeris_rpg_campaign_v2';
  const PLEDGE_KEY = 'aeris_community_report_pledge_v1';
  const missions = [
    {
      id: 'river-pressure', learning: 'river-pressure', total: 3,
      title: 'River Pressure', titleEs: 'Presión sobre el río',
      finding: 'Waste and untreated wastewater can affect the river. Safe observation and responsible reporting matter.',
      findingEs: 'Los residuos y las aguas residuales sin tratar pueden afectar el río. Importan la observación segura y el reporte responsable.',
      action: 'Separate household waste and report a suspected discharge from a safe place. Never touch unknown water.',
      actionEs: 'Separa los residuos de casa y reporta una posible descarga desde un lugar seguro. Nunca toques agua desconocida.',
      source: 'DNP — Diálogos regionales vinculantes; Ministerio de Ambiente — Resolución 2184 de 2019.'
    },
    {
      id: 'illegal-mining', learning: 'illegal-mining', total: 4,
      title: 'Illegal Mining', titleEs: 'Minería ilegal',
      finding: 'Gold-mining processes can release mercury into water and air. Mercury use in mining has been prohibited in Colombia since July 16, 2018.',
      findingEs: 'Los procesos de minería de oro pueden liberar mercurio al agua y al aire. El uso de mercurio en la minería está prohibido en Colombia desde el 16 de julio de 2018.',
      action: 'If you observe a hazard, move away, do not confront anyone, and tell a trusted adult or use official reporting channels.',
      actionEs: 'Si observas un riesgo, aléjate, no confrontes a nadie y cuéntaselo a un adulto de confianza o usa canales oficiales de reporte.',
      source: 'Cordy et al. (2011) — Science of the Total Environment; Ley 1658 de 2013 (source supplied: El Heraldo); WHO.'
    },
    {
      id: 'mercury-contamination', learning: 'mercury-contamination', total: 4,
      title: 'Mercury Contamination', titleEs: 'Contaminación por mercurio',
      finding: 'Fish that eat other fish can accumulate more mercury. The place where a fish was caught also matters; cooking does not remove mercury.',
      findingEs: 'Los peces que comen otros peces pueden acumular más mercurio. También importa dónde fue capturado el pescado; cocinarlo no elimina el mercurio.',
      action: 'Ask where fish was caught and check current health guidance, especially for children, pregnant people and breastfeeding mothers.',
      actionEs: 'Pregunta dónde fue capturado el pescado y consulta la orientación sanitaria vigente, especialmente para niños, embarazadas y madres lactantes.',
      source: 'Romero-Suárez et al. (2022) — Acta Biológica Colombiana / Revista MVZ Córdoba; INVIMA; Ministerio de Salud; WHO / PAHO.'
    },
    {
      id: 'waste', learning: 'waste', total: 3,
      title: 'Waste & Pollution', titleEs: 'Residuos y contaminación',
      finding: 'Colombia’s three-colour system uses white for clean, dry recyclables, green for organic waste and black for non-recyclables. Batteries and phones need special collection.',
      findingEs: 'El sistema colombiano de tres colores usa blanco para reciclables limpios y secos, verde para orgánicos y negro para no aprovechables. Las pilas y los celulares requieren recolección especial.',
      action: 'Start separating household waste and ask an adult to help find a post-consumer collection point for batteries and phones.',
      actionEs: 'Empieza a separar los residuos de casa y pide a un adulto que te ayude a encontrar un punto posconsumo para pilas y celulares.',
      source: 'Ministerio de Ambiente — Resolución 2184 de 2019; guidance on post-consumer collection.'
    },
    {
      id: 'habitat-recovery', learning: 'habitat-recovery', total: 4,
      title: 'Habitat Recovery', titleEs: 'Recuperación del hábitat',
      finding: 'Studies in Chocó explored plant-based gold separation; a 2024 study tested a cacao-pod-husk coagulant. These are research results, not proof of universal local adoption.',
      findingEs: 'Estudios en Chocó exploraron la separación de oro con plantas; un estudio de 2024 probó un coagulante de cáscara de cacao. Son resultados de investigación, no una prueba de adopción local generalizada.',
      action: 'Learn with an adult about a local cacao, beekeeping, fish-farming or restoration project, and ask what training and support it needs.',
      actionEs: 'Conoce con un adulto un proyecto local de cacao, apicultura, piscicultura o restauración y pregunta qué formación y apoyo necesita.',
      source: 'Brooks et al. (2015); García-Cossio et al. (2017); Montoya et al. (2024) — Mine Water and the Environment; Avancemos Bajo Cauca; DNP.'
    }
  ];
  const $ = id => document.getElementById(id);
  const isEs = () => window.currentLang === 'es';
  const text = (en, es) => isEs() ? es : en;
  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let report = document.getElementById('aerisCommunityReport');
  if (!report) {
    report = document.createElement('section');
    report.id = 'aerisCommunityReport';
    report.className = 'aerisCommunityReport';
    report.hidden = true;
    shell.appendChild(report);
  }
  function completedIds() {
    try {
      const data = JSON.parse(localStorage.getItem(CAMPAIGN_KEY) || '{}');
      return Array.isArray(data.completed) ? data.completed : [];
    } catch (_) { return []; }
  }
  function statsFor(m) {
    if (!window.AERISLearning) return { verified: 0, total: m.total, firstTry: 0 };
    return window.AERISLearning.stats(m.learning, m.total);
  }
  function allComplete() { const done = completedIds(); return missions.every(m => done.includes(m.id)); }
  function savedPledge() { try { return localStorage.getItem(PLEDGE_KEY) || ''; } catch (_) { return ''; } }
  function render() {
    const es = isEs();
    const totals = missions.reduce((acc, m) => {
      const s = statsFor(m); acc.verified += Math.min(s.verified, m.total); acc.total += m.total; acc.first += s.firstTry; return acc;
    }, { verified: 0, total: 0, first: 0 });
    const rows = missions.map((m, i) => {
      const s = statsFor(m);
      return `<article class="aerisReportMission"><div class="aerisReportMissionHead"><span>0${i + 1} / ${escapeHTML(es ? m.titleEs : m.title)}</span><b>${Math.min(s.verified, m.total)} / ${m.total} ${es ? 'ideas' : 'ideas'}</b></div><p><strong>${es ? 'Hallazgo:' : 'Finding:'}</strong> ${escapeHTML(es ? m.findingEs : m.finding)}</p><p><strong>${es ? 'Acción:' : 'Action:'}</strong> ${escapeHTML(es ? m.actionEs : m.action)}</p><small><strong>${es ? 'Fuentes:' : 'Sources:'}</strong> ${escapeHTML(m.source)}</small></article>`;
    }).join('');
    report.innerHTML = `
      <div class="aerisReportTop"><button type="button" class="aerisReportBack" id="aerisReportBack">← ${es ? 'VOLVER AL MAPA' : 'BACK TO MAP'}</button><span>AERIS // CAUCA GUARDIANS</span></div>
      <header class="aerisReportHero"><div class="aerisReportEyebrow">${es ? 'INFORME FINAL DE CAMPAÑA' : 'FINAL CAMPAIGN REPORT'} · BAJO CAUCA</div><h2>${es ? 'Informe para mi comunidad' : 'Report for my community'}</h2><p>${es ? 'Cinco misiones. Cinco aprendizajes. Acciones seguras que pueden empezar en nuestra comunidad.' : 'Five missions. Five lessons. Safe actions that can begin in our community.'}</p></header>
      <div class="aerisReportScore"><div><span>${es ? 'IDEAS VERIFICADAS' : 'IDEAS VERIFIED'}</span><strong>${totals.verified} / ${totals.total}</strong></div><div><span>${es ? 'CORRECTAS AL PRIMER INTENTO' : 'CORRECT ON FIRST TRY'}</span><strong>${totals.first}</strong></div><div><span>${es ? 'MISIONES COMPLETADAS' : 'MISSIONS COMPLETED'}</span><strong>5 / 5</strong></div></div>
      <section class="aerisReportSection"><h3>${es ? 'Hallazgos, fuentes y acciones' : 'Findings, sources and actions'}</h3><div class="aerisReportGrid">${rows}</div></section>
      <section class="aerisReportPledge"><div class="aerisReportEyebrow">${es ? 'MI COMPROMISO' : 'MY COMMITMENT'}</div><h3>${es ? '¿Qué compartirás con tu familia?' : 'What will you share with your family?'}</h3><p>${es ? 'Completa la frase con una acción concreta y una razón.' : 'Complete the sentence with one concrete action and a reason.'}</p><label for="aerisReportPledgeInput">${es ? 'Mi frase' : 'My sentence'}</label><textarea id="aerisReportPledgeInput" maxlength="500" placeholder="${es ? 'Le diré a mi familia que separemos los residuos porque…' : 'I will tell my family to sort our waste because…'}">${escapeHTML(savedPledge())}</textarea><div class="aerisReportPledgeHint">${es ? 'Modelo: “I will tell my family to ___ because ___.”' : 'Sentence frame: “I will tell my family to ___ because ___.”'}</div><div class="aerisReportActions"><button type="button" id="aerisReportSave">${es ? 'GUARDAR COMPROMISO' : 'SAVE COMMITMENT'}</button><button type="button" id="aerisReportPrint">${es ? 'IMPRIMIR / GUARDAR PDF' : 'PRINT / SAVE PDF'}</button></div><p class="aerisReportSaveStatus" id="aerisReportSaveStatus" aria-live="polite"></p></section>
      <footer class="aerisReportFooter">${es ? 'AERIS · Cauca Guardians · Proyecto educativo sobre el río Cauca y el Bajo Cauca, Antioquia.' : 'AERIS · Cauca Guardians · Educational project about the Cauca River and Bajo Cauca, Antioquia.'}</footer>`;
    $('aerisReportBack').addEventListener('click', closeReport);
    $('aerisReportSave').addEventListener('click', () => {
      const value = $('aerisReportPledgeInput').value.trim();
      try { localStorage.setItem(PLEDGE_KEY, value); $('aerisReportSaveStatus').textContent = text('Commitment saved on this device.','Compromiso guardado en este dispositivo.'); }
      catch (_) { $('aerisReportSaveStatus').textContent = text('Could not save on this device.','No se pudo guardar en este dispositivo.'); }
    });
    $('aerisReportPledgeInput').addEventListener('input', e => { try { localStorage.setItem(PLEDGE_KEY, e.target.value); } catch (_) {} });
    $('aerisReportPrint').addEventListener('click', () => window.print());
  }
  function openReport() {
    if (!allComplete()) return;
    map.hidden = true;
    ['rpgDossier','rpgMissionPlay','rpgComplete'].forEach(id => { const el = $(id); if (el) el.hidden = true; });
    render(); report.hidden = false; shell.classList.add('aerisReportOpen');
    report.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function closeReport() {
    report.hidden = true; shell.classList.remove('aerisReportOpen'); map.hidden = false;
    map.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function ensureButton() {
    const footer = map.querySelector('.rpgMapFooter');
    if (!footer) return;
    let button = $('aerisCommunityReportButton');
    if (!button) {
      button = document.createElement('button');
      button.id = 'aerisCommunityReportButton'; button.type = 'button'; button.className = 'aerisCommunityReportButton';
      button.addEventListener('click', openReport);
      footer.appendChild(button);
    }
    const ready = allComplete();
    if (button.hidden === ready) button.hidden = !ready;
    const label = text('OPEN COMMUNITY REPORT →','ABRIR INFORME COMUNITARIO →');
    if (button.textContent !== label) button.textContent = label;
    const aria = text('Open final community report','Abrir informe comunitario final');
    if (button.getAttribute('aria-label') !== aria) button.setAttribute('aria-label', aria);
  }
  ensureButton();
  const observer = new MutationObserver(ensureButton);
  observer.observe(map, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
  document.addEventListener('click', e => {
    if (e.target.closest('#langSwitch')) setTimeout(() => { ensureButton(); if (!report.hidden) render(); }, 200);
  });
  window.addEventListener('aeris:language', () => { ensureButton(); if (!report.hidden) render(); });
  window.addEventListener('storage', ensureButton);
})();

/* AERIS Learning Core — shared evidence cards, comprehension checks and local progress. */
(function () {
  'use strict';
  if (window.AERISLearning) return;

  const STORE_KEY = 'aeris_learning_core_v1';
  const copy = {
    en: {
      guide: 'FIELD GUIDE', guideTitle: 'HOW FIELD EVIDENCE WORKS',
      before: 'BEFORE THE MISSION', beforeText: 'Read a short finding and check its source before entering the field.',
      during: 'DURING THE MISSION', duringText: 'Collect evidence and prove that you understood the idea with an action.',
      after: 'AFTER THE MISSION', afterText: 'Review what you learned and choose one safe action for your community.',
      source: 'SOURCE', continue: 'CONTINUE', close: 'CLOSE', review: 'REVIEW', correct: 'IDEA VERIFIED',
      retry: 'Try again. Read the idea and choose the matching action.',
      first: 'Correct on the first try', attempts: 'Attempts',
      card: 'FIELD EVIDENCE', question: 'SHOW WHAT YOU UNDERSTOOD',
      choose: 'Choose the action that matches the evidence.',
      unavailable: 'Evidence cards for this mission will appear here when this mission is updated.',
      progress: 'LEARNING PROGRESS', noData: 'No evidence cards completed yet.'
    },
    es: {
      guide: 'GUÍA DE CAMPO', guideTitle: 'CÓMO FUNCIONA LA EVIDENCIA',
      before: 'ANTES DE LA MISIÓN', beforeText: 'Lee un hallazgo breve y revisa su fuente antes de entrar al terreno.',
      during: 'DURANTE LA MISIÓN', duringText: 'Recoge evidencia y demuestra que entendiste la idea mediante una acción.',
      after: 'DESPUÉS DE LA MISIÓN', afterText: 'Repasa lo aprendido y elige una acción segura para tu comunidad.',
      source: 'FUENTE', continue: 'CONTINUAR', close: 'CERRAR', review: 'REPASAR', correct: 'IDEA VERIFICADA',
      retry: 'Inténtalo de nuevo. Lee la idea y elige la acción que corresponde.',
      first: 'Correctas al primer intento', attempts: 'Intentos',
      card: 'EVIDENCIA DE CAMPO', question: 'DEMUESTRA LO QUE ENTENDISTE',
      choose: 'Elige la acción que corresponde a la evidencia.',
      unavailable: 'Las tarjetas de evidencia de esta misión aparecerán aquí cuando se actualice esta misión.',
      progress: 'PROGRESO DE APRENDIZAJE', noData: 'Todavía no has completado tarjetas de evidencia.'
    }
  };

  let data = { missions: {} };
  try { data = Object.assign(data, JSON.parse(localStorage.getItem(STORE_KEY) || '{}')); } catch (_) {}
  const lang = () => window.currentLang === 'es' ? 'es' : 'en';
  const t = key => copy[lang()][key] || key;
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (_) {} };
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const style = document.createElement('link');
  style.rel = 'stylesheet'; style.href = 'assets/aeris-learning-core.css';
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.className = 'aerisLearnModal'; modal.id = 'aerisLearnModal'; modal.hidden = true;
  modal.innerHTML = '<div class="aerisLearnShade" data-learn-close></div><section class="aerisLearnPanel" role="dialog" aria-modal="true" aria-labelledby="aerisLearnTitle"><button class="aerisLearnX" type="button" data-learn-close aria-label="Close">×</button><div class="aerisLearnKicker" id="aerisLearnKicker"></div><h3 id="aerisLearnTitle"></h3><div class="aerisLearnBody" id="aerisLearnBody"></div><div class="aerisLearnFeedback" id="aerisLearnFeedback" aria-live="polite"></div><div class="aerisLearnActions" id="aerisLearnActions"></div></section>';
  document.body.appendChild(modal);
  const $ = id => document.getElementById(id);
  let active = null;

  function open() { modal.hidden = false; document.body.classList.add('aerisLearnOpen'); }
  function close() { modal.hidden = true; document.body.classList.remove('aerisLearnOpen'); active = null; }
  function action(label, fn, cls) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'aerisLearnButton ' + (cls || ''); b.textContent = label; b.addEventListener('click', fn); return b;
  }
  function renderGuide() {
    $('aerisLearnKicker').textContent = 'AERIS // GUARDIAN FIELD SYSTEM';
    $('aerisLearnTitle').textContent = t('guideTitle');
    $('aerisLearnBody').innerHTML = `<div class="aerisLearnGuideGrid"><article><b>01 / ${t('before')}</b><p>${t('beforeText')}</p></article><article><b>02 / ${t('during')}</b><p>${t('duringText')}</p></article><article><b>03 / ${t('after')}</b><p>${t('afterText')}</p></article></div><p class="aerisLearnNote">${t('unavailable')}</p>`;
    $('aerisLearnFeedback').textContent = '';
    $('aerisLearnActions').replaceChildren(action(t('close'), close, 'primary'));
    open();
  }
  function getMission(missionId) {
    if (!data.missions[missionId]) data.missions[missionId] = { verified: {}, firstTry: 0, attempts: 0 };
    return data.missions[missionId];
  }
  function paintActiveCard(a) {
    if (!a) return;
    const card = a.card;
    $('aerisLearnKicker').textContent = `${t('card')} · ${String(card.phase || 'DURING').toUpperCase()}`;
    $('aerisLearnTitle').textContent = lang() === 'es' ? (card.titleEs || card.title || '') : (card.title || card.titleEs || '');
    $('aerisLearnBody').innerHTML = `<p class="aerisLearnClaim">${esc(lang() === 'es' ? (card.claimEs || card.claim || '') : (card.claim || card.claimEs || ''))}</p><div class="aerisLearnSource"><b>${t('source')}:</b> ${esc(card.source || '')}</div><div class="aerisLearnQuestion"><b>${t('question')}</b><p>${t('choose')}</p><div class="aerisLearnAnswers" id="aerisLearnAnswers"></div></div>`;
    $('aerisLearnFeedback').textContent = '';
    $('aerisLearnActions').replaceChildren();
    const answers = $('aerisLearnAnswers');
    card.answers.forEach((answer, index) => {
      const b = action(lang() === 'es' ? (answer.labelEs || answer.label) : (answer.label || answer.labelEs), () => checkAnswer(index), 'answer');
      b.dataset.answer = String(index); answers.appendChild(b);
    });
  }
  function showCard(card, options) {
    if (!card || !Array.isArray(card.answers) || card.answers.length < 2) throw new Error('AERIS Learning: each card needs at least two answers.');
    const opts = options || {}; const missionId = String(opts.missionId || 'mission'); const cardId = String(card.id || 'card');
    const record = getMission(missionId); const existing = record.verified[cardId];
    if (existing && existing.done) { if (typeof opts.onVerified === 'function') opts.onVerified(existing); return Promise.resolve(existing); }
    active = { card, missionId, cardId, record, attempts: 0, resolve: null, opts };
    paintActiveCard(active);
    open();
    return new Promise(resolve => { active.resolve = resolve; });
  }
  function checkAnswer(index) {
    if (!active) return;
    const a = active, answer = a.card.answers[index];
    a.attempts++; a.record.attempts++;
    const feedback = $('aerisLearnFeedback');
    if (answer && answer.correct) {
      const firstTry = a.attempts === 1;
      if (firstTry) a.record.firstTry++;
      const result = { done: true, firstTry, attempts: a.attempts };
      a.record.verified[a.cardId] = result; save();
      feedback.className = 'aerisLearnFeedback success'; feedback.textContent = `${t('correct')} · ${t('first')}: ${firstTry ? '1' : '0'}`;
      $('aerisLearnAnswers').querySelectorAll('button').forEach(b => b.disabled = true);
      $('aerisLearnActions').replaceChildren(action(t('continue'), () => { const cb = a.opts.onVerified; close(); if (typeof cb === 'function') cb(result); if (a.resolve) a.resolve(result); }, 'primary'));
    } else {
      feedback.className = 'aerisLearnFeedback retry'; feedback.textContent = `${t('review')}: ${lang() === 'es' ? (answer.feedbackEs || answer.feedback || t('retry')) : (answer.feedback || answer.feedbackEs || t('retry'))}`;
      $('aerisLearnAnswers').querySelectorAll('button').forEach(b => b.disabled = true);
      const retry = a.card.retryAnswers;
      if (Array.isArray(retry) && retry.length >= 2) {
        setTimeout(() => {
          if (!active || active !== a) return;
          const host = $('aerisLearnAnswers'); host.replaceChildren();
          retry.forEach((item, i) => host.appendChild(action(lang() === 'es' ? (item.labelEs || item.label) : (item.label || item.labelEs), () => checkRetry(i), 'answer')));
          feedback.textContent = t('retry');
        }, 450);
      } else {
        setTimeout(() => { if (active === a) { $('aerisLearnAnswers').querySelectorAll('button').forEach(b => b.disabled = false); feedback.textContent = t('retry'); } }, 450);
      }
    }
  }
  function checkRetry(index) {
    if (!active) return;
    const a = active, item = a.card.retryAnswers[index];
    a.attempts++; a.record.attempts++;
    if (item && item.correct) {
      const result = { done: true, firstTry: false, attempts: a.attempts };
      a.record.verified[a.cardId] = result; save();
      $('aerisLearnFeedback').className = 'aerisLearnFeedback success'; $('aerisLearnFeedback').textContent = t('correct');
      $('aerisLearnAnswers').querySelectorAll('button').forEach(b => b.disabled = true);
      $('aerisLearnActions').replaceChildren(action(t('continue'), () => { const cb = a.opts.onVerified; close(); if (typeof cb === 'function') cb(result); if (a.resolve) a.resolve(result); }, 'primary'));
    } else {
      $('aerisLearnFeedback').className = 'aerisLearnFeedback retry'; $('aerisLearnFeedback').textContent = t('retry');
      $('aerisLearnAnswers').querySelectorAll('button').forEach(b => b.disabled = false);
    }
  }
  function stats(missionId, total) {
    const r = getMission(String(missionId)); const verified = Object.values(r.verified).filter(x => x && x.done).length;
    return { verified, total: Number(total) || Object.keys(r.verified).length, firstTry: r.firstTry, attempts: r.attempts };
  }
  function allVerified(missionId, cardIds) {
    const r = getMission(String(missionId)); return (cardIds || []).every(id => r.verified[String(id)] && r.verified[String(id)].done);
  }
  function showGuide() { renderGuide(); }
  modal.addEventListener('click', e => { if (e.target.closest('[data-learn-close]')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
  window.addEventListener('aeris:language', () => { if (modal.hidden) return; if (active) paintActiveCard(active); else renderGuide(); });
  window.AERISLearning = { showGuide, showCard, stats, allVerified, close, get language() { return lang(); } };

  function addGuideButton() {
    const footer = document.querySelector('#rpgMapScreen .rpgMapFooter');
    if (!footer || document.getElementById('aerisFieldGuideButton')) return;
    const b = document.createElement('button'); b.id = 'aerisFieldGuideButton'; b.type = 'button'; b.className = 'aerisFieldGuideButton';
    b.textContent = t('guide'); b.addEventListener('click', showGuide); footer.appendChild(b);
  }
  addGuideButton();
  new MutationObserver(addGuideButton).observe(document.getElementById('rpgGameShell') || document.body, { childList: true, subtree: true });
  document.addEventListener('click', e => { if (e.target.closest('#langSwitch')) setTimeout(() => { const b = $('aerisFieldGuideButton'); if (b) b.textContent = t('guide'); if (!modal.hidden) { if (active) paintActiveCard(active); else renderGuide(); } }, 180); });
})();

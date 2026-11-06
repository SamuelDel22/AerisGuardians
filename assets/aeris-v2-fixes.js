/* AERIS 2.0 — runtime safeguards
   Keeps the original game and content intact; only hardens browser behavior. */
(function () {
  'use strict';

  const diagnostics = window.__AERIS_DIAGNOSTICS__ = window.__AERIS_DIAGNOSTICS__ || [];
  const remember = (type, message) => {
    diagnostics.push({ type, message: String(message || ''), at: Date.now() });
    if (diagnostics.length > 30) diagnostics.shift();
  };

  window.addEventListener('error', function (event) {
    remember('error', event.message || 'Uncaught browser error');
  });
  window.addEventListener('unhandledrejection', function (event) {
    const reason = event.reason && (event.reason.message || event.reason);
    remember('unhandledrejection', reason || 'Unhandled promise rejection');
  });

  /* Keep the intro dialog keyboard-accessible while it is open. */
  const dialog = document.getElementById('guardianBriefing');
  if (dialog) {
    dialog.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab' || dialog.classList.contains('hide')) return;
      const focusable = Array.from(dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(function (el) {
        return !el.hidden && el.getAttribute('aria-hidden') !== 'true' && el.getClientRects().length;
      });
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* The existing health-check function was defined but never called. */
  function checkAssistant() {
    if (typeof window.aerisHealthCheck !== 'function') return;
    Promise.resolve().then(function () {
      return window.aerisHealthCheck();
    }).catch(function (error) {
      remember('assistant-health', error && error.message ? error.message : error);
    });
  }
  if (document.readyState === 'complete') {
    checkAssistant();
  } else {
    window.addEventListener('load', checkAssistant, { once: true });
  }

  /* Mark external links opened in a new tab as isolated from the opener. */
  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    link.setAttribute('rel', Array.from(rel).join(' '));
  });
})();

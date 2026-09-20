/**
 * Aeris V31 Core Architecture
 */
(function() {
  'use strict';
  const listeners = [];
  const routes = [
    { id: 'story', title: 'Territory' },
    { id: 'mercury', title: 'Mercury' },
    { id: 'evidence', title: 'Evidence' },
    { id: 'game', title: 'Challenge' },
    { id: 'moves', title: 'Action' }
  ];

  function getRaw() {
    try {
      return JSON.parse(localStorage.getItem('aeris_guardian_v3') || '{}');
    } catch(e) {
      return {};
    }
  }

  function saveRaw(s) {
    try {
      localStorage.setItem('aeris_guardian_v3', JSON.stringify(s));
    } catch(e) {}
  }

  window.AERIS = window.AERIS || {
    routes: routes,
    getState: function() {
      const r = getRaw();
      return {
        name: localStorage.getItem('aeris_guardian_name_v6') || r.name || 'Guardian',
        best: Number(r.best) || 0,
        energy: Number(r.energy) || 0,
        relics: Number(r.relics) || 0,
        badges: Array.isArray(r.badges) ? r.badges : [],
        visited: Array.isArray(r.visited) ? r.visited : ['story'],
        missionStage: Number(r.missionStage) || 1
      };
    },
    xp: function() {
      const s = this.getState();
      return Math.min(100, Math.round(s.best * 7 + s.relics * 8 + (s.badges || []).length * 8));
    },
    level: function() {
      return Math.min(5, 1 + Math.floor(this.xp() / 20));
    },
    progress: function() {
      const s = this.getState();
      return Math.min(100, Math.round((s.best / 10) * 60 + (s.relics / 5) * 25 + (Math.min(4, (s.badges || []).length) / 4) * 15));
    },
    rank: function() {
      const x = this.xp();
      return x >= 85 ? 'RIVER LEGEND' : x >= 60 ? 'WATERSHED DEFENDER' : x >= 35 ? 'FIELD GUARDIAN' : 'RIVER ROOKIE';
    },
    isUnlocked: function(id) {
      return true;
    },
    visit: function(id) {
      const s = this.getState();
      if (!s.visited.includes(id)) {
        s.visited.push(id);
        saveRaw(s);
      }
      this.emit();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    on: function(fn) {
      if (typeof fn === 'function') listeners.push(fn);
    },
    emit: function() {
      listeners.forEach(fn => {
        try { fn(); } catch(e) { console.warn(e); }
      });
    }
  };
})();

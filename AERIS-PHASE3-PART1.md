# AERIS — Phase 3, Part 1: Shared learning system

This update adds the reusable learning infrastructure without changing mission-specific mechanics yet.

## Added
- `assets/aeris-learning-core.js`: reusable evidence-card modal, answer verification, retry flow, first-attempt tracking, per-mission local progress, language-aware labels, and a public `window.AERISLearning` API.
- `assets/aeris-learning-core.css`: responsive styling that follows the existing dark green / pixel RPG visual system and supports mobile scrolling and touch.
- A `FIELD GUIDE / GUÍA DE CAMPO` entry on the mission map that explains the BEFORE / DURING / AFTER evidence sequence.

## Public API for the next implementation parts

```js
AERISLearning.showCard({
  id: 'unique-card-id',
  phase: 'BEFORE', // BEFORE, DURING, AFTER
  title: 'Short title',
  titleEs: 'Título breve',
  claim: 'Evidence-based statement in English.',
  claimEs: 'Afirmación basada en evidencia.',
  source: 'Exact source from the approved evidence bank',
  answers: [
    { label: 'Matching action', labelEs: 'Acción correspondiente', correct: true },
    { label: 'Incorrect action', labelEs: 'Acción incorrecta', correct: false, feedback: 'Review the idea.' }
  ],
  retryAnswers: [
    { label: 'New matching phrase', labelEs: 'Nueva frase correcta', correct: true },
    { label: 'New incorrect phrase', labelEs: 'Nueva frase incorrecta', correct: false }
  ]
}, { missionId: 'mission-01' });

AERISLearning.allVerified('mission-01', ['unique-card-id']);
AERISLearning.stats('mission-01', 1);
```

The card API uses only data supplied by the mission implementation. This part does not add or invent any scientific evidence, nor does it yet alter mission objectives or boss access. Those are added in the corresponding mission implementation parts.

## Persistence and compatibility
- Learning data is stored separately under `aeris_learning_core_v1`; existing campaign progress and relics are not overwritten.
- Existing mission code, art, controls, audio, and save keys are left intact.
- English/Spanish text is refreshed when the existing language switch is used.
- All gameplay learning data can remain local; no network request is made by this module.

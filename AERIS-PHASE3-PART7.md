# AERIS — Phase 3, Part 7: Community Report

## Delivered
- Added a final “Report for my community / Informe para mi comunidad” screen inside the existing game shell.
- The report unlocks only after all five campaign missions are recorded as completed.
- Shows five mission findings, safe practical actions, and the supplied evidence-source attributions.
- Shows verified learning ideas, first-try correct answers, and the campaign completion count (5/5).
- Adds the required personal pledge field: “I will tell my family to ___ because ___.”
- Saves the pledge locally on the device as it is typed and offers a manual save confirmation.
- Adds a print action so the player can use the browser’s print dialog and choose “Save as PDF”.
- Includes English/Spanish labels and responsive layout for narrow screens.
- Includes print-specific styling to make the report readable on paper/PDF.

## Evidence sources represented
- River Pressure: DNP — Diálogos regionales vinculantes; Ministerio de Ambiente — Resolución 2184 de 2019.
- Illegal Mining: Cordy et al. (2011), Science of the Total Environment; Ley 1658 de 2013 (source supplied: El Heraldo); WHO.
- Mercury Contamination: Romero-Suárez et al. (2022), Acta Biológica Colombiana / Revista MVZ Córdoba; INVIMA; Ministerio de Salud; WHO / PAHO.
- Waste & Pollution: Ministerio de Ambiente — Resolución 2184 de 2019; post-consumer collection guidance.
- Habitat Recovery: Brooks et al. (2015); García-Cossio et al. (2017); Montoya et al. (2024), Mine Water and the Environment; Avancemos Bajo Cauca; DNP.

## Accuracy safeguards
- The report describes the Chocó plant method and cacao-husk coagulant as research, not universal local adoption.
- Alternative livelihoods are described as possibilities requiring local training and support.
- The report does not introduce new numerical environmental claims beyond the user's supplied evidence bank.

## Validation and limits
- All 7 project JavaScript files passed `node --check`.
- ZIP archive integrity was checked after packaging.
- This is static code validation; real browser/device interaction still needs testing on PC and mobile.
- The report unlock depends on all five mission IDs being present in the existing campaign save (`aeris_rpg_campaign_v2`).

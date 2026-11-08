# AERIS — Informe de intervención Stage 2

**Proyecto:** AERIS — Cauca Guardians  
**Propósito:** concientización estudiantil sobre la contaminación del Río Cauca, con énfasis en Caucasia y el Bajo Cauca antioqueño.  
**Dirección visual:** retro RPG / pixel-art.  
**Alcance:** prioridades 1 a 5 solicitadas por el usuario.

## Resumen ejecutivo

Se mejoró la presentación visual, la experiencia del juego, el contenido educativo, los controles y la adaptación a pantallas pequeñas. Se mantuvieron los recursos visuales y de audio originales.

**Exclusión explícita:** no se modificó el chatbot ni el asistente de IA, sus prompts, lógica, scripts o integración.

## Intervenciones

| Prioridad | Trabajo realizado |
|---|---|
| 1. Visual | Pulido de navegación, hero, tipografía, tarjetas, galería, mapa, marcadores, paneles RPG, foco y estados interactivos. |
| 2. Juego | Tres pruebas por misión, progresión dinámica, controles de teclado, joystick táctil y barra de progreso accesible. |
| 3. Educación | Quince preguntas bilingües nuevas o ampliadas, con explicaciones sobre ribera, minería, mercurio, residuos y restauración ecológica. |
| 4. Rendimiento | Ajustes prudentes para pantallas táctiles, efectos hover, `will-change` contextual y movimiento reducido. |
| 5. Móvil | Ajustes para mapa, marcadores, leyenda, controles, panel de batalla y anchos de pantalla pequeños. |

## Mejoras en las cinco misiones

Cada misión contiene tres rondas:
1. Presión sobre el río: observación segura, limpieza responsable y función de la ribera.
2. Minería ilegal: documentación segura, erosión/sedimentos y reporte a autoridades.
3. Contaminación por mercurio: detección por análisis, redes alimentarias y orientación sanitaria confiable.
4. Residuos y contaminación: manejo seguro, prevención y residuos desconocidos.
5. Recuperación del hábitat: evaluación del sitio, especies nativas y restauración con guía ecológica local.

Las preguntas y respuestas están disponibles en inglés y español. Cada ronda tiene exactamente una respuesta correcta.

## Validaciones ejecutadas

- 35 bloques JavaScript inline: 0 errores de sintaxis.
- 5 archivos JavaScript externos: 0 errores de sintaxis.
- CSS: 0 errores de parseo.
- HTML parseado: 108 IDs, 0 duplicados.
- Referencias locales: 34 verificadas, 0 faltantes.
- Prueba de datos del juego: 5 misiones × 3 rondas; todas bilingües y con una respuesta correcta por ronda.
- Recursos de imagen/audio originales: 0 modificados.
- Archivo ZIP: integridad verificada.

## Límites

No se completó una prueba funcional real en navegador ni una prueba manual en dispositivos físicos. Por ello, la adaptación responsive se revisó en el código y sus reglas CSS, pero todavía requiere confirmación visual en iPhone/Android y escritorio.

El Worker no está incluido en el ZIP. El chatbot/asistente de IA permanece sin cambios.

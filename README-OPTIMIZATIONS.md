# AERIS — Cauca Guardians

Proyecto estudiantil bilingüe de concientización ambiental sobre el Río Cauca, con enfoque en Caucasia y el Bajo Cauca antioqueño. La experiencia combina información ambiental, fotografías de campo y una campaña educativa en formato retro RPG.

## Identidad y alcance

- Mantener la estética retro / pixel-art / RPG como identidad central.
- El juego es un recurso educativo: las misiones convierten temas ambientales en retos de aprendizaje.
- El contenido debe distinguir entre resultados de estudios publicados, observaciones locales y recomendaciones.
- El sitio no es una plataforma de monitoreo ambiental ni ofrece mediciones en tiempo real.
- Los recursos gráficos y de audio originales se conservan.

## Estructura técnica observada

- `index.html`: página principal, contenido, traducciones y buena parte de la lógica integrada.
- `assets/aeris-v2.css`: hoja de estilos principal heredada.
- `assets/aeris-rpg-overhaul.css`: capa visual retro RPG y mejoras de accesibilidad.
- `assets/aeris-v2-fixes.js`: correcciones auxiliares.
- `assets/aeris-rpg-overhaul.js`: campaña RPG y progreso.
- `assets/`: imágenes, mapas, personajes, insignias, reliquias y audio.

El proyecto usa HTML/CSS/JavaScript estáticos. El ZIP recibido no contiene el código del Worker ni un backend desplegable.

## Revisión de calidad aplicada

- Reparación de etiquetas HTML void mal formadas (`img`, etc.).
- Eliminación de un cierre `</style>` huérfano en el encabezado.
- Añadido un destino real para el enlace de navegación `Information`.
- Añadido un enlace para saltar al contenido y un landmark `main`.
- Protección `rel="noopener noreferrer"` para enlaces que abren pestañas nuevas.
- Precisión del texto sobre metilmercurio para atribuirlo a un estudio publicado de la cuenca baja Cauca–Magdalena.
- Nota educativa que explica el alcance de la muestra: 160 peces en total, incluidos 38 del grupo Bajo Cauca; no es un análisis en tiempo real de todo el río.
- Añadidas referencias de la OMS y Universidad del Valle junto con el estudio de Acta Biológica Colombiana.
- La nota de evidencia cambia entre inglés y español.
- Añadidos ajustes de accesibilidad que conservan el lenguaje visual RPG.

## Validaciones ejecutadas en esta revisión

- 34 bloques JavaScript inline: `node --check` sin errores de sintaxis.
- 2 archivos JavaScript externos: `node --check` sin errores de sintaxis.
- Hojas CSS: analizadas con `tinycss2`, sin errores de parseo.
- HTML analizado con parser tolerante: 106 IDs en DOM, sin IDs duplicados.
- Referencias locales de `src` y `href`: 34 revisadas, ninguna faltante.
- Etiquetas void mal formadas restantes: 0.
- Estructura `main` y `body`: etiquetas de apertura y cierre balanceadas.

La ejecución de Chromium headless no pudo completarse en el entorno de auditoría porque el proceso del navegador falló al inicializar el subsistema gráfico. Por tanto, esta entrega no afirma que se haya realizado una prueba funcional completa en navegador.

## Pendiente de validar en producción

- URL pública de Cloudflare Pages y su comportamiento en dispositivos reales.
- Worker: `GET /health`, `POST /api/chat`, CORS, límites de uso y gestión de secretos.
- Respuesta y disponibilidad de imágenes alojadas en dominios externos.
- Pruebas manuales de todas las misiones, joystick, persistencia, traducción y audio en móvil y escritorio.

## Despliegue estático

Para Cloudflare Pages, mantener `index.html` en la raíz del directorio publicado. Si el sitio usa un Worker separado, conservar su configuración y desplegarlo por separado; no colocar claves privadas en el HTML público.

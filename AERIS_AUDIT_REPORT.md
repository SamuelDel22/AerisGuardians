# AERIS — Informe de auditoría técnica

**Proyecto:** Cauca Guardians — AERIS  
**Propósito:** proyecto estudiantil bilingüe de concientización sobre la contaminación del Río Cauca, con énfasis en Caucasia y el Bajo Cauca antioqueño.  
**Enfoque de diseño:** retro RPG / pixel art.  
**Alcance revisado:** ZIP entregado en esta conversación.

## Hallazgos y correcciones

| Área | Hallazgo | Acción |
|---|---|---|
| HTML | Atributos ubicados después de `/` en etiquetas de imagen y otros elementos void | Normalizadas las etiquetas |
| HTML | Cierre `</style>` sin apertura correspondiente | Eliminado |
| Navegación | El enlace `Information` apuntaba a un ID inexistente | Añadido ancla compatible sin quitar `#story` |
| Accesibilidad | Faltaba un enlace para saltar al contenido y un landmark principal | Añadidos skip link y `<main>` |
| Seguridad | Enlaces `target=_blank` sin `rel` explícito | Añadido `noopener noreferrer` |
| Ciencia | El texto podía interpretarse como si describiera el estado actual de todo el río | Atribuido a la investigación publicada y aclarado el alcance de la muestra |
| Fuentes | Hacía falta reforzar las fuentes primarias y de salud pública | Añadidas OMS y Universidad del Valle |
| Bilingüismo | La nota metodológica nueva debía acompañar el idioma seleccionado | Añadido cambio automático inglés/español |
| Diseño | Ajustes de accesibilidad sin romper el estilo | Añadidos estilos retro compatibles |

## Evidencia ambiental incorporada

El texto se apoya en el estudio de Cruz Esquivel y Marrugo Negrete (2021), publicado en *Acta Biológica Colombiana*, sobre concentraciones de metilmercurio en bocachico (*Prochilodus magdalenae*) y moncholo (*Hoplias malabaricus*) en la cuenca baja Cauca–Magdalena. El estudio examinó 160 peces, incluidos 38 del grupo de Bajo Cauca. La página ahora aclara que estos resultados corresponden a muestras tomadas en sitios y momentos específicos y no son un monitoreo en tiempo real de todo el río.

También se incluye la ficha de la Organización Mundial de la Salud sobre mercurio y salud, y una referencia de la Universidad del Valle sobre monitoreo participativo de impactos en salud en el río Nechí.

## Validaciones

- JavaScript inline: 34 bloques revisados con `node --check`, sin errores de sintaxis.
- JavaScript externo: 2 archivos revisados con `node --check`, sin errores de sintaxis.
- CSS: hojas analizadas con `tinycss2`, sin errores de parseo.
- HTML: parser tolerante, sin IDs duplicados en el DOM analizado.
- Recursos locales: 34 referencias comprobadas, 0 faltantes.
- Etiquetas void mal formadas: 0 restantes.
- Estructura de `main` y `body`: apertura y cierre balanceados.

## Limitaciones no ocultadas

No se pudo completar una prueba automatizada de navegador porque Chromium falló al iniciar su subsistema gráfico en el entorno de auditoría. No se comprobó el despliegue real, el Worker, la disponibilidad del chatbot, CORS ni las imágenes externas. El ZIP no contiene el código fuente del Worker. Esos puntos requieren la URL desplegada y/o los archivos del backend.

## Principio editorial del proyecto

AERIS es una herramienta educativa, no una autoridad de medición ambiental. Debe explicar el problema con rigor, reconocer a las comunidades que dependen del río, evitar generalizaciones sobre toda el agua o todos los peces y promover el aprendizaje, la verificación de fuentes y la protección ambiental.

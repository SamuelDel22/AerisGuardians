# AERIS — Retro RPG Remaster

Esta actualización se construyó sobre el ZIP correcto del proyecto. La identidad retro/RPG queda como regla visual permanente: pixel art, interfaz de consola, mapas de misión, reliquias, niveles, diálogos y efectos de videojuego. No se convirtió el sitio en una página corporativa ni en un juego 3D genérico.

## Rediseño visual

- Se añadió `assets/aeris-rpg-overhaul.css`, una capa visual retro consistente para toda la web: paleta de bosque y río, marcos pixelados, paneles de consola, botones arcade, tipografía monoespaciada y contraste reforzado.
- Se rediseñaron visualmente navegación, portada, secciones informativas, fotografías, tarjetas, fuentes y pie de página para que formen parte del mismo universo RPG.
- Se reforzó la presentación del mapa, expedientes de misión, escena jugable, jefe, diálogo, joystick, controles y pantalla de victoria.
- Se añadieron transiciones por pasos, pulso de puntos de misión y partículas pixeladas al obtener una reliquia.
- Se conservó el soporte de movimiento reducido y se ajustó la interfaz para pantallas pequeñas.

## Juego RPG: campaña mejorada

- Se añadió `assets/aeris-rpg-overhaul.js` como nueva lógica de campaña.
- La campaña contiene cinco misiones temáticas: presión sobre el río, minería ilegal, mercurio, residuos y recuperación del hábitat.
- Cada misión incluye narrativa, localización, jefe, reliquia y dos pruebas de conocimiento con tres opciones, explicación de cada respuesta y posibilidad de volver a intentarlo si la decisión no es correcta.
- El jugador debe avanzar por el escenario para activar el encuentro. Puede moverse con la rueda táctil, los botones direccionales o las teclas de flecha / A y D.
- Las misiones se desbloquean de forma progresiva. Completar una misión entrega XP y una reliquia; una primera partida sin errores otorga un bono adicional.
- Se añadió rango de Guardián, barra de campaña, contador de XP, colección de reliquias y progreso persistente en `localStorage`.
- Las misiones completadas se pueden repetir, pero no permiten farmear XP ni duplicar reliquias.
- Se añadió un control para reiniciar la campaña guardada en ese dispositivo.
- La campaña y sus textos principales funcionan en inglés y español.

## Estabilidad y accesibilidad

- Se corrigieron errores de scripts heredados que intentaban renderizar un cuestionario eliminado o acceder a componentes que ya no existen.
- Se protegieron las traducciones y el panel de progreso ante elementos opcionales ausentes.
- Se corrigieron referencias obsoletas del módulo de juego y del asistente que podían generar errores de ejecución.
- Se conservaron los controles de sonido existentes y se conectaron efectos de recompensa al cierre de misión.
- Se mantuvieron foco visible, controles por teclado, etiquetas accesibles y compatibilidad con `prefers-reduced-motion`.

## Multimedia

No se modificó ningún archivo multimedia. Los 52 recursos originales de imagen, SVG y audio permanecen byte por byte idénticos. No se cambiaron formatos, dimensiones, nombres ni rutas.

## Validaciones realizadas

- Los 34 bloques JavaScript inline superan `node --check`.
- Los dos archivos CSS principales pasan el análisis de sintaxis con `tinycss2`.
- No hay IDs duplicados ni referencias locales faltantes en el HTML.
- Se ejecutó una prueba automatizada de interfaz en Chromium mediante contenido local inyectado: apertura de misión, movimiento, combate, respuesta incorrecta y reintento, dos respuestas correctas, pantalla de victoria y avance de campaña.
- Se completaron las cinco misiones en la prueba: 5/5 misiones, 5/5 reliquias y 1.200 XP acumulados en una partida perfecta.
- Se verificó el cambio de idioma y se comprobó que no aparecieran errores JavaScript durante la prueba.
- Se comprobaron anchos de 320, 390, 768, 1024 y 1440 px: no se detectó desbordamiento horizontal.

## Límites de la validación

El entorno de pruebas bloquea la navegación normal a direcciones locales de Chromium, por lo que la prueba automatizada se ejecutó inyectando el HTML, CSS y JavaScript locales en el navegador. No se ha verificado el despliegue real en Cloudflare Pages ni el funcionamiento del Worker, `/health` o `/api/chat`; para eso se necesita probar la URL pública y la configuración real del Worker.

## Publicación en Cloudflare Pages

1. Descomprime el ZIP.
2. En GitHub, reemplaza el contenido del repositorio por el contenido de la carpeta `AerisGuardians-main`.
3. Conserva la configuración del Worker por separado, si existe.
4. Haz commit y push.
5. Espera el nuevo deployment de Cloudflare Pages.
6. Prueba el sitio en móvil y computador: inicio, selector de idioma, mapa, misiones, joystick, controles, respuestas, reliquias, progreso y sonido.

## Nota sobre el asistente IA

El frontend comprueba `/health` en el mismo origen de Pages, como estaba previsto en el código original. Si el Worker está desplegado en otro dominio, configura `window.AERIS_CONFIG.workerUrl` con la URL real del Worker en el punto de configuración existente. No se inventó ni se sustituyó una URL de backend.

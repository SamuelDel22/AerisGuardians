# AERIS — Cauca Guardians | Stage 2

Proyecto estudiantil bilingüe de concientización ambiental sobre la contaminación del Río Cauca, con énfasis en Caucasia y el Bajo Cauca antioqueño. La experiencia mantiene una identidad retro RPG / pixel-art y utiliza el juego como recurso educativo.

## Alcance de esta entrega

Se trabajó únicamente en las cinco prioridades solicitadas:

1. Pulido visual del sitio y del universo RPG.
2. Mejora del juego: progresión, controles, accesibilidad y contenido de las misiones.
3. Refuerzo educativo y científico de las cinco misiones.
4. Mejoras prudentes de rendimiento y reducción de efectos costosos en pantallas táctiles.
5. Ajustes responsive para móviles y pantallas pequeñas.

**No se modificó el chatbot ni el asistente de IA.** Tampoco se cambió su integración o sus scripts.

## Cambios principales

### 1. Identidad visual y presentación
- Se conserva la estética retro RPG, los colores de bosque/agua, los bordes pixelados y los recursos originales.
- Se refinan jerarquías tipográficas, navegación, tarjetas, galería, estados hover y focos de teclado.
- Se refuerza la presentación del mapa, marcadores, dossier, paneles de batalla y recompensas.
- No se sustituyeron ni editaron imágenes, ilustraciones, mapas o audio.

### 2. Juego y controles
- Cada una de las cinco misiones ahora tiene tres pruebas educativas, en lugar de dos.
- La progresión de batalla calcula dinámicamente el número de pruebas y el medidor de amenaza.
- Se agregan controles de teclado: flechas izquierda/derecha y A/D cuando el Guardián o el joystick tienen el foco.
- El joystick táctil mantiene el control por arrastre y recibe mejoras de interacción táctil.
- La barra de avance ahora expone su valor como una barra de progreso accesible.
- Se corrige el punto inicial del indicador de distancia para comenzar en 0%.

### 3. Educación ambiental
Se añadieron preguntas y explicaciones bilingües sobre:
- Función ecológica de la vegetación ribereña.
- Seguridad y documentación responsable ante posibles actividades mineras.
- Metilmercurio, evidencia científica y orientación de autoridades sanitarias.
- Manejo seguro de residuos peligrosos o desconocidos.
- Restauración de hábitats con especies nativas y orientación ecológica local.

El juego evita presentar observaciones aisladas como prueba automática de ilegalidad, y no recomienda manipular maquinaria, residuos desconocidos ni agua potencialmente contaminada.

### 4. Rendimiento
- Se reducen efectos hover que no aportan en dispositivos táctiles.
- Se evita reservar `will-change` de forma permanente; se aplica al personaje mientras se mueve.
- Se mantienen los recursos y efectos visuales principales.
- Se incorpora respeto global a `prefers-reduced-motion`.
- Las imágenes originales mantienen sus atributos de carga existentes.

### 5. Experiencia móvil
- Se refinan los tamaños y disposición del mapa, marcadores, leyenda y barras.
- Se mejora el espacio de juego, el panel de preguntas y las respuestas en pantallas pequeñas.
- Se mejora el tamaño del joystick táctil y se declara `touch-action: none` para evitar gestos de scroll accidentales sobre él.
- Se limita el desbordamiento horizontal y se ajustan los controles para anchos muy pequeños.

## Validaciones técnicas realizadas

- 35 bloques JavaScript inline: sin errores de sintaxis con `node --check`.
- 5 archivos JavaScript externos: sin errores de sintaxis.
- Hojas CSS: sin errores de parseo con `tinycss2`.
- HTML parseado: 108 IDs y sin IDs duplicados.
- 34 referencias locales revisadas: ninguna faltante.
- Datos del juego: 5 misiones, 3 rondas por misión, exactamente una respuesta correcta por ronda y contenido bilingüe en todas las rondas.
- Recursos originales: ningún archivo de imagen, ilustración, mapa o audio fue modificado.
- Integridad del ZIP: verificada.

## Limitaciones de verificación

Estas validaciones son estáticas y de datos. No equivalen a una prueba manual completa en iPhone, Android o escritorio. La prueba automatizada de navegador no se completó en este entorno, así que el comportamiento visual final debe confirmarse en los dispositivos reales y en el despliegue de Cloudflare Pages.

El código del Worker no forma parte del ZIP y queda fuera de esta entrega. El chatbot/asistente de IA tampoco fue intervenido, tal como se solicitó.

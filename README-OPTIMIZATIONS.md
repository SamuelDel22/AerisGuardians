# AERIS — Cauca Guardians (optimized)

## What changed
- Converted 44 JPG/PNG assets to WebP and updated all references. The raster assets went from about 21.6 MB to about 6.4 MB (roughly 70% smaller).
- Added a page description, theme color, hero-image preload, skip link, keyboard focus styling, and smooth-scroll offset for the fixed navigation.
- Added lazy loading and asynchronous image decoding to non-critical images.
- Made the chatbot submit flow reject duplicate submissions while a request is in progress, and reliably restore the send button after success/failure.
- Made the saved-best-score read tolerant of browsers where localStorage is unavailable.
- Removed a permanently running animation-frame loop from the RPG effects; the effect now responds to player movement and pauses while the page is hidden.
- Added navigation/game-control accessibility and safe `rel` attributes for external links.

## Cloudflare Pages deployment
1. Upload/replace the repository contents with this folder's contents (keep `index.html` at the project root).
2. In Cloudflare Pages, use the same build settings as the current static project: no build command and the repository root as the output directory, unless your project uses a separate build pipeline.
3. Deploy and test on both desktop and mobile.

## Chatbot / Worker configuration
The frontend calls `/health` and `/api/chat` on the current site origin by default. This works when those routes are implemented on the same Cloudflare Pages origin (for example, Pages Functions or a Worker route).

If the AI Worker is hosted on a separate origin, set its public base URL in the `AERIS_CONFIG` block in `index.html`:
```js
window.AERIS_CONFIG = window.AERIS_CONFIG || {
  workerUrl: 'https://YOUR-WORKER-DOMAIN'
};
```
Use the actual deployed Worker URL; do not include `/api/chat` at the end. The Worker must implement `GET /health` and `POST /api/chat`, handle CORS for the Pages domain, and keep API secrets in Cloudflare environment variables—not in frontend code.

## Validation performed
- All inline JavaScript blocks passed `node --check`.
- All local image references were migrated to WebP and checked against the files in this package.
- The original ZIP did not include the Cloudflare Worker/backend source, so backend routes, API keys, CORS, rate limits, and live chatbot availability could not be verified from this package.
- A live browser/device test against your deployed Cloudflare site is still needed to confirm the exact behavior in production.

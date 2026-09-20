import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static assets from the current directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Do not serve index.html for missing static assets
app.get(/\.(js|css|map|png|jpg|jpeg|gif|svg|ico|wav|mp3|woff|woff2|ttf|eot)$/, (req, res) => {
  res.status(404).send('Not Found');
});
app.get(/^\/assets\//, (req, res) => {
  res.status(404).send('Not Found');
});

// Fallback to index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cauca Guardians server running on http://0.0.0.0:${PORT}`);
});

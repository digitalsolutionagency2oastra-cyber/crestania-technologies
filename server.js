import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Health check endpoint for GoDaddy PaaS / Cloud health probes
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Fallback: If dist/ is missing because platform didn't run build step, build it on boot
if (!fs.existsSync(distPath) || !fs.existsSync(indexPath)) {
  console.log('[Production Server] dist/index.html not found. Executing build...');
  try {
    execSync('npm run build', { stdio: 'inherit', env: process.env });
    console.log('[Production Server] Build completed successfully.');
  } catch (err) {
    console.error('[Production Server] Build failed during bootstrap:', err);
  }
}

// Serve static assets from Vite build output directory
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      // Don't cache index.html for instant updates
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  // Single Page Application (SPA) catch-all route fallback
  app.get('*', (_req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(503).send('Application build in progress. Please refresh in a moment.');
    }
  });
} else {
  app.get('*', (_req, res) => {
    res.status(503).send('Application build in progress. Please refresh in a moment.');
  });
}

app.listen(PORT, HOST, () => {
  console.log(`[Production Server] Listening on http://${HOST}:${PORT}`);
});

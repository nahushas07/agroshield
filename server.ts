import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes for AgroShield Prototype
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      platform: 'AGROSHIELD - Watershed-Aware Agricultural Decision Intelligence',
      version: '1.0.0-prototype',
      mode: 'DEMO DATA',
      region: 'Mandya District, Karnataka',
      watershed: 'Shimsha Sub-Basin (WS-04)',
      timestamp: new Date().toISOString(),
    });
  });

  // Prototype Runoff Risk Model Evaluation Endpoint
  app.post('/api/risk/evaluate', (req: Request, res: Response) => {
    const { rainForecastMm, soilMoisturePercent, slopePercent } = req.body;

    const rain = Number(rainForecastMm) || 16.4;
    const moisture = Number(soilMoisturePercent) || 76;
    const slope = Number(slopePercent) || 3.8;

    // Prototype weighted formula
    const rainScore = Math.min(100, Math.round((rain / 30) * 85 + 15));
    const moistureScore = Math.min(100, Math.round(moisture > 70 ? 70 + (moisture - 70) * 1.5 : moisture));
    const slopeScore = Math.min(100, Math.round(slope * 16));

    const totalScore = Math.round(rainScore * 0.35 + moistureScore * 0.25 + slopeScore * 0.20 + 70 * 0.12 + 45 * 0.08);

    res.json({
      score: totalScore,
      level: totalScore >= 76 ? 'VERY_HIGH' : totalScore >= 51 ? 'HIGH' : totalScore >= 26 ? 'MODERATE' : 'LOW',
      factors: {
        rainfallContribution: rainScore,
        soilMoistureContribution: moistureScore,
        slopeContribution: slopeScore,
      },
      status: 'Decision support estimate based on prototype mathematical weighting.',
    });
  });

  // Mount Vite middleware in development, or serve dist in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AgroShield server active at http://0.0.0.0:${PORT}`);
  });
}

startServer();

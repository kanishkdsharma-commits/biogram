import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static insights data for demo purposes
  app.get('/api/insights', (req, res) => {
    try {
      const insightsPath = path.join(process.cwd(), 'client/src/data/insights.json');
      const insights = JSON.parse(fs.readFileSync(insightsPath, 'utf8'));
      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load insights data' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'Biogram Health Platform'
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

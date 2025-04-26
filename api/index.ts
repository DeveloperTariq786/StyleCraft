import { createServer } from 'http';
import { parse } from 'url';
import express, { type Request, Response, NextFunction } from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
registerRoutes(app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default async (req: any, res: any) => {
  const parsedUrl = parse(req.url!, true);
  
  // Handle API requests through Express
  app(req, res);
}; 
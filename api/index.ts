import express, { type Request, Response, NextFunction } from 'express';
import { registerRoutes } from '../server/routes';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
const server = registerRoutes(app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  return new Promise((resolve, reject) => {
    // Process the request through Express
    app(req, res, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve(undefined);
    });
  });
} 
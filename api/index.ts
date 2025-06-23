// Vercel serverless function handler
import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { setupVite, serveStatic, log } from "../server/vite";

const app = express();

// HTTP Basic Authentication middleware
const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  // Skip authentication for static assets and development files
  const skipPaths = [
    '/src/',
    '/node_modules/',
    '/@vite/',
    '/@id/',
    '/@fs/',
    '/favicon.ico',
    '/vite.svg',
    '/__vite_ping'
  ];
  
  // Skip auth for development assets and API calls from authenticated frontend
  const isStaticAsset = skipPaths.some(path => req.path.startsWith(path)) || 
                       req.path.endsWith('.js') || 
                       req.path.endsWith('.css') || 
                       req.path.endsWith('.map') ||
                       req.path.endsWith('.svg') ||
                       req.path.endsWith('.png') ||
                       req.path.endsWith('.jpg') ||
                       req.path.endsWith('.ico');
  
  if (isStaticAsset) {
    return next();
  }

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // For HTML requests (browser navigation), show auth dialog
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Hochzeit Eillen & Dennis - Nur für eingeladene Gäste"');
      return res.status(401).send(`
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <title>Anmeldung erforderlich</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9f9f9; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #666; line-height: 1.6; }
            .heart { color: #ff6b6b; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Anmeldung erforderlich <span class="heart">💕</span></h1>
            <p>Diese Seite ist nur für eingeladene Gäste zugänglich.</p>
            <p>Bitte verwende die Zugangsdaten aus deiner Einladung.</p>
          </div>
        </body>
        </html>
      `);
    }
    
    // For API requests, return JSON error
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'Bitte verwende die Zugangsdaten aus deiner Einladung.' 
    });
  }
  
  // Decode Basic Auth
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  // Check credentials (you should use environment variables for these)
  const validUsername = process.env.AUTH_USERNAME || 'eileen';
  const validPassword = process.env.AUTH_PASSWORD || 'dennis';
  
  if (username === validUsername && password === validPassword) {
    return next();
  }
  
  // Invalid credentials
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Hochzeit Eillen & Dennis - Nur für eingeladene Gäste"');
    return res.status(401).send(`
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <title>Ungültige Anmeldedaten</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9f9f9; }
          .container { max-width: 400px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          h1 { color: #e74c3c; margin-bottom: 20px; }
          p { color: #666; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Ungültige Anmeldedaten</h1>
          <p>Die eingegebenen Daten sind nicht korrekt.</p>
          <p>Bitte überprüfe deine Zugangsdaten aus der Einladung.</p>
        </div>
      </body>
      </html>
    `);
  }
  
  return res.status(401).json({ 
    error: 'Invalid credentials',
    message: 'Die eingegebenen Daten sind nicht korrekt.' 
  });
};

// Apply authentication middleware to all routes
app.use(basicAuth);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Register API routes
registerRoutes(app);

// Serve static files in production
serveStatic(app);

export default app;

import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// ...existing code...

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
            h1 { color: #d4a574; margin-bottom: 20px; }
            p { color: #666; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎩 Hochzeit Eillen & Dennis 💒</h1>
            <p>Diese Seite ist nur für eingeladene Gäste zugänglich.</p>
            <p>Bitte verwenden Sie die Zugangsdaten von Ihrer Einladungskarte.</p>
          </div>
        </body>
        </html>
      `);
    }
    // For API requests, return JSON
    return res.status(401).json({ message: 'Authentifizierung erforderlich' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Simple credentials for wedding guests
  const validCredentials = [
    { username: 'hochzeit', password: 'eillen2026' },
    { username: 'gast', password: 'dennis2026' },
    { username: 'einladung', password: 'gutsonenberg' }
  ];

  const isValid = validCredentials.some(cred => 
    cred.username === username && cred.password === password
  );

  if (!isValid) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Hochzeit Eillen & Dennis - Nur für eingeladene Gäste"');
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.status(401).send(`
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <title>Ungültige Anmeldedaten</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9f9f9; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #d4a574; margin-bottom: 20px; }
            p { color: #666; line-height: 1.6; }
            .error { color: #e74c3c; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎩 Hochzeit Eillen & Dennis 💒</h1>
            <p class="error">Ungültige Anmeldedaten</p>
            <p>Bitte überprüfen Sie Ihre Zugangsdaten von der Einladungskarte.</p>
          </div>
        </body>
        </html>
      `);
    }
    return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
  }

  next();
};

// Apply authentication to all routes
app.use(basicAuth);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

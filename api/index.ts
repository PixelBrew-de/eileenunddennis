// API handler for Docker deployment
import express, { type Request, Response, NextFunction } from "express";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add CORS headers
app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Simple test route
app.get('/', (req: any, res: any) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Eileen & Dennis - Hochzeit</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          text-align: center; 
          padding: 50px; 
          background: linear-gradient(135deg, #ff6b6b, #ffa500);
          color: white;
        }
        .container { 
          max-width: 500px; 
          margin: 0 auto; 
          background: rgba(255,255,255,0.1); 
          padding: 40px; 
          border-radius: 20px; 
          backdrop-filter: blur(10px);
        }
        h1 { margin-bottom: 20px; font-size: 2.5em; }
        .heart { font-size: 3em; margin: 20px 0; }
        p { font-size: 1.2em; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Eileen & Dennis</h1>
        <div class="heart">💕</div>
        <p>Willkommen zu unserer Hochzeits-RSVP Seite!</p>
        <p>Die Anwendung läuft erfolgreich auf unserem Server! 🎉</p>
      </div>
    </body>
    </html>
  `);
});

// Health check
app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

export default app;

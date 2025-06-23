import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // RSVP endpoint
  app.post("/api/rsvp", async (req, res) => {
    try {
      const validatedData = insertRsvpSchema.parse(req.body);
      const rsvp = await storage.createRsvp(validatedData);
      res.json({ success: true, rsvp });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Ungültige Daten", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Serverfehler" 
        });
      }
    }
  });

  // Get all RSVPs (optional, for admin purposes)
  app.get("/api/rsvps", async (req, res) => {
    try {
      const rsvps = await storage.getRsvps();
      res.json(rsvps);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Serverfehler" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

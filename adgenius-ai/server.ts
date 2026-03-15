import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // In-memory "Database"
  const campaigns: any[] = [];

  // Initialize Gemini
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // --- Mock Ad Platform APIs ---
  app.post("/api/meta/createCampaign", async (req, res) => {
    console.log("Sent to Meta API:", req.body.campaign.name);
    await new Promise((r) => setTimeout(r, 2000)); // Simulate delay
    res.json({ status: "ACTIVE", campaign_id: `META_${Math.floor(Math.random() * 1000000)}` });
  });

  app.post("/api/google/createCampaign", async (req, res) => {
    console.log("Sent to Google API:", req.body.campaign.name);
    await new Promise((r) => setTimeout(r, 2000)); // Simulate delay
    res.json({ status: "ENABLED", campaign_id: `GOOGLE_${Math.floor(Math.random() * 1000000)}` });
  });

  // --- AI Campaign Engine ---
  // Moved to frontend as per guidelines

  // --- Campaign Storage ---
  app.post("/api/campaigns", (req, res) => {
    const campaign = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      metrics: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        spend: 0,
      },
    };
    campaigns.push(campaign);
    console.log("Campaign Active:", campaign.id);
    res.json(campaign);
  });

  app.get("/api/campaigns", (req, res) => {
    res.json(campaigns);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

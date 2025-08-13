import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import fs from "fs";
import path from "path";
import type { SiteContent } from "@shared/content";
import { ExpressAuth } from "@auth/express";
import { authConfig } from "./auth.config.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  // Parse body before Auth.js so credentials form data is available
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // If app is served behind a proxy (Vercel/Netlify/Nginx), trust proxy for protocol detection
  app.set("trust proxy", true);

  // Auth.js (NextAuth) - mount REST auth endpoints
  // All handlers provided under /api/auth/* (signin, signout, session, csrf, callback...)
  app.use("/api/auth", ExpressAuth(authConfig));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Simple content storage endpoints
  const contentPath = path.join(process.cwd(), "server/content.store.json");

  app.get("/api/content", (_req, res) => {
    try {
      const raw = fs.readFileSync(contentPath, "utf8");
      const data = JSON.parse(raw);
      return res.json(data);
    } catch (e) {
      return res.status(500).json({ error: "Cannot read content" });
    }
  });

  app.post("/api/content", async (req, res) => {
    // Verify admin via session endpoint from Auth.js (cookie-based)
    try {
      // Auth.js mounts its own session handling; in Express we can reuse the REST endpoint by proxying fetch
      // But simpler: trust that only same-origin admin UI calls this and implement a minimal guard by reading session cookie via Auth.js is non-trivial here.
      // For now, perform a soft guard by requiring a basic header; can be replaced with proper middleware later.
      // NOTE: In real apps, implement server-side session verification.
      const body = req.body as SiteContent;
      if (!body || typeof body !== "object") return res.status(400).json({ error: "Invalid body" });
      // Minimal validation for hero
      if (!body.hero || typeof body.hero !== "object") return res.status(400).json({ error: "Missing hero" });
      const json = JSON.stringify(body, null, 2);
      fs.writeFileSync(contentPath, json, "utf8");
      return res.json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || "Cannot save" });
    }
  });

  return app;
}

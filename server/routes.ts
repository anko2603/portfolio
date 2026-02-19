
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  // Seed the database on startup
  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "Project Alpha",
      description: "A futuristic dashboard for analyzing celestial data.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      link: "#",
      tags: ["React", "D3.js", "WebGL"],
      order: 1,
    });
    await storage.createProject({
      title: "Neon City",
      description: "Immersive 3D experience of a cyberpunk metropolis.",
      imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
      link: "#",
      tags: ["Three.js", "GSAP", "Blender"],
      order: 2,
    });
    await storage.createProject({
      title: "Zenith OS",
      description: "A web-based operating system concept.",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      link: "#",
      tags: ["TypeScript", "Framer Motion", "Vite"],
      order: 3,
    });
    await storage.createProject({
      title: "Quantum Finance",
      description: "High-frequency trading platform visualization.",
      imageUrl: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&q=80",
      link: "#",
      tags: ["WebSockets", "Canvas API", "Node.js"],
      order: 4,
    });
  }
}

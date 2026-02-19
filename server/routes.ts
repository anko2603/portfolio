
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
      title: "Multi-Brand E-Commerce Platform",
      description: "Architected 10+ high-performing e-commerce stores with custom themes and advanced inventory management.",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      link: "#",
      tags: ["Shopify", "Liquid", "WordPress"],
      order: 1,
    });
    await storage.createProject({
      title: "Full-Stack E-Commerce App",
      description: "Complete e-commerce platform with secure authentication and payment processing.",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      link: "#",
      tags: ["Django", "PostgreSQL", "REST API"],
      order: 2,
    });
    await storage.createProject({
      title: "SEO Optimization Engine",
      description: "Performance-focused storefronts with 100/100 Lighthouse scores and optimized conversion rates.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      link: "#",
      tags: ["SEO", "Analytics", "Performance"],
      order: 3,
    });
  }
}

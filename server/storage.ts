
import { projects, type Project, type InsertProject } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.order);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }
}

export const storage = new DatabaseStorage();

import { Project } from "@shared/schema";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative w-full"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-transform duration-500 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/0 transition-colors duration-500" />
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          
          {/* Floating Action Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-black"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 font-display">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-white/40 pt-2">0{index + 1}</span>
          </div>
          
          <p className="text-white/60 mb-6 line-clamp-3 flex-1 font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

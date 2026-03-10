import { ScrollytellingCanvas } from "@/components/ScrollytellingCanvas";
import { ProjectCard } from "@/components/ProjectCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: projects, isLoading, error } = useProjects();
  
  // Sort by order field if available
  const sortedProjects = projects?.sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-white">
      <Navigation />

      {/* Hero / Scrollytelling Section */}
      <main>
        <ScrollytellingCanvas />
        
        {/* Projects Section */}
        <section id="work" className="relative z-10 bg-background py-32 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-4">
                  Selected Work
                </h2>
                <p className="text-lg text-white/50 max-w-lg">
                  A collection of projects exploring the intersection of design, technology, and user experience.
                </p>
              </div>
              
              <div className="hidden md:block">
                 <span className="text-sm text-white/30 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">
                    2021 — 2024
                 </span>
              </div>
            </div>

            {isLoading ? (
              <div className="h-96 w-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : error ? (
              <div className="h-96 w-full flex flex-col items-center justify-center text-red-400">
                <p>Failed to load projects.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
                {sortedProjects?.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index} 
                  />
                ))}
                
                {(!sortedProjects || sortedProjects.length === 0) && (
                   <div className="col-span-full h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                      <p className="text-white/30">No projects published yet.</p>
                   </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative z-10 bg-zinc-900 py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
             <div className="lg:col-span-5">
                {/* Descriptive comment for Unsplash Image */}
                {/* portrait of creative developer working in dark studio with neon lights */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                   <img 
                      src="/static/hero-video.webp" 
                      alt="Ankita Gautam Portrait"
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                   />
                </div>
             </div>
             
             <div className="lg:col-span-7 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-8">
                   Shopify & WordPress specialist.<br/>
                   <span className="text-white/40">Driven by e-commerce impact.</span>
                </h2>
                <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
                   <p>
                      I'm Ankita Gautam, an e-commerce specialist with expertise in platform customization, theme development, and digital storefront optimization.
                   </p>
                   <p>
                      With a strong background in Shopify Liquid, WordPress, and Python, I architect high-converting storefronts that have generated over $2M+ in annual revenue for clients.
                   </p>
                   <p>
                      My focus is on creating seamless, high-performance shopping experiences that blend technical excellence with strategic conversion optimization.
                   </p>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
                   {[
                      { label: "E-Commerce", value: "Shopify, WordPress" },
                      { label: "Frontend", value: "Liquid, JavaScript" },
                      { label: "Backend", value: "Python, Django" },
                      { label: "Marketing", value: "Klaviyo, SEO/CRO" },
                   ].map((skill) => (
                      <div key={skill.label}>
                         <h4 className="text-sm uppercase tracking-widest text-white/30 mb-2">{skill.label}</h4>
                         <p className="font-medium text-white">{skill.value}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="relative z-10 bg-background py-32 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-16">
              Experience
            </h2>

            <div className="space-y-12">
              {/* Experience 1 */}
              <div className="border-l-2 border-accent pl-8 pb-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Shopify & WordPress Developer</h3>
                    <p className="text-lg text-accent font-semibold">Adverta Pvt. Ltd.</p>
                  </div>
                  <span className="text-white/50 text-sm whitespace-nowrap">Dec 2025 – Present</span>
                </div>
                <p className="text-white/40 text-sm mb-4">Kanpur, Uttar Pradesh</p>
                <ul className="space-y-3 text-white/70 text-base leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Architected and deployed 12+ SEO-optimized Shopify and WordPress storefronts generating $2M+ annual revenue for e-commerce clients</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Customized Shopify Liquid themes and WordPress templates using HTML5, CSS3, JavaScript achieving 40% improvement in conversion rates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Integrated marketing automation: Google Analytics, Facebook Pixel, Klaviyo, Mailchimp for data-driven CRO optimization</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Optimized performance: reduced page load speed from 2.5s to 1.2s, achieved 100/100 Lighthouse score, implemented PCI-compliant payment gateways</span>
                  </li>
                </ul>
              </div>

              {/* Experience 2 */}
              <div className="border-l-2 border-accent pl-8 pb-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Shopify & WordPress Developer</h3>
                    <p className="text-lg text-accent font-semibold">4 Fox Business Solution Pvt. Ltd.</p>
                  </div>
                  <span className="text-white/50 text-sm whitespace-nowrap">Feb 2025 – Nov 2025</span>
                </div>
                <p className="text-white/40 text-sm mb-4">Kanpur, Uttar Pradesh</p>
                <ul className="space-y-3 text-white/70 text-base leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Customized and deployed 15+ responsive Shopify and WordPress themes for U.S.-based DTC and SaaS e-commerce clients</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Developed pixel-perfect responsive layouts using HTML5, CSS3, JavaScript achieving 99.5% cross-browser compatibility</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Integrated third-party applications (Gorgias, Loox, Yotpo, Aftership) and plugins; delivered zero defects in QA testing</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Optimized development workflow: reduced development time by 25% using custom CSS frameworks and reusable component libraries</span>
                  </li>
                </ul>
              </div>

              {/* Experience 3 */}
              <div className="border-l-2 border-accent pl-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Python Developer Intern</h3>
                    <p className="text-lg text-accent font-semibold">InfoVirTech Private Limited</p>
                  </div>
                  <span className="text-white/50 text-sm whitespace-nowrap">Apr 2024 – Jun 2024</span>
                </div>
                <p className="text-white/40 text-sm mb-4">Kanpur, Uttar Pradesh</p>
                <ul className="space-y-3 text-white/70 text-base leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Built scalable backend services using Python, Django, PostgreSQL with focus on RESTful API design and microservices architecture</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Optimized database performance: reduced query execution time by 35% using Django ORM and Redis caching implementation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Applied advanced data structures and algorithms achieving 2x performance improvement on critical workflows</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

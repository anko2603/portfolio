import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, type InsertProject } from "@shared/schema";
import { useCreateProject, useProjects } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  const createProject = useCreateProject();
  const { data: projects } = useProjects();

  const form = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      tags: [],
      order: 0,
    },
  });

  const onSubmit = async (data: InsertProject) => {
    try {
      await createProject.mutateAsync(data);
      toast({ title: "Success", description: "Project created successfully" });
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white font-display">Project Manager</h1>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
             View Site
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Form */}
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input className="bg-white/5 border-white/10" placeholder="Project Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className="bg-white/5 border-white/10" placeholder="Brief description..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input className="bg-white/5 border-white/10" placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Link</FormLabel>
                        <FormControl>
                          <Input className="bg-white/5 border-white/10" placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-white/5 border-white/10" 
                            placeholder="React, Design, API" 
                            value={field.value?.join(", ") || ""}
                            onChange={(e) => {
                              const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                              field.onChange(tags);
                            }} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-white text-black hover:bg-white/90"
                    disabled={createProject.isPending}
                  >
                    {createProject.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Create Project
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* List View */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Existing Projects</h2>
            <div className="space-y-3">
              {projects?.map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-white">{project.title}</h4>
                    <p className="text-xs text-white/50 truncate max-w-[200px]">{project.link}</p>
                  </div>
                </div>
              ))}
              {!projects?.length && (
                <p className="text-white/30 italic">No projects found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

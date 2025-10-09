"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { api } from "@/lib/api"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [visibleProjects, setVisibleProjects] = useState<number>(6)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects({ featured: true })
        if (response.success) {
          setProjects(response.data.slice(0, 10))
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Extract all unique technologies from projects
  const allTechnologies = projects.reduce((acc: string[], project) => {
    project.technologies?.forEach((tech: string) => {
      if (!acc.includes(tech)) acc.push(tech);
    });
    return acc;
  }, []);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => 
        project.technologies?.includes(activeFilter)
      );

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 3);
  };

  if (loading) {
    return (
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Skeleton className="mx-auto h-10 w-64" />
            <Skeleton className="mx-auto mt-4 h-6 w-80" />
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-6">
                    <Skeleton className="mb-2 h-7 w-40" />
                    <Skeleton className="mb-4 h-16 w-full" />
                    <div className="mb-4 flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                    <div className="flex gap-3">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || projects.length === 0) {
    return (
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Selected Work</h2>
            <p className="text-lg text-muted-foreground">Projects I've built and contributed to</p>
          </div>
          <div className="rounded-xl border border-border bg-card/30 p-12 text-center text-muted-foreground backdrop-blur-sm">
            {error || "No projects available at the moment."}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-32">
      {/* Enhanced background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-muted/5 via-background to-muted/10"></div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 bottom-40 h-96 w-96 rounded-full bg-gradient-to-r from-accent/10 to-primary/5 blur-3xl animate-float delay-0"></div>
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-gradient-to-l from-primary/8 to-accent/12 blur-3xl animate-morph"></div>
        <div className="absolute top-1/3 left-1/3 h-64 w-64 rounded-full bg-gradient-to-br from-accent/5 to-secondary/10 blur-2xl animate-pulse-ring"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-block rounded-full glass px-6 py-2 text-sm font-medium text-accent border border-accent/20">
            💼 My Work
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent md:text-5xl lg:text-6xl">
            Selected Work
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
            Projects I've built and contributed to
          </p>
        </motion.div>
        
        {/* Enhanced technology filters */}
        {allTechnologies.length > 0 && (
          <motion.div 
            className="mb-16 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={activeFilter === "All" ? "default" : "ghost"}
                size="sm"
                className={`rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === "All" 
                    ? "glass bg-gradient-to-r from-accent to-primary text-white shadow-lg hover-glow" 
                    : "glass border border-border/50 hover:border-accent/30 hover:text-accent"
                }`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </Button>
            </motion.div>
            {allTechnologies.slice(0, 8).map((tech, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant={activeFilter === tech ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === tech 
                      ? "glass bg-gradient-to-r from-accent to-primary text-white shadow-lg hover-glow" 
                      : "glass border border-border/50 hover:border-accent/30 hover:text-accent"
                  }`}
                  onClick={() => setActiveFilter(tech)}
                >
                  {tech}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -12 }}
            >
              <Card className="group relative h-full overflow-hidden glass border-accent/20 transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover-glow">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                <CardContent className="relative p-0">
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center glass text-muted-foreground">
                        <span className="text-sm font-medium">No image</span>
                      </div>
                    )}
                    {/* Enhanced overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
                    
                    {/* Floating action buttons on hover */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      {project.links?.live && (
                        <Button size="sm" className="rounded-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      {project.links?.github && (
                        <Button size="sm" className="rounded-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 p-8">
                    <h3 className="mb-3 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                      {project.title}
                    </h3>
                    
                    <p className="mb-6 line-clamp-2 text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {project.description}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                        <Badge 
                          key={i} 
                          variant={tech === activeFilter ? "default" : "secondary"}
                          className={`transition-all duration-300 font-medium ${
                            tech === activeFilter 
                              ? "bg-gradient-to-r from-accent to-primary text-white shadow-md" 
                              : "glass border-accent/20 hover:border-accent/40 hover:bg-accent/10"
                          }`}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies?.length > 3 && (
                        <Badge variant="outline" className="glass border-accent/20 font-medium">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.links?.live && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full glass border-accent/30 transition-all duration-300 hover:bg-accent/10 hover:scale-105" 
                          asChild
                        >
                          <Link href={project.links.live} target="_blank">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.links?.github && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full glass border-accent/30 transition-all duration-300 hover:bg-accent/10 hover:scale-105" 
                          asChild
                        >
                          <Link href={project.links.github} target="_blank">
                            <Github className="mr-2 h-3 w-3" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={loadMoreProjects} 
              variant="outline" 
              className="group rounded-full glass border-accent/30 px-10 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 hover-glow"
            >
              Load More Projects
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

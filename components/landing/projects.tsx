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
    <section id="projects" className="relative px-6 py-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 bottom-40 h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute -right-10 top-20 h-80 w-80 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Selected Work</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Projects I've built and contributed to</p>
        </motion.div>
        
        {/* Technology filters */}
        {allTechnologies.length > 0 && (
          <motion.div 
            className="mb-10 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              variant={activeFilter === "All" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-full text-sm font-medium"
              onClick={() => setActiveFilter("All")}
            >
              All
            </Button>
            {allTechnologies.slice(0, 8).map((tech, index) => (
              <Button
                key={index}
                variant={activeFilter === tech ? "secondary" : "ghost"}
                size="sm"
                className="rounded-full text-sm font-medium"
                onClick={() => setActiveFilter(tech)}
              >
                {tech}
              </Button>
            ))}
          </motion.div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="group relative h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-muted/70 text-muted-foreground">
                        <span className="text-sm">No image</span>
                      </div>
                    )}
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>

                  <div className="relative z-10 p-6">
                    <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                        <Badge 
                          key={i} 
                          variant={tech === activeFilter ? "default" : "secondary"}
                          className="transition-all duration-300 hover:bg-accent/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies?.length > 3 && (
                        <Badge variant="outline" className="bg-background/50">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.links?.live && (
                        <Button variant="outline" size="sm" className="rounded-full transition-all hover:bg-accent/10" asChild>
                          <Link href={project.links.live} target="_blank">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.links?.github && (
                        <Button variant="outline" size="sm" className="rounded-full transition-all hover:bg-accent/10" asChild>
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
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={loadMoreProjects} 
              variant="outline" 
              className="rounded-full border-accent/30 bg-accent/5 px-8 transition-all hover:bg-accent/10"
            >
              Load More 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

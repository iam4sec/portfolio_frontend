"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { api } from "@/lib/api"
import { motion } from "framer-motion"

export function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
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
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

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

  if (loading) {
    return (
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-16 w-80 bg-slate-200 dark:bg-slate-700 rounded-2xl mx-auto"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-slate-100 dark:bg-slate-800 p-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">No projects available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 via-blue-400/8 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/8 via-emerald-400/6 to-transparent rounded-full blur-3xl animate-morph"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 px-6 py-3 text-sm font-medium border border-purple-200/50 dark:border-purple-700/50">
            <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300">My Work</span>
          </div>
          <h2 className="mb-6 text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-100 dark:to-white bg-clip-text text-transparent">
              Selected
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Projects I've built and contributed to
          </p>
        </motion.div>
        
        {allTechnologies.length > 0 && (
          <motion.div 
            className="mb-16 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              variant={activeFilter === "All" ? "default" : "outline"}
              size="sm"
              className={`rounded-2xl text-sm font-semibold transition-all duration-300 ${
                activeFilter === "All" 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg" 
                  : "bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
              }`}
              onClick={() => setActiveFilter("All")}
            >
              All
            </Button>
            {allTechnologies.slice(0, 8).map((tech, index) => (
              <Button
                key={index}
                variant={activeFilter === tech ? "default" : "outline"}
                size="sm"
                className={`rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  activeFilter === tech 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg" 
                    : "bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
                }`}
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
            >
              <Card className="group h-full overflow-hidden bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20">
                        <div className="text-center">
                          <div className="h-16 w-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{project.title.charAt(0)}</span>
                          </div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Project Preview</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.links?.live && (
                        <Button size="sm" className="rounded-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30" asChild>
                          <Link href={project.links.live} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {project.links?.github && (
                        <Button size="sm" className="rounded-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30" asChild>
                          <Link href={project.links.github} target="_blank">
                            <Github className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    
                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                        <Badge 
                          key={i} 
                          className={`text-xs ${
                            tech === activeFilter 
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
                              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {project.links?.live && (
                        <Button variant="outline" size="sm" className="flex-1 rounded-xl" asChild>
                          <Link href={project.links.live} target="_blank">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Demo
                          </Link>
                        </Button>
                      )}
                      {project.links?.github && (
                        <Button variant="outline" size="sm" className="flex-1 rounded-xl" asChild>
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
              onClick={() => setVisibleProjects(prev => prev + 3)} 
              variant="outline" 
              className="group rounded-2xl bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 px-8 py-3 text-base font-semibold hover:bg-white/70 dark:hover:bg-slate-800/70"
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
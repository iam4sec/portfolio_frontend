"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"

export function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects()
        if (response.success) {
          setProjects(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const defaultProjects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
      image: "/placeholder.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates",
      image: "/placeholder.jpg",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization dashboard with interactive charts and reports",
      image: "/placeholder.jpg",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ]

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-80 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const displayProjects = projects.length ? projects : defaultProjects

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Featured Work
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A selection of projects that showcase my expertise and passion for creating exceptional digital experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {displayProjects.filter(p => p.featured).map((project, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.filter(p => !p.featured).map((project, index) => (
            <div key={index} className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
              <p className="text-slate-600 mb-4 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                  <span key={techIndex} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-3">
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Project
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" className="text-slate-600 hover:text-slate-700 text-sm font-medium">
                    Code
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="group">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
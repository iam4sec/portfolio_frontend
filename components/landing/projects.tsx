"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import SectionWrapper from "./section-wrapper"
import { motion, Variants } from "framer-motion"

const ProjectsComponent = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects()
        if (response.success) {
          setProjects((response.data as any) || [])
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
      description:
        "A full-stack e-commerce solution with robust features including product management, user authentication, and Stripe integration for payments.",
      image: "/placeholder.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with real-time updates, enabling teams to organize tasks, track progress, and communicate effectively.",
      image: "/placeholder.jpg",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Analytics Dashboard",
      description:
        "A data visualization dashboard that provides insightful analytics through interactive charts and reports, built with D3.js and a Python backend.",
      image: "/placeholder.jpg",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-96 bg-slate-200 dark:bg-gray-700 rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const displayProjects = projects.length ? projects : defaultProjects

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg mb-8">
          <span className="text-lg">💼</span>
          <span>Featured Work</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-emerald-400 dark:via-teal-400 dark:to-amber-300 bg-clip-text text-transparent">
            My Projects
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          A curated selection of projects that showcase my passion for creating innovative digital solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-3 hover:border-emerald-300/50 dark:hover:border-emerald-600/50"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 z-10" />
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 z-20">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.technologies.map((tech: string, i: number) => {
                  const colors = [
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
                    'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                  ]
                  return (
                    <span
                      key={i}
                      className={`px-4 py-2 ${colors[i % colors.length]} text-xs font-semibold rounded-xl border border-current/20 shadow-sm`}
                    >
                      {tech}
                    </span>
                  )
                })}
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex-1"
                  asChild
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  asChild
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const Projects = SectionWrapper(ProjectsComponent, "projects")
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
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          My Projects
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          A selection of my work.
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
            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
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
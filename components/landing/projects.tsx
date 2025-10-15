"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"
import { motion, Variants } from "framer-motion"

export function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")

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
      title: "Enterprise SaaS Platform",
      description:
        "A comprehensive enterprise software solution with advanced analytics, user management, and real-time collaboration features. Built with modern architecture and scalable design patterns.",
      image: "/placeholder.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      category: "Web",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Mobile Banking App",
      description:
        "A secure and intuitive mobile banking application with biometric authentication, transaction history, and seamless money transfer capabilities.",
      image: "/placeholder.jpg",
      technologies: ["React Native", "TypeScript", "Firebase", "Stripe"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "An intelligent data visualization platform that leverages machine learning to provide predictive insights and automated reporting for business intelligence.",
      image: "/placeholder.jpg",
      technologies: ["Next.js", "Python", "TensorFlow", "D3.js"],
      category: "Product",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "E-Learning Platform",
      description:
        "A comprehensive online learning management system with video streaming, progress tracking, and interactive assessments for educational institutions.",
      image: "/placeholder.jpg",
      technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC"],
      category: "Web",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Brand Identity System",
      description:
        "A complete brand identity and design system for a tech startup, including logo design, color palette, typography, and comprehensive brand guidelines.",
      image: "/placeholder.jpg",
      technologies: ["Figma", "Adobe Creative Suite", "Sketch", "Principle"],
      category: "Brand",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "IoT Smart Home Hub",
      description:
        "An integrated smart home control system with voice commands, automated scheduling, and energy monitoring capabilities for modern households.",
      image: "/placeholder.jpg",
      technologies: ["React", "Node.js", "MongoDB", "MQTT"],
      category: "Product",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    }
  ]



  const categories = ["All", "Web", "Mobile", "Brand", "Product"]
  const displayProjects = projects.length ? projects : defaultProjects
  const filteredProjects = filter === "All" ? displayProjects : displayProjects.filter(project => project.category === filter)

  if (loading) {
    return (
      <SectionWrapper id="projects">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-3xl w-64 mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl"
              ></div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper 
      id="projects" 
      title="Featured Work"
      subtitle="A curated selection of projects showcasing innovation, creativity, and technical excellence"
      centered
    >
      <div className="max-w-7xl mx-auto">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === category
                    ? "bg-[#0E0E52] text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-[#0E0E52] dark:hover:text-[#6C63FF] hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#6C63FF]/10 hover:-translate-y-2 hover:border-[#6C63FF]/30"
            >
              {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-3 py-1 bg-[#0E0E52] text-white text-xs font-bold rounded-full">
                    Featured
                  </div>
                </div>
              )}
              
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E52]/10 to-[#6C63FF]/10 z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#0E0E52] dark:text-white mb-3 group-hover:text-[#6C63FF] dark:group-hover:text-[#6C63FF] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-lg">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    size="sm" 
                    className="bg-[#0E0E52] hover:bg-[#0E0E52]/90 text-white rounded-2xl shadow-lg transition-all duration-300 flex-1"
                    asChild
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-2xl border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition-all duration-300"
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
    </SectionWrapper>
  )
}
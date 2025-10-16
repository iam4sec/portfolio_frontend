"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { FilterTabs } from "@/components/ui/filter-tabs"
import { MasonryGrid } from "@/components/ui/masonry-grid"

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
      _id: "1",
      title: "Enterprise SaaS Platform",
      description:
        "A comprehensive enterprise software solution with advanced analytics, user management, and real-time collaboration features. Built with modern architecture and scalable design patterns.",
      image: "/placeholder.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "TypeScript", "Redis"],
      features: [
        "Real-time collaboration",
        "Advanced analytics dashboard",
        "Role-based access control",
        "API integration",
        "Automated reporting"
      ],
      links: {
        live: "#",
        github: "#"
      },
      metrics: {
        users: "10K+",
        uptime: "99.9%",
        duration: "6 months"
      },
      category: "Full-Stack",
      featured: true
    },
    {
      _id: "2",
      title: "Mobile Banking App",
      description:
        "A secure and intuitive mobile banking application with biometric authentication, transaction history, and seamless money transfer capabilities.",
      image: "/placeholder.jpg",
      technologies: ["React Native", "TypeScript", "Firebase", "Stripe"],
      features: [
        "Biometric authentication",
        "Real-time transactions",
        "Push notifications",
        "Offline support",
        "Multi-currency support"
      ],
      links: {
        live: "#",
        github: "#"
      },
      metrics: {
        users: "50K+",
        uptime: "99.8%",
        duration: "4 months"
      },
      category: "Mobile",
      featured: true
    },
    {
      _id: "3",
      title: "AI-Powered Analytics Dashboard",
      description:
        "An intelligent data visualization platform that leverages machine learning to provide predictive insights and automated reporting for business intelligence.",
      image: "/placeholder.jpg",
      technologies: ["Next.js", "Python", "TensorFlow", "D3.js", "PostgreSQL"],
      features: [
        "Machine learning insights",
        "Interactive visualizations",
        "Predictive analytics",
        "Custom reports",
        "Data export tools"
      ],
      links: {
        live: "#",
        github: "#"
      },
      metrics: {
        users: "5K+",
        uptime: "99.5%",
        duration: "8 months"
      },
      category: "AI/ML",
      featured: false
    },
    {
      _id: "4",
      title: "E-Learning Platform",
      description:
        "A comprehensive online learning management system with video streaming, progress tracking, and interactive assessments for educational institutions.",
      image: "/placeholder.jpg",
      technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC", "AWS S3"],
      features: [
        "Video streaming",
        "Progress tracking",
        "Interactive quizzes",
        "Certificate generation",
        "Discussion forums"
      ],
      links: {
        live: "#",
        github: "#"
      },
      metrics: {
        users: "25K+",
        uptime: "99.7%",
        duration: "5 months"
      },
      category: "Full-Stack",
      featured: false
    },
    {
      _id: "5",
      title: "Brand Identity System",
      description:
        "A complete brand identity and design system for a tech startup, including logo design, color palette, typography, and comprehensive brand guidelines.",
      image: "/placeholder.jpg",
      technologies: ["Figma", "Adobe Creative Suite", "Sketch", "Principle"],
      features: [
        "Logo design",
        "Brand guidelines",
        "Color system",
        "Typography scale",
        "Component library"
      ],
      links: {
        live: "#"
      },
      category: "Design",
      featured: false
    },
    {
      _id: "6",
      title: "IoT Smart Home Hub",
      description:
        "An integrated smart home control system with voice commands, automated scheduling, and energy monitoring capabilities for modern households.",
      image: "/placeholder.jpg",
      technologies: ["React", "Node.js", "MongoDB", "MQTT", "Raspberry Pi"],
      features: [
        "Voice control",
        "Automated scheduling",
        "Energy monitoring",
        "Mobile app",
        "Security alerts"
      ],
      links: {
        live: "#",
        github: "#"
      },
      metrics: {
        users: "2K+",
        uptime: "99.9%",
        duration: "3 months"
      },
      category: "IoT",
      featured: true
    }
  ]



  const categories = ["All", "Full-Stack", "Mobile", "AI/ML", "Design", "IoT"]
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
        {/* Enhanced Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <FilterTabs
            categories={categories}
            activeCategory={filter}
            onCategoryChange={setFilter}
            className="mb-8"
          />
        </motion.div>

        {/* Enhanced Projects Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
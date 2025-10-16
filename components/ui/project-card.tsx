"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Eye, Code, Zap, Users } from "lucide-react"
import { Button } from "./button"
import { TiltCard } from "./tilt-card"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    description: string
    image: string
    technologies: string[]
    features: string[]
    links: {
      live?: string
      github?: string
      demo?: string
    }
    metrics?: {
      users?: string
      uptime?: string
      duration?: string
    }
    category: string
    featured: boolean
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <TiltCard className="group h-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 hover:border-[#6C63FF]/30 dark:hover:border-[#6C63FF]/50 transition-all duration-500 overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl hover:shadow-[#6C63FF]/10"
        data-magnetic="true"
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1 bg-gradient-to-r from-[#6C63FF] to-[#0E0E52] text-white text-xs font-bold rounded-full shadow-lg">
              Featured
            </div>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <Image
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 to-[#0E0E52]/20 animate-pulse" />
          )}
          
          {/* Overlay with quick actions */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
            initial={false}
          >
            {project.links.live && (
              <Button
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                asChild
              >
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                asChild
              >
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category */}
          <div className="mb-3">
            <span className="px-3 py-1 bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-semibold rounded-full">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#6C63FF] transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-lg">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
              {project.metrics.users && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-3 h-3 text-[#6C63FF] mr-1" />
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">
                    {project.metrics.users}
                  </div>
                  <div className="text-xs text-gray-500">Users</div>
                </div>
              )}
              {project.metrics.uptime && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="w-3 h-3 text-green-500 mr-1" />
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">
                    {project.metrics.uptime}
                  </div>
                  <div className="text-xs text-gray-500">Uptime</div>
                </div>
              )}
              {project.metrics.duration && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Code className="w-3 h-3 text-blue-500 mr-1" />
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">
                    {project.metrics.duration}
                  </div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
              )}
            </div>
          )}

          {/* Expandable Features */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 overflow-hidden"
              >
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {project.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      className="text-xs text-gray-600 dark:text-gray-400 flex items-center"
                    >
                      <div className="w-1 h-1 bg-[#6C63FF] rounded-full mr-2" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#6C63FF] hover:text-[#0E0E52] hover:bg-[#6C63FF]/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isExpanded ? "Less" : "More"}
            </Button>
            
            <div className="flex gap-2">
              {project.links.live && (
                <Button
                  size="sm"
                  className="bg-[#6C63FF] hover:bg-[#0E0E52] text-white"
                  asChild
                >
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white"
                  asChild
                >
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}
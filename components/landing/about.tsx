"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Code2, Palette, Zap, Users, Award, Target, Sparkles, Heart, Coffee } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"
import { motion } from "framer-motion"

export function About() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.getProfile()
        if (response.success && (response.data as any).about) {
          setAboutData((response.data as any).about)
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  const stats = [
    { value: "3+", label: "Years Experience", icon: Award },
    { value: "25+", label: "Projects Delivered", icon: Target },
    { value: "15+", label: "Technologies", icon: Code2 },
    { value: "100%", label: "Client Satisfaction", icon: Heart },
  ]

  const values = aboutData?.values || [
    "Excellence", "Innovation", "Collaboration", "Continuous Learning", "User-Centric"
  ]

  const expertise = aboutData?.expertise || [
    {
      title: "Frontend Development",
      description: "Creating responsive and user-friendly interfaces using modern frameworks",
      icon: Palette
    },
    {
      title: "Backend Architecture",
      description: "Building scalable and maintainable server-side applications",
      icon: Code2
    },
    {
      title: "Performance Optimization",
      description: "Ensuring fast, efficient, and optimized user experiences",
      icon: Zap
    }
  ]

  if (loading) {
    return (
      <SectionWrapper id="about">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-slate-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper 
      id="about" 
      title="About Me"
      subtitle={aboutData?.subtitle || "Passionate about creating digital experiences that make a difference"}
      centered
    >
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              {aboutData?.journey || 
                "With a strong foundation in software engineering and a passion for innovation, I specialize in creating digital solutions that bridge the gap between complex technical requirements and intuitive user experiences."}
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              I believe in writing clean, maintainable code and staying current with emerging technologies. 
              My approach combines technical expertise with creative problem-solving to deliver solutions that not only work flawlessly but also delight users.
            </p>
          </div>

          {/* Core Values */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              Core Values
            </h3>
            <div className="flex flex-wrap gap-3">
              {values.map((value: string, index: number) => (
                <motion.span
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-700/50"
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats & Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <IconComponent className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Expertise Areas */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Coffee className="w-6 h-6 text-blue-500" />
              Expertise
            </h3>
            <div className="space-y-4">
              {expertise.map((item: any, index: number) => {
                const icons = [Palette, Code2, Zap]
                const IconComponent = item.icon || icons[index] || Code2
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-200/30 dark:border-slate-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
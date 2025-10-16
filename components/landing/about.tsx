"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Code2, Palette, Zap, Award, Target, Sparkles, Heart, Coffee, Users } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"
import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { TiltCard } from "@/components/ui/tilt-card"

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
    { value: 3, suffix: "+", label: "Years Experience", icon: Award },
    { value: 25, suffix: "+", label: "Projects Delivered", icon: Target },
    { value: 15, suffix: "+", label: "Technologies", icon: Code2 },
    { value: 100, suffix: "%", label: "Client Satisfaction", icon: Heart },
  ]

  const values = [
    "Excellence", "Innovation", "Collaboration", "Continuous Learning", "User-Centric"
  ]

  const expertise = [
    {
      title: "Frontend Development",
      description: "Creating responsive and user-friendly interfaces using modern frameworks like React, Next.js, and TypeScript",
      icon: Palette
    },
    {
      title: "Backend Architecture",
      description: "Building scalable and maintainable server-side applications with Node.js, Python, and cloud technologies",
      icon: Code2
    },
    {
      title: "Full-Stack Solutions",
      description: "Delivering end-to-end solutions that seamlessly integrate frontend and backend technologies",
      icon: Zap
    }
  ]

  if (loading) {
    return (
      <SectionWrapper id="about">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-3xl w-64 mx-auto"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-2xl w-5/6"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
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
      subtitle="Transforming Ideas Into Digital Reality"
      centered
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-2xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
              A passionate solution architect with <span className="text-[#0E0E52] dark:text-[#6C63FF] font-bold">3+ years of expertise</span> in enterprise-level development, 
              specializing in creating digital solutions that bridge complex technical requirements with intuitive user experiences.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              With a strong foundation in software engineering and a commitment to excellence, I transform complex problems into elegant, 
              scalable solutions. My approach combines technical expertise with creative problem-solving to deliver applications that not only 
              work flawlessly but also provide exceptional user experiences.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <TiltCard key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/50 dark:border-gray-700/50 hover:border-[#6C63FF]/30 dark:hover:border-[#6C63FF]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6C63FF]/10 text-center h-full"
                  data-magnetic="true"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-[#0E0E52] to-[#6C63FF] rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] bg-clip-text text-transparent mb-2">
                    <AnimatedCounter 
                      to={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                      className="text-4xl font-black bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] bg-clip-text text-transparent"
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              </TiltCard>
            )
          })}
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-20"
        >
          <h3 className="text-3xl font-bold text-[#0E0E52] dark:text-white mb-8 flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#0E0E52] to-[#6C63FF] rounded-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            Core Values
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {values.map((value: string, index: number) => (
              <motion.span
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-[#0E0E52] dark:text-[#6C63FF] rounded-full text-lg font-semibold border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-[#6C63FF]/10 transition-all duration-300 hover:scale-105 hover:border-[#6C63FF]/30"
              >
                {value}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Expertise Areas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          <h3 className="text-3xl font-bold text-[#0E0E52] dark:text-white text-center mb-12 flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#6C63FF] to-[#0E0E52] rounded-2xl">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            Areas of Expertise
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {expertise.map((item: any, index: number) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/50 dark:border-gray-700/50 hover:border-[#6C63FF]/30 dark:hover:border-[#6C63FF]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6C63FF]/10 hover:-translate-y-2 text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-[#0E0E52] to-[#6C63FF] rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-[#0E0E52] dark:text-white mb-4">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
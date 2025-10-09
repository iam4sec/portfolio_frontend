"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { motion } from "framer-motion"
import { User, Heart, Lightbulb, Code2, Palette, Coffee, Target, Zap, Globe, Star, Award, Users } from "lucide-react"

export function About() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.getProfile()
        if (response.success && response.data.about) {
          setAboutData(response.data.about)
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  if (loading) {
    return (
      <section id="about" className="relative overflow-hidden px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-16 w-80 bg-slate-200 dark:bg-slate-700 rounded-2xl mx-auto"></div>
            <div className="h-8 w-96 bg-slate-200 dark:bg-slate-700 rounded-xl mx-auto"></div>
            <div className="grid gap-6 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="relative overflow-hidden px-6 py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 via-purple-400/8 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tl from-emerald-400/8 via-blue-400/6 to-transparent rounded-full blur-3xl animate-morph"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        {/* Modern Header */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 px-6 py-3 text-sm font-medium border border-blue-200/50 dark:border-blue-700/50">
            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300">About Me</span>
          </div>
          <h2 className="mb-6 text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
              {aboutData?.title || "Crafting Digital"}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {aboutData?.subtitle || "Passionate about creating exceptional digital experiences that blend innovation with purpose"}
          </p>
        </motion.div>

        {/* Simplified Layout */}
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Story Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">My Journey</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    {aboutData?.journey || "I'm a passionate developer who believes in the power of technology to transform ideas into reality. With a focus on creating intuitive, accessible, and beautiful digital experiences, I combine technical expertise with creative problem-solving to build solutions that make a difference."}
                  </p>
                  
                  {aboutData?.values && (
                    <div className="flex flex-wrap gap-3 pt-4">
                      {aboutData.values.slice(0, 4).map((value: string, index: number) => (
                        <Badge 
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 font-medium px-4 py-2 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-colors"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>


        </motion.div>

        {/* Expertise Section */}
        {aboutData?.expertise && (
          <motion.div 
            className="mt-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold text-slate-900 dark:text-white">Expertise Areas</h4>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {aboutData.expertise.slice(0, 4).map((area: any, index: number) => (
                    <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-600/50 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-300">
                      <h5 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">{area.title}</h5>
                      <p className="text-slate-600 dark:text-slate-400">{area.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { motion } from "framer-motion"
import { Code, Palette, Database, Globe, Zap, Star } from "lucide-react"

export function Skills() {
  const [skills, setSkills] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.getSkills()
        if (response.success) {
          setSkills(response.data)
          if (response.data?.categories?.length > 0) {
            setActiveCategory(response.data.categories[0].title)
          }
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const getSkillLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert': return 95
      case 'advanced': return 85
      case 'intermediate': return 70
      case 'beginner': return 40
      default: return 60
    }
  }

  const getCategoryIcon = (title: string) => {
    const lower = title.toLowerCase()
    if (lower.includes('frontend') || lower.includes('ui')) return Code
    if (lower.includes('design')) return Palette
    if (lower.includes('backend') || lower.includes('database')) return Database
    if (lower.includes('web')) return Globe
    return Zap
  }

  if (loading) {
    return (
      <section id="skills" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-16 w-80 bg-slate-200 dark:bg-slate-700 rounded-2xl mx-auto"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!skills?.categories?.length) return null

  const activeSkills = skills.categories.find((cat: any) => cat.title === activeCategory)

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/10 via-blue-400/8 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-400/8 via-pink-400/6 to-transparent rounded-full blur-3xl animate-morph"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 px-6 py-3 text-sm font-medium border border-emerald-200/50 dark:border-emerald-700/50">
            <Star className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-300">Skills & Expertise</span>
          </div>
          <h2 className="mb-6 text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 dark:from-white dark:via-emerald-100 dark:to-white bg-clip-text text-transparent">
              What I
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bring to Life
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Technologies and tools I master to transform ideas into exceptional digital experiences
          </p>
        </motion.div>

        <motion.div 
          className="mb-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.categories.map((category: any, index: number) => {
            const IconComponent = getCategoryIcon(category.title)
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(category.title)}
                className={`relative flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category.title
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg"
                    : "bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="h-4 w-4" />
                {category.title}
              </motion.button>
            )
          })}
        </motion.div>

        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeSkills?.skills.map((skill: any, skillIndex: number) => (
            <motion.div 
              key={skillIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
            >
              <Card className="group h-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
                    <Badge className={`${
                      skill.level.toLowerCase() === 'expert' 
                        ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {skill.level}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{skill.years}</span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{getSkillLevel(skill.level)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${getSkillLevel(skill.level)}%` }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                  
                  {skill.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
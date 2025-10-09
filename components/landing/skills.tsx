"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { api } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

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

  const getColorByLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert': return 'bg-accent'
      case 'advanced': return 'bg-accent/80'
      case 'intermediate': return 'bg-accent/60'
      case 'beginner': return 'bg-accent/40'
      default: return 'bg-accent/60'
    }
  }

  if (loading) {
    return (
      <section id="skills" className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Skeleton className="mx-auto h-10 w-64" />
            <Skeleton className="mx-auto mt-4 h-6 w-80" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <Skeleton className="mb-6 h-6 w-40" />
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!skills?.categories?.length) {
    return null
  }

  const activeSkills = skills.categories.find((cat: any) => cat.title === activeCategory)

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32">
      {/* Enhanced background with mesh gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-background via-muted/10 to-background"></div>
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-32 right-[5%] h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-[10%] h-80 w-80 rounded-full bg-gradient-to-tl from-accent/15 to-secondary/20 blur-3xl animate-morph"></div>
        <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-primary/10 to-accent/15 blur-2xl animate-pulse-ring"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-block rounded-full glass px-6 py-2 text-sm font-medium text-accent border border-accent/20">
            🚀 What I Do
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent md:text-5xl lg:text-6xl">
            Skills & Expertise
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Enhanced category tabs */}
        <motion.div 
          className="mb-16 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.categories.map((category: any, index: number) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(category.title)}
              className={`relative rounded-full px-8 py-3 text-sm font-semibold transition-all duration-500 hover:scale-105 ${
                activeCategory === category.title
                  ? "glass text-accent shadow-lg border border-accent/30 hover-glow"
                  : "glass text-muted-foreground hover:text-accent border border-border/50"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.title}
              {activeCategory === category.title && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-primary/20"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid with animation */}
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
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: skillIndex * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="group relative overflow-hidden glass border-accent/20 transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover-glow">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">{skill.name}</h3>
                    <Badge 
                      variant={skill.level.toLowerCase() === 'expert' ? 'default' : 'outline'} 
                      className={`font-semibold transition-all duration-300 ${
                        skill.level.toLowerCase() === 'expert' 
                          ? 'bg-gradient-to-r from-accent to-primary text-white' 
                          : 'border-accent/30 text-accent'
                      }`}
                    >
                      {skill.level}
                    </Badge>
                  </div>
                  
                  <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{skill.years}</span>
                      <span className="text-sm font-bold text-accent">{getSkillLevel(skill.level)}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-muted/50 backdrop-blur-sm">
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-accent to-primary shadow-lg"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${getSkillLevel(skill.level)}%` }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                  
                  {skill.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
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
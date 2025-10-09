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
    <section id="skills" className="relative bg-gradient-to-b from-background via-muted/20 to-muted/30 px-6 py-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 right-[5%] h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-[10%] h-40 w-40 rounded-full bg-accent/10 blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Skills & Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div 
          className="mb-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.categories.map((category: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.title)}
              className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent/10 ${
                activeCategory === category.title
                  ? "bg-accent/20 text-accent shadow-sm"
                  : "bg-muted/40 text-muted-foreground"
              }`}
            >
              {category.title}
              {activeCategory === category.title && (
                <motion.span 
                  layoutId="activeTab" 
                  className="absolute inset-0 rounded-full border border-accent/30"
                  transition={{ type: "spring", duration: 0.5 }}
                ></motion.span>
              )}
            </button>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-foreground">{skill.name}</h3>
                    <Badge variant={skill.level.toLowerCase() === 'expert' ? 'default' : 'outline'} className="font-medium">
                      {skill.level}
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{skill.years}</span>
                      <span className="text-xs font-medium text-accent">{getSkillLevel(skill.level)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div 
                        className={`h-full rounded-full ${getColorByLevel(skill.level)}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${getSkillLevel(skill.level)}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                  
                  {skill.description && (
                    <p className="mt-4 text-sm text-muted-foreground">{skill.description}</p>
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
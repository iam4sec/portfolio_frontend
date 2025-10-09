"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { motion } from "framer-motion"
import { User, Heart, Lightbulb, Code2, Palette, Coffee, Target, Zap, Globe } from "lucide-react"

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
    hidden: { opacity: 0, y: 20 },
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
      <section id="about" className="relative overflow-hidden px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-12 w-64 bg-muted/20 rounded-full mx-auto"></div>
            <div className="h-8 w-96 bg-muted/20 rounded mx-auto"></div>
            <div className="grid gap-6 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-muted/20 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="relative overflow-hidden px-6 py-32">
      {/* Enhanced background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-muted/5 via-background to-accent/5"></div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent/8 to-primary/5 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-primary/6 to-accent/8 blur-3xl animate-morph"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-accent border border-accent/20">
            <User className="h-4 w-4" />
            <span>About Me</span>
          </div>
          <h2 className="mb-6 text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent md:text-6xl lg:text-7xl">
            {aboutData?.title || "Crafting Digital"}
            <br />
            <span className="text-muted-foreground/60">Experiences</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground/80 leading-relaxed">
            {aboutData?.subtitle || "Passionate about creating exceptional digital experiences that blend innovation with purpose"}
          </p>
        </motion.div>

        {/* Modern Bento Grid Layout */}
        <motion.div 
          className="grid gap-6 lg:grid-cols-6 lg:grid-rows-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Story Card */}
          <motion.div variants={itemVariants} className="lg:col-span-4 lg:row-span-2">
            <Card className="h-full glass border-accent/20 hover:border-accent/30 transition-all duration-500 group">
              <CardContent className="p-8 h-full flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gradient-to-br from-accent/20 to-primary/20 p-3">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">My Journey</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground/90">
                    {aboutData?.journey || "I'm a passionate developer who believes in the power of technology to transform ideas into reality. With a focus on creating intuitive, accessible, and beautiful digital experiences, I combine technical expertise with creative problem-solving to build solutions that make a difference."}
                  </p>
                  
                  {aboutData?.values && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {aboutData.values.slice(0, 4).map((value: string, index: number) => (
                        <Badge 
                          key={index}
                          className="glass border-accent/30 bg-accent/10 text-accent font-medium px-3 py-1 hover:bg-accent/20 transition-colors"
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

          {/* Passion Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-1">
            <Card className="h-full glass border-accent/20 hover:border-accent/30 transition-all duration-300 group hover-lift">
              <CardContent className="p-6 h-full flex flex-col justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto rounded-full bg-gradient-to-br from-accent/20 to-primary/20 p-4 w-fit">
                    <Code2 className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Code Craft</h4>
                    <p className="text-sm text-muted-foreground">Writing clean, efficient code that scales</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Design Focus */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-1">
            <Card className="h-full glass border-accent/20 hover:border-accent/30 transition-all duration-300 group hover-lift">
              <CardContent className="p-6 h-full flex flex-col justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-4 w-fit">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Design Focus</h4>
                    <p className="text-sm text-muted-foreground">User-centered design thinking</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Innovation */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-1">
            <Card className="h-full glass border-accent/20 hover:border-accent/30 transition-all duration-300 group hover-lift">
              <CardContent className="p-6 h-full flex flex-col justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto rounded-full bg-gradient-to-br from-accent/20 to-primary/20 p-4 w-fit">
                    <Lightbulb className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Innovation</h4>
                    <p className="text-sm text-muted-foreground">Always exploring new possibilities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coffee & Code */}
          <motion.div variants={itemVariants} className="lg:col-span-1 lg:row-span-1">
            <Card className="h-full glass border-accent/20 hover:border-accent/30 transition-all duration-300 group hover-lift">
              <CardContent className="p-4 h-full flex flex-col justify-center">
                <div className="text-center space-y-3">
                  <div className="mx-auto rounded-full bg-gradient-to-br from-accent/20 to-primary/20 p-3 w-fit">
                    <Coffee className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Fuel</h4>
                    <p className="text-xs text-muted-foreground">Coffee & Code</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Global Impact */}
          <motion.div variants={itemVariants} className="lg:col-span-1 lg:row-span-1">
            <Card className="h-full glass border-accent/20 hover:border-accent/30 transition-all duration-300 group hover-lift">
              <CardContent className="p-4 h-full flex flex-col justify-center">
                <div className="text-center space-y-3">
                  <div className="mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-3 w-fit">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Impact</h4>
                    <p className="text-xs text-muted-foreground">Global Reach</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expertise Areas */}
          {aboutData?.expertise && (
            <motion.div variants={itemVariants} className="lg:col-span-4 lg:row-span-1">
              <Card className="h-full glass border-accent/20 hover:border-accent/30 transition-all duration-500">
                <CardContent className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-gradient-to-br from-accent/20 to-primary/20 p-2">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">Expertise Areas</h4>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {aboutData.expertise.slice(0, 4).map((area: any, index: number) => (
                      <div key={index} className="p-3 rounded-lg glass border border-accent/10 hover:border-accent/20 transition-all duration-300">
                        <h5 className="font-medium text-foreground text-sm mb-1">{area.title}</h5>
                        <p className="text-xs text-muted-foreground">{area.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
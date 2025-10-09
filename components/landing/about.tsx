"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { motion } from "framer-motion"
import { User, MapPin, Heart, Lightbulb } from "lucide-react"

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

  if (loading || !aboutData) return null

  return (
    <section id="about" className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-muted/10 via-background to-muted/5"></div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-[10%] h-96 w-96 rounded-full bg-gradient-to-br from-accent/15 to-primary/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-[15%] h-80 w-80 rounded-full bg-gradient-to-tl from-primary/8 to-accent/12 blur-3xl animate-morph"></div>
      </div>
      
      <div className="mx-auto max-w-6xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-block rounded-full glass px-6 py-2 text-sm font-medium text-accent border border-accent/20">
            👋 About Me
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent md:text-5xl lg:text-6xl">
            {aboutData.title || "Get to Know Me"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
            {aboutData.subtitle || "Passionate about creating exceptional digital experiences"}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-accent/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-foreground">My Journey</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {aboutData.journey || "Passionate developer crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering."}
                    </p>
                  </div>
                  
                  {aboutData.expertise && (
                    <div>
                      <h4 className="mb-6 text-xl font-semibold text-foreground">Areas of Expertise</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        {aboutData.expertise.map((area: any, index: number) => (
                          <motion.div
                            key={index}
                            className="p-4 rounded-xl glass border border-accent/20 hover:border-accent/40 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h5 className="font-semibold text-foreground mb-2">{area.title}</h5>
                            <p className="text-sm text-muted-foreground">{area.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {aboutData.values && (
                    <div>
                      <h4 className="mb-4 text-xl font-semibold text-foreground">Core Values</h4>
                      <div className="flex flex-wrap gap-3">
                        {aboutData.values.map((value: string, index: number) => (
                          <Badge 
                            key={index}
                            className="glass border-accent/30 bg-accent/10 text-accent font-medium px-4 py-2"
                          >
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-accent/20 hover:border-accent/40 transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent/20 p-3">
                    <Heart className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Passion</h4>
                    <p className="text-muted-foreground">Creating Digital Solutions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent/20 p-3">
                    <Lightbulb className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Approach</h4>
                    <p className="text-muted-foreground">Innovation & Excellence</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent/20 p-3">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Focus</h4>
                    <p className="text-muted-foreground">User-Centric Design</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
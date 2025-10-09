"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await api.getExperiences()
        if (response.success) {
          setExperiences(response.data.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <section id="experience" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-16 w-80 bg-slate-200 dark:bg-slate-700 rounded-2xl mx-auto"></div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/10 via-red-400/8 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-red-400/8 via-pink-400/6 to-transparent rounded-full blur-3xl animate-morph"></div>
      </div>

      <div className="mx-auto max-w-4xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 px-6 py-3 text-sm font-medium border border-orange-200/50 dark:border-orange-700/50">
            <Briefcase className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-orange-700 dark:text-orange-300">Experience</span>
          </div>
          <h2 className="mb-6 text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900 dark:from-white dark:via-orange-100 dark:to-white bg-clip-text text-transparent">
              Professional
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            My professional journey and career milestones
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4 }}
            >
              <Card className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{exp.position}</h3>
                          <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-2">{exp.company}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.duration || "Duration not specified"}</span>
                            </div>
                          </div>
                        </div>
                        {exp.current && (
                          <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                            Current
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies?.slice(0, 8).map((tech: string, i: number) => (
                          <Badge 
                            key={i} 
                            variant="outline"
                            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {exp.technologies?.length > 8 && (
                          <Badge variant="outline" className="text-slate-500 dark:text-slate-400">
                            +{exp.technologies.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
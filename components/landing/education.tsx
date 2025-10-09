"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"
import { api } from "@/lib/api"
import { motion } from "framer-motion"

export function Education() {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.getEducation()
        if (response.success) {
          setEducation(response.data.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch education:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEducation()
  }, [])

  if (loading) {
    return (
      <section id="education" className="px-6 py-24">
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

  if (education.length === 0) return null

  return (
    <section id="education" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/10 via-purple-400/8 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tl from-purple-400/8 via-pink-400/6 to-transparent rounded-full blur-3xl animate-morph"></div>
      </div>

      <div className="mx-auto max-w-4xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 px-6 py-3 text-sm font-medium border border-indigo-200/50 dark:border-indigo-700/50">
            <GraduationCap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-700 dark:text-indigo-300">Education</span>
          </div>
          <h2 className="mb-6 text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-100 dark:to-white bg-clip-text text-transparent">
              Academic
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Academic background and learning milestones
          </p>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4 }}
            >
              <Card className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{edu.degree}</h3>
                          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{edu.institution}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{edu.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                              </span>
                            </div>
                          </div>
                        </div>
                        {edu.type && (
                          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            {edu.type}
                          </Badge>
                        )}
                      </div>
                      
                      {edu.description && (
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{edu.description}</p>
                      )}
                      
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Achievements</span>
                          </div>
                          <ul className="space-y-2">
                            {edu.achievements.map((achievement: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
"use client"

import { useEffect, useState } from "react"
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react"
import { api } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import { motion, Variants } from "framer-motion"

const EducationComponent = () => {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.getEducation()
        if (response.success) {
          setEducation((response.data as any) || [])
        }
      } catch (error) {
        console.error("Failed to fetch education:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEducation()
  }, [])

  const defaultEducation = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2019",
      description:
        "Graduated with honors, focusing on software engineering, algorithms, and data structures.",
    },
    {
      degree: "Certified Web Developer",
      institution: "Code Academy Pro",
      year: "2020",
      description:
        "Completed an intensive bootcamp covering modern web technologies like React, Node.js, and more.",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2].map(i => (
              <div
                key={i}
                className="h-64 bg-slate-200 dark:bg-gray-700 rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const displayEducation = education.length ? education : defaultEducation

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-100/80 to-emerald-100/80 dark:from-teal-900/30 dark:to-emerald-900/30 text-teal-700 dark:text-teal-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50 shadow-lg mb-8">
          <span className="text-lg">🎓</span>
          <span>Academic Foundation</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500 dark:from-teal-400 dark:via-emerald-400 dark:to-amber-300 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          The academic foundation that shaped my technical expertise and problem-solving approach.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {displayEducation.map((edu, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300/50 dark:hover:border-emerald-600/50"
          >
            <div className="flex items-start space-x-6">
              <div className="w-18 h-18 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-bold mb-3">
                  <Calendar className="w-3 h-3" />
                  {edu.year}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {edu.degree}
                </h3>
                <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-4">
                  {edu.institution}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const Education = SectionWrapper(EducationComponent, "education")
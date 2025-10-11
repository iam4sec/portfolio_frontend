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
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Education
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          My academic background and foundational learning.
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
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  {edu.year}
                </p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {edu.degree}
                </h3>
                <p className="text-md font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {edu.institution}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
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
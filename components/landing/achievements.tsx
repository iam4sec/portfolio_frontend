"use client"

import { useEffect, useState } from "react"
import { Trophy } from "lucide-react"
import { api } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import { motion, Variants } from "framer-motion"

const AchievementsComponent = () => {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await api.getAchievements()
        if (response.success) {
          setAchievements((response.data as any) || [])
        }
      } catch (error) {
        console.error("Failed to fetch achievements:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  const defaultAchievements = [
    {
      title: "Employee of the Year",
      organization: "Tech Innovations Inc.",
      year: "2023",
      description:
        "Recognized for outstanding performance and leadership in delivering critical projects.",
    },
    {
      title: "Open Source Contributor",
      organization: "React Community",
      year: "2022-Present",
      description:
        "Active contributor to the React ecosystem with over 500 stars on GitHub.",
    },
    {
      title: "Hackathon Winner",
      organization: "TechCrunch Disrupt",
      year: "2022",
      description:
        "First place for an innovative AI-powered productivity application.",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
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

  const displayAchievements = achievements.length
    ? achievements
    : defaultAchievements

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
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
          Achievements & Recognition
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          Milestones that mark my journey of growth and excellence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayAchievements.map((ach, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1">
              {ach.year}
            </p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {ach.title}
            </h3>
            <p className="text-md font-medium text-slate-700 dark:text-slate-300 mb-3">
              {ach.organization}
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              {ach.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const Achievements = SectionWrapper(AchievementsComponent, "achievements")
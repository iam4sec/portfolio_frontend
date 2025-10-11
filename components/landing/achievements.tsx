"use client"

import { useEffect, useState } from "react"
import { Trophy, Calendar } from "lucide-react"
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
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100/80 to-orange-100/80 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50 shadow-lg mb-8">
          <span className="text-lg">🏆</span>
          <span>Recognition & Awards</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-500 dark:from-amber-400 dark:via-orange-400 dark:to-emerald-300 bg-clip-text text-transparent">
            Achievements
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Milestones and recognition that reflect my commitment to excellence and innovation.
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
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-amber-300/50 dark:hover:border-amber-600/50"
          >
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-xl text-sm font-bold mb-4">
              <Calendar className="w-3 h-3" />
              {ach.year}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {ach.title}
            </h3>
            <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4">
              {ach.organization}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {ach.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const Achievements = SectionWrapper(AchievementsComponent, "achievements")
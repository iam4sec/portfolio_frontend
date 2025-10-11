"use client"

import { useEffect, useState } from "react"
import { Heart, Users, Clock, MapPin, Calendar } from "lucide-react"
import { api } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import { motion, Variants } from "framer-motion"

const VolunteerComponent = () => {
  const [volunteer, setVolunteer] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await api.getVolunteers()
        if (response.success) {
          setVolunteer((response.data as any) || [])
        }
      } catch (error) {
        console.error("Failed to fetch volunteer data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchVolunteer()
  }, [])

  const defaultVolunteer = [
    {
      organization: "Code for Good",
      role: "Technical Mentor",
      duration: "2022 - Present",
      description:
        "Mentoring underrepresented youth in programming, focusing on web development and career skills.",
    },
    {
      organization: "Open Source Initiative",
      role: "Core Contributor",
      duration: "2021 - Present",
      description:
        "Contributing to open-source projects that enhance accessibility and developer tooling.",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
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

  const displayVolunteer = volunteer.length ? volunteer : defaultVolunteer

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
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100/80 to-green-100/80 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg mb-8">
          <span className="text-lg">❤️</span>
          <span>Community Impact</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 dark:from-emerald-400 dark:via-green-400 dark:to-teal-300 bg-clip-text text-transparent">
            Volunteer Work
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Contributing to the community through technology, mentorship, and meaningful initiatives.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {displayVolunteer.map((vol, index) => (
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
              <div className="w-18 h-18 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Heart className="w-9 h-9 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-bold mb-3">
                  <Clock className="w-3 h-3" />
                  {vol.duration}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {vol.role}
                </h3>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                  {vol.organization}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {vol.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const Volunteer = SectionWrapper(VolunteerComponent, "volunteer")
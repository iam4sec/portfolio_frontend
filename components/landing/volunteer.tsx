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
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Community & Volunteer Work
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          Giving back through technology and mentorship.
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
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
                  {vol.duration}
                </p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {vol.role}
                </h3>
                <p className="text-md font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {vol.organization}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
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
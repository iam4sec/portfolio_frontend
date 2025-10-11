"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Code2, Palette, Zap, Users, Award, Target } from "lucide-react"
import SectionWrapper from "./section-wrapper"
import { motion } from "framer-motion"

const AboutComponent = () => {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.getProfile()
        if (response.success && (response.data as any).about) {
          setAboutData((response.data as any).about)
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "10+", label: "Technologies Mastered" },
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          About Me
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {aboutData?.subtitle ||
            "I'm a software engineer who loves building products and solving problems. Here's a little more about my journey."}
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3 space-y-6 text-lg text-slate-700 dark:text-slate-300"
        >
          <p>
            {aboutData?.journey ||
              "With a solid foundation in computer science and years of hands-on experience, I've had the privilege of working on a diverse range of projects, from dynamic startups to large-scale enterprise applications. My passion lies in the sweet spot where design and engineering meet, creating user experiences that are not only beautiful but also performant and accessible."}
          </p>
          <p>
            I thrive in collaborative environments and am always eager to learn
            new technologies. My goal is to consistently deliver high-quality,
            scalable, and maintainable code that drives business value and
            delights users.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-slate-100/50 dark:bg-gray-800/50 rounded-lg"
            >
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 mr-4">
                {stat.value}
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export const About = SectionWrapper(AboutComponent, "about")
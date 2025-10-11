"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Building, Briefcase } from "lucide-react"
import { api } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"

const ExperienceComponent = () => {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.getExperiences()
        if (response.success) {
          setExperiences((response.data as any) || [])
        }
      } catch (error) {
        console.error("Failed to fetch experience:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperience()
  }, [])

  const defaultExperience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "Lead frontend development for enterprise applications, architecting scalable React solutions and mentoring a team of developers to improve app performance by 40%.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      location: "New York, NY",
      startDate: "Mar 2020",
      endDate: "Dec 2021",
      description:
        "Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL, contributing to the launch of over 15 new features and reducing deployment times.",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div
                key={i}
                className="h-48 bg-slate-200 dark:bg-gray-700 rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const displayExperience = experiences.length ? experiences : defaultExperience

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg mb-8">
          <span className="text-lg">💼</span>
          <span>Professional Journey</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-emerald-400 dark:via-teal-400 dark:to-amber-300 bg-clip-text text-transparent">
            Work Experience
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          My professional journey and the impact I've made along the way.
        </p>
      </div>

      <VerticalTimeline>
        {displayExperience.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              color: "#374151",
              borderRadius: "1.5rem",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            contentArrowStyle={{
              borderRight: "7px solid rgba(16, 185, 129, 0.3)",
            }}
            date={`${exp.startDate} - ${exp.endDate}`}
            iconStyle={{
              background: "linear-gradient(135deg, #10b981, #14b8a6)",
              color: "#fff",
              boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.3), 0 8px 16px rgba(16, 185, 129, 0.2)"
            }}
            icon={<Briefcase />}
          >
            <h3 className="vertical-timeline-element-title text-2xl font-bold text-gray-900 dark:text-white">
              {exp.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-lg font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
              {exp.company}
            </h4>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">
              <MapPin className="w-4 h-4 mr-2 text-teal-500" /> {exp.location}
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              {exp.description}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

export const Experience = SectionWrapper(ExperienceComponent, "experience")
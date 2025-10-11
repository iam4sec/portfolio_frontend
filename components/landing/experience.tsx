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
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Work Experience
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          My professional journey and key contributions.
        </p>
      </div>

      <VerticalTimeline>
        {displayExperience.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#334155",
              borderRadius: "1rem",
            }}
            contentArrowStyle={{
              borderRight: "7px solid rgba(255, 255, 255, 0.1)",
            }}
            date={`${exp.startDate} - ${exp.endDate}`}
            iconStyle={{
              background: "#0ea5e9",
              color: "#fff",
              boxShadow: "0 0 0 4px #60a5fa, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05)"
            }}
            icon={<Briefcase />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold text-slate-900 dark:text-white">
              {exp.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-md font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {exp.company}
            </h4>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-2">
              <MapPin className="w-4 h-4 mr-2" /> {exp.location}
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              {exp.description}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

export const Experience = SectionWrapper(ExperienceComponent, "experience")
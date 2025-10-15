"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Building, Briefcase, Users, TrendingUp } from "lucide-react"
import { api } from "@/lib/api"
import { SectionWrapper } from "./section-wrapper"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import { motion } from "framer-motion"

export function Experience() {
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
      position: "Senior Software Engineer",
      company: "TechNova Solutions",
      location: "San Francisco, CA",
      startDate: "2021-06-01T00:00:00.000Z",
      endDate: null,
      current: true,
      description: "Led development of enterprise applications serving 100K+ users, architecting scalable microservices and mentoring junior developers. Improved system performance by 60% and reduced deployment time by 75%.",
      technologies: ["React", "Node.js", "AWS", "TypeScript"],
      responsibilities: [
        "Architected and developed scalable web applications using React and Node.js",
        "Led a team of 5 developers and established best practices for code quality",
        "Implemented CI/CD pipelines reducing deployment time from 2 hours to 30 minutes",
        "Collaborated with product managers to define technical requirements"
      ],
      achievements: [
        "Increased application performance by 60% through optimization",
        "Mentored 3 junior developers who were promoted within 12 months",
        "Led migration to microservices architecture serving 100K+ users"
      ]
    },
    {
      position: "Full Stack Developer",
      company: "InnovateTech Labs",
      location: "New York, NY",
      startDate: "2019-03-01T00:00:00.000Z",
      endDate: "2021-05-31T00:00:00.000Z",
      current: false,
      description: "Developed and maintained full-stack applications using modern technologies, contributing to 15+ successful product launches and establishing development workflows that improved team productivity by 40%.",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
      responsibilities: [
        "Built responsive web applications using Vue.js and Python",
        "Designed and implemented RESTful APIs and database schemas",
        "Collaborated with UX/UI designers to implement pixel-perfect designs",
        "Participated in code reviews and maintained high code quality standards"
      ],
      achievements: [
        "Delivered 15+ successful product features on time and within budget",
        "Reduced bug reports by 45% through comprehensive testing strategies",
        "Improved team productivity by 40% through workflow optimization"
      ]
    },
    {
      position: "Frontend Developer",
      company: "StartupHub Inc.",
      location: "Austin, TX",
      startDate: "2018-01-01T00:00:00.000Z",
      endDate: "2019-02-28T00:00:00.000Z",
      current: false,
      description: "Focused on creating exceptional user experiences through modern frontend technologies. Built responsive applications and collaborated closely with design teams to bring creative visions to life.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Bootstrap"],
      responsibilities: [
        "Developed responsive web interfaces using modern JavaScript frameworks",
        "Collaborated with designers to implement user-friendly interfaces",
        "Optimized applications for maximum speed and scalability",
        "Ensured cross-browser compatibility and mobile responsiveness"
      ],
      achievements: [
        "Improved page load times by 50% through optimization techniques",
        "Successfully launched 8 client projects with 100% client satisfaction",
        "Established frontend development standards adopted company-wide"
      ]
    }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <SectionWrapper id="experience">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-3xl w-64 mx-auto"></div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl"
              ></div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    )
  }

  const displayExperience = experiences.length ? experiences : defaultExperience

  return (
    <SectionWrapper 
      id="experience" 
      title="Professional Journey"
      subtitle="Building impactful solutions and leading teams to success"
      centered
    >
      <div className="max-w-6xl mx-auto">
        <VerticalTimeline>
          {displayExperience.map((exp, index) => {
            const startDate = exp.startDate ? formatDate(exp.startDate) : exp.startDate
            const endDate = exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : exp.endDate)
            
            return (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(108, 99, 255, 0.2)",
                  color: "#0E0E52",
                  borderRadius: "1.5rem",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(108, 99, 255, 0.3)",
                }}
                date={`${startDate} - ${endDate}`}
                iconStyle={{
                  background: "linear-gradient(135deg, #0E0E52, #6C63FF)",
                  color: "#fff",
                  boxShadow: "0 0 0 4px rgba(108, 99, 255, 0.3), 0 8px 16px rgba(108, 99, 255, 0.2)"
                }}
                icon={<Briefcase />}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-[#0E0E52] dark:text-white mb-2">
                    {exp.position || exp.title}
                  </h3>
                  <h4 className="text-lg font-semibold text-[#6C63FF] mb-3">
                    {exp.company}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-[#6C63FF]" /> {exp.location}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  
                  {exp.technologies && (
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-[#0E0E52] dark:text-white mb-3">Technologies Used</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-medium rounded-lg border border-[#6C63FF]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {exp.achievements && (
                    <div>
                      <h5 className="text-sm font-semibold text-[#0E0E52] dark:text-white mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-[#6C63FF]" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.slice(0, 3).map((achievement: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="w-1.5 h-1.5 bg-[#6C63FF] rounded-full mt-2 mr-3 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </VerticalTimelineElement>
            )
          })}
        </VerticalTimeline>
      </div>
    </SectionWrapper>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Building } from "lucide-react"
import { api } from "@/lib/api"

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.getExperiences()
        if (response.success) {
          setExperiences(response.data)
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
      startDate: "2022",
      endDate: "Present",
      description: "Lead frontend development for enterprise applications serving 100k+ users. Architected scalable React applications and mentored junior developers.",
      achievements: ["Improved app performance by 40%", "Led team of 5 developers", "Implemented design system"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      location: "New York, NY",
      startDate: "2020",
      endDate: "2022",
      description: "Developed full-stack web applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver high-quality products.",
      achievements: ["Built 15+ web applications", "Reduced deployment time by 60%", "Mentored 3 junior developers"]
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      startDate: "2019",
      endDate: "2020",
      description: "Created responsive web interfaces and implemented modern JavaScript frameworks. Worked closely with designers to bring mockups to life.",
      achievements: ["Launched 5 major features", "Improved user engagement by 25%", "Established testing practices"]
    }
  ]

  if (loading) {
    return (
      <section id="experience" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto"></div>
            <div className="space-y-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const displayExperience = experiences.length ? experiences : defaultExperience

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A journey of growth, innovation, and impactful contributions across diverse projects and teams
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          <div className="space-y-12">
            {displayExperience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                
                <div className="ml-20 bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{exp.title}</h3>
                      <div className="flex items-center space-x-4 text-slate-600">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 lg:mt-0">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="text-slate-600 font-medium">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed mb-6">{exp.description}</p>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement: string, achIndex: number) => (
                        <li key={achIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
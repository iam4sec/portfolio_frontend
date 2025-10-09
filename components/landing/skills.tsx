"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"

export function Skills() {
  const [skillsData, setSkillsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.getSkills()
        if (response.success) {
          setSkillsData(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const defaultSkills = [
    { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"], level: 95 },
    { category: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"], level: 88 },
    { category: "Tools", skills: ["Git", "Docker", "AWS", "Figma"], level: 90 },
    { category: "Soft Skills", skills: ["Leadership", "Problem Solving", "Communication"], level: 92 }
  ]

  if (loading) {
    return (
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-48 mx-auto"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const skills = skillsData?.length ? skillsData : defaultSkills

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((category: any, index: number) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{category.category}</h3>
              
              <div className="space-y-4 mb-6">
                {category.skills.map((skill: string, skillIndex: number) => (
                  <div key={skillIndex} className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${
                          i < Math.floor((category.level || 80) / 20) ? 'bg-blue-500' : 'bg-slate-200'
                        }`}></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Proficiency</span>
                  <span>{category.level || 80}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${category.level || 80}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
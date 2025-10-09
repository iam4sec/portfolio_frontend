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

  const defaultSkills = {
    categories: [
      {
        title: "Frontend",
        skills: [
          { name: "React", level: "Expert", years: "5+" },
          { name: "Next.js", level: "Advanced", years: "3+" },
          { name: "TypeScript", level: "Advanced", years: "4+" },
          { name: "Tailwind CSS", level: "Expert", years: "3+" }
        ]
      },
      {
        title: "Backend",
        skills: [
          { name: "Node.js", level: "Advanced", years: "4+" },
          { name: "Python", level: "Intermediate", years: "2+" },
          { name: "PostgreSQL", level: "Advanced", years: "3+" },
          { name: "MongoDB", level: "Advanced", years: "3+" }
        ]
      },
      {
        title: "Tools & DevOps",
        skills: [
          { name: "Git", level: "Expert", years: "5+" },
          { name: "Docker", level: "Intermediate", years: "2+" },
          { name: "AWS", level: "Intermediate", years: "2+" },
          { name: "Figma", level: "Advanced", years: "3+" }
        ]
      }
    ]
  }

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

  const skills = skillsData?.categories ? skillsData : defaultSkills

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((category: any, index: number) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill: any, skillIndex: number) => (
                  <div key={skillIndex} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div>
                      <span className="font-medium text-slate-800">{skill.name}</span>
                      <div className="text-xs text-slate-500">{skill.years} experience</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level === 'Expert' ? 'bg-green-100 text-green-700' :
                      skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
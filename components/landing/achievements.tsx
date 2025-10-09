"use client"

import { useEffect, useState } from "react"
import { Trophy, Star, Users, Target, Zap, Award } from "lucide-react"
import { api } from "@/lib/api"

export function Achievements() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await api.getAchievements()
        if (response.success) {
          setAchievements(response.data)
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
      description: "Recognized for outstanding performance and leadership in delivering critical projects",
      category: "Professional Recognition"
    },
    {
      title: "Open Source Contributor",
      organization: "React Community",
      year: "2022-Present",
      description: "Active contributor to React ecosystem with 500+ GitHub stars across projects",
      category: "Community Impact"
    },
    {
      title: "Hackathon Winner",
      organization: "TechCrunch Disrupt",
      year: "2022",
      description: "First place winner for innovative AI-powered productivity application",
      category: "Innovation"
    },
    {
      title: "Team Leadership Excellence",
      organization: "Digital Solutions Ltd.",
      year: "2021",
      description: "Successfully led cross-functional team of 12 members to deliver $2M project",
      category: "Leadership"
    }
  ]

  const stats = [
    { icon: Target, label: "Projects Completed", value: "50+", color: "from-blue-500 to-cyan-500" },
    { icon: Users, label: "Team Members Mentored", value: "15+", color: "from-purple-500 to-pink-500" },
    { icon: Zap, label: "Performance Improvements", value: "40%", color: "from-emerald-500 to-teal-500" },
    { icon: Star, label: "Client Satisfaction", value: "98%", color: "from-orange-500 to-red-500" }
  ]

  if (loading) {
    return (
      <section id="achievements" className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto"></div>
            <div className="grid md:grid-cols-2 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const displayAchievements = achievements.length ? achievements : defaultAchievements

  return (
    <section id="achievements" className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Achievements & Recognition
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Milestones and recognition that reflect dedication to excellence and continuous growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayAchievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{achievement.title}</h3>
                    <span className="text-sm font-medium text-slate-500">{achievement.year}</span>
                  </div>
                  <p className="text-slate-600 font-medium mb-2">{achievement.organization}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    {achievement.category}
                  </span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">{achievement.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">Ready to Achieve More Together?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Let's collaborate on your next project and create something exceptional that drives real results.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Start a Project
          </button>
        </div>
      </div>
    </section>
  )
}
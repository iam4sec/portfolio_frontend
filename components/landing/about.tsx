"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Code2, Palette, Zap, Users, Award, Target } from "lucide-react"

export function About() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.getProfile()
        if (response.success && response.data.about) {
          setAboutData(response.data.about)
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  const expertise = [
    { icon: Code2, title: "Frontend Architecture", desc: "React, Next.js, TypeScript" },
    { icon: Palette, title: "Design Systems", desc: "Component libraries, UI/UX" },
    { icon: Zap, title: "Performance", desc: "Optimization, Core Web Vitals" },
    { icon: Users, title: "Team Leadership", desc: "Mentoring, Code Reviews" },
    { icon: Award, title: "Best Practices", desc: "Testing, Documentation" },
    { icon: Target, title: "Product Strategy", desc: "User-focused solutions" }
  ]

  if (loading) {
    return (
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            About Me
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {aboutData?.subtitle || "Passionate about creating digital experiences that make a difference"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-lg">
                {aboutData?.journey || "With over a decade of experience in software development, I've had the privilege of working with innovative startups and established enterprises. My journey has been driven by a passion for creating exceptional user experiences through clean, efficient code."}
              </p>
              
              <p className="text-slate-700 leading-relaxed text-lg">
                I believe in the power of technology to solve real-world problems. Whether it's building scalable web applications, optimizing performance, or mentoring the next generation of developers, I'm committed to excellence in everything I do.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Achievements</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <span className="font-medium text-slate-700">Projects Delivered</span>
                <span className="text-2xl font-bold text-blue-600">50+</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
                <span className="font-medium text-slate-700">Years Experience</span>
                <span className="text-2xl font-bold text-emerald-600">5+</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <span className="font-medium text-slate-700">Happy Clients</span>
                <span className="text-2xl font-bold text-purple-600">100+</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Areas of Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
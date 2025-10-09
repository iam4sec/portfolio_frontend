"use client"

import { useEffect, useState } from "react"
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react"
import { api } from "@/lib/api"

export function Education() {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.getEducation()
        if (response.success) {
          setEducation(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch education:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEducation()
  }, [])

  const defaultEducation = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "San Francisco, CA",
      year: "2019",
      gpa: "3.8/4.0",
      honors: ["Magna Cum Laude", "Dean's List"],
      coursework: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"]
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      institution: "Code Academy Pro",
      location: "Online",
      year: "2018",
      gpa: null,
      honors: ["Top 5% Graduate"],
      coursework: ["React", "Node.js", "MongoDB", "Express.js"]
    }
  ]

  const certifications = [
    { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
    { name: "Google Cloud Professional Developer", issuer: "Google Cloud", year: "2022" },
    { name: "React Advanced Certification", issuer: "Meta", year: "2022" }
  ]

  if (loading) {
    return (
      <section id="education" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-48 mx-auto"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              {[1,2].map(i => (
                <div key={i} className="h-64 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const displayEducation = education.length ? education : defaultEducation

  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Education & Certifications
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Continuous learning and professional development through formal education and industry certifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {displayEducation.map((edu, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{edu.degree}</h3>
                  <p className="text-slate-600 font-medium">{edu.institution}</p>
                  <p className="text-slate-500 text-sm">{edu.location}</p>
                </div>
                <div className="flex items-center text-slate-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{edu.year}</span>
                </div>
              </div>

              {edu.gpa && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                    GPA: {edu.gpa}
                  </span>
                </div>
              )}

              {edu.honors && edu.honors.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Honors & Recognition
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.honors.map((honor: string, honorIndex: number) => (
                      <span key={honorIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {honor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.coursework && edu.coursework.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Key Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course: string, courseIndex: number) => (
                      <span key={courseIndex} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-slate-200/50 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{cert.name}</h4>
                <p className="text-slate-600 text-sm mb-2">{cert.issuer}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
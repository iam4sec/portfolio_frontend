"use client"

import { useEffect, useState } from "react"
import { Heart, Users, Clock, MapPin, Calendar } from "lucide-react"
import { api } from "@/lib/api"

export function Volunteer() {
  const [volunteer, setVolunteer] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await api.getVolunteers()
        if (response.success) {
          setVolunteer(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch volunteer data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchVolunteer()
  }, [])

  const defaultVolunteer = [
    {
      organization: "Code for Good",
      role: "Technical Mentor",
      location: "San Francisco, CA",
      startDate: "2022",
      endDate: "Present",
      description: "Mentoring underrepresented youth in programming and web development. Teaching React, JavaScript, and career guidance.",
      impact: "Mentored 25+ students",
      hours: "120+ hours"
    },
    {
      organization: "Open Source Initiative",
      role: "Core Contributor",
      location: "Remote",
      startDate: "2021",
      endDate: "Present",
      description: "Contributing to open-source projects focused on accessibility and developer tools. Maintaining React component libraries.",
      impact: "500+ GitHub stars",
      hours: "200+ hours"
    },
    {
      organization: "Tech Education Foundation",
      role: "Workshop Instructor",
      location: "New York, NY",
      startDate: "2020",
      endDate: "2022",
      description: "Conducted weekend coding workshops for beginners. Focused on HTML, CSS, and JavaScript fundamentals.",
      impact: "Taught 100+ students",
      hours: "80+ hours"
    }
  ]

  if (loading) {
    return (
      <section id="volunteer" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto"></div>
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

  const displayVolunteer = volunteer.length ? volunteer : defaultVolunteer

  return (
    <section id="volunteer" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Volunteer Work
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Giving back to the community through technology education and open-source contributions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {displayVolunteer.slice(0, 2).map((vol, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{vol.role}</h3>
                  <p className="text-slate-600 font-medium mb-1">{vol.organization}</p>
                  <div className="flex items-center text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{vol.location}</span>
                  </div>
                </div>
                <div className="flex items-center text-slate-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{vol.startDate} - {vol.endDate}</span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6">{vol.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-emerald-600 mr-2" />
                    <span className="text-sm font-medium text-slate-700">{vol.impact}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-slate-700">{vol.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayVolunteer.length > 2 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {displayVolunteer.slice(2).map((vol, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{vol.role}</h3>
                    <p className="text-slate-600 text-sm">{vol.organization}</p>
                  </div>
                </div>
                
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">{vol.description}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{vol.impact}</span>
                  <span>{vol.hours}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 text-center border border-emerald-200/50">
          <Heart className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Making a Difference Through Code</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Passionate about using technology to create positive impact. Always looking for opportunities to mentor, contribute, and give back to the community.
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-600">400+</div>
              <div className="text-slate-600 text-sm">Volunteer Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">150+</div>
              <div className="text-slate-600 text-sm">Students Mentored</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">10+</div>
              <div className="text-slate-600 text-sm">Organizations Supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"

export function Hero() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile()
        if (response.success) {
          setProfile(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50">
                <Star className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="text-sm font-medium text-emerald-700">Available for new projects</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                <span className="block">{profile?.name || "John"}</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {profile?.name?.split(' ')[1] || "Doe"}
                </span>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl text-slate-600 font-light">
                {profile?.title || "Senior Frontend Developer"}
              </h2>
              
              {profile?.location && (
                <div className="flex items-center text-slate-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{profile.location}</span>
                </div>
              )}
            </div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              {profile?.bio || "Crafting exceptional digital experiences through innovative design and robust engineering. Transforming complex problems into elegant solutions."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="#projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50" asChild>
                <Link href="#contact">Let's Connect</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              {profile?.social?.github && (
                <Link 
                  href={profile.social.github} 
                  target="_blank" 
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link 
                  href={profile.social.linkedin} 
                  target="_blank" 
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {profile?.email && (
                <Link 
                  href={`mailto:${profile.email}`} 
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
              {profile?.resume && (
                <Link 
                  href={profile.resume} 
                  target="_blank"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-110"
                >
                  <Download className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-slate-200/50">
                <Image
                  src={profile?.image || "/placeholder-user.jpg"}
                  alt={profile?.name || "Profile"}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
                
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-slate-900">50+</div>
                    <div className="text-sm text-slate-600">Projects</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-slate-900">5+</div>
                    <div className="text-sm text-slate-600">Years</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-slate-900">100+</div>
                    <div className="text-sm text-slate-600">Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles, MapPin } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import { motion } from "framer-motion"

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
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          {/* Profile Image */}
          <motion.div 
            className="relative mx-auto w-32 h-32 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
              <Image
                src={profile?.image || "/placeholder-user.jpg"}
                alt={profile?.name || "Profile"}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-slate-900 dark:text-white">
                  {profile?.name || "John Doe"}
                </span>
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 font-medium">
                {profile?.title || "Senior Frontend Developer"}
              </h2>
              
              {profile?.location && (
                <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              )}
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {profile?.bio || "Passionate about creating exceptional digital experiences with modern web technologies and user-centered design."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100" asChild>
                <Link href="#projects">
                  <Sparkles className="mr-2 h-4 w-4" />
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-600" asChild>
                <Link href="#contact">Get In Touch</Link>
              </Button>
              
              {profile?.resume && (
                <Button size="lg" variant="ghost" asChild>
                  <Link href={profile.resume} target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </Link>
                </Button>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 pt-6">
              {profile?.social?.github && (
                <Link 
                  href={profile.social.github} 
                  target="_blank" 
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link 
                  href={profile.social.linkedin} 
                  target="_blank" 
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {profile?.email && (
                <Link 
                  href={`mailto:${profile.email}`} 
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
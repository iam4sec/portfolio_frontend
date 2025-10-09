"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles, Code, Palette, Zap } from "lucide-react"
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero-specific background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-emerald-400/15 via-blue-400/10 to-transparent rounded-full blur-3xl animate-morph"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - Enhanced */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Status Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {profile?.role || "Available for work"}
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                  {profile?.name?.split(' ')[0] || "John"}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  {profile?.name?.split(' ').slice(1).join(' ') || "Doe"}
                </span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl lg:text-4xl font-light text-slate-600 dark:text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {profile?.title || "Senior Frontend Developer"}
              </motion.h2>
            </div>

            {/* Bio */}
            <motion.p 
              className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {profile?.bio || "Passionate about creating exceptional digital experiences with modern web technologies and user-centered design."}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="#projects">
                  <Sparkles className="mr-2 h-5 w-5" />
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300" asChild>
                <Link href="#contact">Let's Connect</Link>
              </Button>
              
              {profile?.resume && (
                <Button size="lg" variant="ghost" className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300" asChild>
                  <Link href={profile.resume} target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </Link>
                </Button>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {profile?.social?.github && (
                <Link 
                  href={profile.social.github} 
                  target="_blank" 
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link 
                  href={profile.social.linkedin} 
                  target="_blank" 
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {profile?.email && (
                <Link 
                  href={`mailto:${profile.email}`} 
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Completely Redesigned */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Main Profile Image */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={profile?.image || "/placeholder-user.jpg"}
                      alt={profile?.name || "Profile"}
                      width={320}
                      height={320}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code className="h-6 w-6 text-blue-600" />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Palette className="h-6 w-6 text-purple-600" />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 -right-8 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <Zap className="h-6 w-6 text-emerald-600" />
                </motion.div>
              </div>
              
              {/* Stats Cards */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 text-center min-w-[80px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Years</div>
                </motion.div>
                
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 text-center min-w-[80px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">50+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Projects</div>
                </motion.div>
                
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 text-center min-w-[80px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">100%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Quality</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
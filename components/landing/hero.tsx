"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Download,
  MapPin,
  Sparkles,
  Code2,
  Palette,
} from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import { motion, Variants } from "framer-motion"

export function Hero() {
  const [profile, setProfile] = useState<any>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Interactive Mouse Follower */}
      <div 
        className="fixed pointer-events-none z-10 w-6 h-6 bg-blue-500/20 rounded-full blur-sm transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      {/* Floating Icons */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-10 text-blue-400/30 dark:text-blue-600/30"
      >
        <Code2 className="w-8 h-8" />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/3 right-16 text-purple-400/30 dark:text-purple-600/30"
        style={{ animationDelay: '2s' }}
      >
        <Palette className="w-6 h-6" />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-1/3 left-1/4 text-cyan-400/30 dark:text-cyan-600/30"
        style={{ animationDelay: '4s' }}
      >
        <Sparkles className="w-7 h-7" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image with Enhanced Styling */}
          <motion.div 
            variants={itemVariants} 
            className="mb-8 relative inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse" />
              <Image
                src={profile?.avatar || "/placeholder-user.jpg"}
                alt={profile?.name || "User"}
                width={180}
                height={180}
                className="relative rounded-full border-4 border-white/50 dark:border-gray-800/50 shadow-2xl object-cover backdrop-blur-sm"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
            </div>
          </motion.div>

          {/* Enhanced Typography */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              👋 Welcome to my digital space
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-none tracking-tight mb-6"
          >
            <span className="block mb-2">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-300 bg-clip-text text-transparent">
              {profile?.name || "Ariful Islam"}
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              {profile?.role || "Full Stack Developer"}
            </h2>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {profile?.bio || "Crafting digital experiences that blend creativity with functionality. Passionate about turning ideas into elegant, scalable solutions."}
            </p>
          </motion.div>

          {profile?.location && (
            <motion.div
              variants={itemVariants}
              className="mb-10 flex items-center justify-center text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200/50 dark:border-gray-700/50">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-medium">{profile.location}</span>
              </div>
            </motion.div>
          )}

          {/* Enhanced CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-3"
              asChild
            >
              <Link href="#contact">
                Let's Work Together <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 backdrop-blur-sm px-8 py-3 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a
                href={profile?.resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-8"
          >
            {profile?.social?.github && (
              <Link
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </Link>
            )}
            {profile?.social?.linkedin && (
              <Link
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </Link>
            )}
            {profile?.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="group relative p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2 text-slate-400 dark:text-slate-500">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
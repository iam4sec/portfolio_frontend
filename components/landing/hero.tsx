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
        className="fixed pointer-events-none z-10 w-8 h-8 bg-emerald-500/15 rounded-full blur-sm transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />

      {/* Floating Icons */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-10 text-emerald-400/20 dark:text-emerald-600/20"
      >
        <div className="p-3 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-2xl backdrop-blur-sm">
          <Code2 className="w-6 h-6" />
        </div>
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/3 right-16 text-amber-400/20 dark:text-amber-600/20"
        style={{ animationDelay: '2s' }}
      >
        <div className="p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded-xl backdrop-blur-sm">
          <Palette className="w-5 h-5" />
        </div>
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-1/3 left-1/4 text-teal-400/20 dark:text-teal-600/20"
        style={{ animationDelay: '4s' }}
      >
        <div className="p-3 bg-teal-100/50 dark:bg-teal-900/30 rounded-2xl backdrop-blur-sm">
          <Sparkles className="w-6 h-6" />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image with Modern Styling */}
          <motion.div 
            variants={itemVariants} 
            className="mb-10 relative inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
              <div className="relative p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl">
                <Image
                  src={profile?.avatar || "/placeholder-user.jpg"}
                  alt={profile?.name || "User"}
                  width={200}
                  height={200}
                  className="rounded-2xl object-cover"
                />
              </div>
              <div className="absolute -top-3 -right-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modern Typography */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg">
              <span className="text-lg">👋</span>
              <span>Welcome to my digital universe</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-gray-900 dark:text-white leading-none tracking-tight mb-8"
          >
            <span className="block mb-3 text-gray-700 dark:text-gray-300">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-emerald-400 dark:via-teal-400 dark:to-amber-300 bg-clip-text text-transparent">
              {profile?.name || "Ariful Islam"}
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-6">
              {profile?.role || "Full Stack Developer"}
            </h2>
            <p className="max-w-4xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {profile?.bio || "Crafting digital experiences that blend innovation with functionality. Passionate about transforming complex ideas into elegant, scalable solutions that make a real impact."}
            </p>
          </motion.div>

          {profile?.location && (
            <motion.div
              variants={itemVariants}
              className="mb-12 flex items-center justify-center text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <MapPin className="h-5 w-5 mr-3 text-emerald-500" />
                <span className="font-semibold">{profile.location}</span>
              </div>
            </motion.div>
          )}

          {/* Modern CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-wrap justify-center gap-6"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 px-10 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="#contact">
                Let's Collaborate <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 backdrop-blur-sm px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              asChild
            >
              <a
                href={profile?.resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume <Download className="ml-3 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Modern Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-6"
          >
            {profile?.social?.github && (
              <Link
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/10"
              >
                <Github className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              </Link>
            )}
            {profile?.social?.linkedin && (
              <Link
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/10"
              >
                <Linkedin className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              </Link>
            )}
            {profile?.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="group relative p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/10"
              >
                <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-3 text-gray-400 dark:text-gray-500">
          <span className="text-sm font-semibold">Discover more</span>
          <div className="w-8 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-2xl flex justify-center p-1">
            <div className="w-1.5 h-4 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
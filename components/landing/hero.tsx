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
  Code2,
  Palette,
  Sparkles,
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  }

  const floatingVariants: Variants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Elegant Mouse Follower */}
      <div 
        className="fixed pointer-events-none z-10 w-6 h-6 bg-[#6C63FF]/10 rounded-full blur-sm transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      {/* Professional Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-12 text-[#0E0E52]/15 dark:text-[#6C63FF]/20"
      >
        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-3xl backdrop-blur-sm border border-white/20">
          <Code2 className="w-7 h-7" />
        </div>
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/3 right-16 text-[#6C63FF]/15 dark:text-[#6C63FF]/20"
        style={{ animationDelay: '3s' }}
      >
        <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/20">
          <Palette className="w-6 h-6" />
        </div>
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-1/3 left-1/4 text-[#0E0E52]/15 dark:text-[#0E0E52]/20"
        style={{ animationDelay: '6s' }}
      >
        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-3xl backdrop-blur-sm border border-white/20">
          <Sparkles className="w-7 h-7" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Professional Welcome Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-[#0E0E52] dark:text-[#6C63FF] text-sm font-semibold border border-white/30 shadow-lg">
              <span className="text-xl">👋</span>
              <span>Welcome to my digital portfolio</span>
            </div>
          </motion.div>

          {/* Hero Typography */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#0E0E52] dark:text-white leading-none tracking-tight mb-6"
          >
            <span className="block mb-4 text-gray-600 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-[#0E0E52] via-[#6C63FF] to-[#0E0E52] dark:from-[#6C63FF] dark:via-white dark:to-[#6C63FF] bg-clip-text text-transparent">
              Ariful Islam
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-8">
              Software Engineer
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Designing intuitive digital experiences that transform complex problems into elegant, scalable solutions. 
              Passionate about crafting code that makes a meaningful impact.
            </p>
          </motion.div>

          {/* Professional CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-wrap justify-center gap-6"
          >
            <Button
              size="lg"
              className="bg-[#0E0E52] hover:bg-[#0E0E52]/90 text-white rounded-3xl shadow-2xl hover:shadow-[#0E0E52]/25 transition-all duration-300 transform hover:scale-105 px-12 py-6 text-lg font-semibold"
              asChild
            >
              <Link href="#projects">
                View My Work <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-3xl border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white backdrop-blur-sm px-12 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              asChild
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume <Download className="ml-3 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Professional Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-8"
          >
            <Link
              href="https://github.com/arifulislam"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/30 hover:border-[#0E0E52]/30 dark:hover:border-[#6C63FF]/30 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Github className="h-7 w-7 text-gray-600 dark:text-gray-400 group-hover:text-[#0E0E52] dark:group-hover:text-[#6C63FF] transition-colors" />
            </Link>
            <Link
              href="https://linkedin.com/in/arifulislam"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/30 hover:border-[#0E0E52]/30 dark:hover:border-[#6C63FF]/30 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Linkedin className="h-7 w-7 text-gray-600 dark:text-gray-400 group-hover:text-[#0E0E52] dark:group-hover:text-[#6C63FF] transition-colors" />
            </Link>
            <Link
              href="mailto:contact@arifulislam.dev"
              className="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/30 hover:border-[#0E0E52]/30 dark:hover:border-[#6C63FF]/30 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Mail className="h-7 w-7 text-gray-600 dark:text-gray-400 group-hover:text-[#0E0E52] dark:group-hover:text-[#6C63FF] transition-colors" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-4 text-gray-500 dark:text-gray-400">
          <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#6C63FF] rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
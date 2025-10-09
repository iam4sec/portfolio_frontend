"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles, Code, Palette } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import { motion } from "framer-motion"

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
        console.error("[v0] Failed to fetch profile:", error)
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Interactive cursor follower */}
      <div 
        className="pointer-events-none fixed z-30 h-6 w-6 rounded-full bg-accent/20 blur-sm transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />
      
      {/* Enhanced hero grid layout */}
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-20">
        {/* Content Section - Enhanced Typography */}
        <motion.div 
          className="lg:col-span-7 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-accent border border-accent/20 backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <Sparkles className="h-4 w-4" />
              <span>{profile?.role || "Available for work"}</span>
            </div>
          </motion.div>

          {/* Main Heading with Enhanced Typography */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight lg:text-8xl xl:text-9xl">
              <span className="block bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
                {profile?.name?.split(' ')[0] || "Creative"}
              </span>
              <span className="block text-muted-foreground/80">
                {profile?.name?.split(' ').slice(1).join(' ') || "Developer"}
              </span>
            </h1>
            
            <div className="flex items-center gap-4 text-xl font-medium text-accent">
              <Code className="h-6 w-6" />
              <span>{profile?.title || "Full Stack Developer"}</span>
              <Palette className="h-6 w-6" />
            </div>
          </motion.div>

          {/* Enhanced Description */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-xl leading-relaxed text-muted-foreground/90"
          >
            {profile?.bio ||
              "Crafting exceptional digital experiences through innovative design and robust engineering. Passionate about creating solutions that make a difference."}
          </motion.p>

          {/* CTA Buttons with Enhanced Design */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] bg-[position:0%_50%] px-8 py-4 text-base font-semibold shadow-2xl transition-all duration-500 hover:bg-[position:100%_50%] hover:scale-105 hover:shadow-accent/25" 
              asChild
            >
              <Link href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full glass border-accent/30 px-8 py-4 text-base font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-accent/50 hover:bg-accent/5" 
              asChild
            >
              <Link href="#contact">Let's Connect</Link>
            </Button>
            
            {profile?.resume && (
              <Button 
                size="lg" 
                variant="ghost" 
                className="rounded-full glass px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:bg-accent/5" 
                asChild
              >
                <Link href={profile.resume} target="_blank">
                  <Download className="mr-2 h-5 w-5" />
                  Resume
                </Link>
              </Button>
            )}
          </motion.div>

          {/* Social Links with Enhanced Hover Effects */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            {profile?.social?.github && (
              <Link
                href={profile.social.github}
                target="_blank"
                className="group relative rounded-full glass p-4 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent"
              >
                <Github className="h-6 w-6 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
              </Link>
            )}
            {profile?.social?.linkedin && (
              <Link
                href={profile.social.linkedin}
                target="_blank"
                className="group relative rounded-full glass p-4 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent"
              >
                <Linkedin className="h-6 w-6 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
              </Link>
            )}
            {profile?.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="group relative rounded-full glass p-4 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent"
              >
                <Mail className="h-6 w-6 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
              </Link>
            )}
          </motion.div>
        </motion.div>
        
        {/* Enhanced Visual Section */}
        <motion.div 
          className="lg:col-span-5 flex justify-center"
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="group relative">
            {/* Animated background elements */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-accent/20 via-primary/15 to-accent/20 blur-2xl animate-pulse-ring"></div>
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 blur-xl animate-float"></div>
            
            {/* Main image container with 3D effect */}
            <div className="relative h-96 w-96 overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-primary/15 to-accent/10 p-1 shadow-2xl transition-all duration-700 hover:shadow-accent/30 group-hover:scale-105">
              <div className="h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-background/5 to-transparent backdrop-blur-sm">
                <Image
                  src={profile?.image || "/placeholder-user.jpg"}
                  alt={profile?.name || "Profile"}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary animate-bounce-subtle delay-200 shadow-lg"></div>
            <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent animate-float delay-500 shadow-lg"></div>
            <div className="absolute right-4 top-1/3 h-6 w-6 rounded-full bg-accent/60 animate-pulse-ring delay-1000"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <span className="text-sm font-medium tracking-wide">Discover More</span>
          <div className="relative h-8 w-5 rounded-full border-2 border-current/30">
            <div className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-current animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

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
} from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import { motion, Variants } from "framer-motion"

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/50 dark:bg-blue-900/50 rounded-full filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/50 dark:bg-purple-900/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-200/50 dark:bg-cyan-900/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto relative text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Image
              src={profile?.avatar || "/placeholder-user.jpg"}
              alt={profile?.name || "User"}
              width={160}
              height={160}
              className="rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tighter"
          >
            <span className="block">Hi, I&apos;m </span>
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent mt-2">
              {profile?.name || "Ariful Islam"}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-300"
          >
            {profile?.title ||
              "A passionate Full Stack Developer specializing in creating beautiful, functional, and user-centric web applications."}
          </motion.p>

          {profile?.location && (
            <motion.div
              variants={itemVariants}
              className="mt-4 flex items-center justify-center text-slate-500 dark:text-slate-400"
            >
              <MapPin className="h-5 w-5 mr-2" />
              <span>{profile.location}</span>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="#contact">
                Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-300"
              asChild
            >
              <a
                href={profile?.resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-center space-x-6"
          >
            {profile?.social?.github && (
              <Link
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Github className="h-7 w-7" />
              </Link>
            )}
            {profile?.social?.linkedin && (
              <Link
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin className="h-7 w-7" />
              </Link>
            )}
            {profile?.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Mail className="h-7 w-7" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
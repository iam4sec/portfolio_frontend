"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import { motion } from "framer-motion"

export function Footer() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <footer className="relative border-t border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-2xl font-black transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-300 bg-clip-text text-transparent">
                devarif
              </span>
            </Link>
            <p className="mt-6 max-w-md text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Passionate about creating innovative software solutions that make a real impact in the digital world.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              {profile?.social?.github && (
                <Link
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/10"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/10"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {profile?.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/10"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 font-medium hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200/50 dark:border-gray-800/50 pt-10 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} Ariful Islam. All rights reserved.
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-400 mt-4 sm:mt-0 font-medium">
            Made with{" "}
            <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse" />
            and lots of coffee ☕
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-6 right-8"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </footer>
  )
}
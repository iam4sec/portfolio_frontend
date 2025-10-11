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
    <footer className="relative border-t border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent"
            >
              devarif
            </Link>
            <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400">
              Passionate about creating innovative software solutions that make a
              difference.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              {profile?.social?.github && (
                <Link
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Github className="h-6 w-6" />
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              )}
              {profile?.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Mail className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200/50 dark:border-slate-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Ariful Islam. All rights reserved.
          </p>
          <p className="flex items-center text-sm text-slate-600 dark:text-slate-400 mt-4 sm:mt-0">
            Made with{" "}
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            and lots of coffee
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
          className="rounded-full bg-white dark:bg-gray-800 shadow-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </footer>
  )
}
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowUp, Heart, Dribbble } from "lucide-react"
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
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]

  const socialLinks = [
    {
      href: "https://linkedin.com/in/arifulislam",
      icon: Linkedin,
      label: "LinkedIn"
    },
    {
      href: "https://dribbble.com/arifulislam",
      icon: Dribbble,
      label: "Dribbble"
    },
    {
      href: "https://github.com/arifulislam",
      icon: Github,
      label: "GitHub"
    },
  ]

  return (
    <footer className="relative border-t border-white/20 dark:border-gray-800/50 bg-gradient-to-br from-[#F2F2F2] to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-3xl font-black transition-all duration-300 hover:scale-105 mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0E0E52] to-[#6C63FF] rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white rounded-lg" />
              </div>
              <span className="bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] bg-clip-text text-transparent">
                Ariful Islam
              </span>
            </Link>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Crafting digital experiences that blend innovation with functionality. 
              Let's build something extraordinary together.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-12 md:grid-cols-3 mb-16">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h3 className="text-lg font-bold text-[#0E0E52] dark:text-white mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#6C63FF] dark:hover:text-[#6C63FF] transition-colors duration-300 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-lg font-bold text-[#0E0E52] dark:text-white mb-6">
              Connect
            </h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:text-[#6C63FF] dark:hover:text-[#6C63FF] hover:border-[#6C63FF]/30 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-[#6C63FF]/10"
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                )
              })}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-lg font-bold text-[#0E0E52] dark:text-white mb-6">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <Link
                href="mailto:contact@arifulislam.dev"
                className="block text-gray-600 dark:text-gray-400 hover:text-[#6C63FF] dark:hover:text-[#6C63FF] transition-colors duration-300 font-medium"
              >
                contact@arifulislam.dev
              </Link>
              <p className="text-gray-600 dark:text-gray-400">
                San Francisco, CA
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 dark:border-gray-800/50 pt-8 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
            &copy; {new Date().getFullYear()} Ariful Islam. All rights reserved.
          </p>
          <p className="flex items-center justify-center text-gray-600 dark:text-gray-400 font-medium">
            Designed & Built with{" "}
            <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse" />
            in San Francisco
          </p>
        </motion.div>
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
          className="rounded-2xl bg-[#0E0E52] hover:bg-[#0E0E52]/90 text-white border-0 shadow-xl hover:shadow-2xl hover:shadow-[#6C63FF]/25 transition-all duration-300 transform hover:scale-110 w-12 h-12"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </footer>
  )
}
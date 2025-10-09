"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Mail, ArrowUp, Heart, Zap } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import { motion } from "framer-motion"

export function Footer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await api.subscribe(email)
      if (response.success) {
        setMessage("Thank you for subscribing!")
        setEmail("")
      } else {
        setMessage(response.message || "Failed to subscribe")
      }
    } catch (err: any) {
      setMessage(err.message || "Failed to subscribe")
    } finally {
      setLoading(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950 px-6 py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 via-purple-400/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-gradient-to-tl from-emerald-400/8 via-blue-400/6 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {profile?.name || "Portfolio"}
              </h3>
            </div>
            <p className="mb-6 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {profile?.bio?.slice(0, 180) || "Building exceptional digital experiences with passion, precision, and purpose. Let's create something amazing together."}
            </p>
            
            <div className="flex items-center gap-4">
              {profile?.social?.github && (
                <Link
                  href={profile.social.github}
                  target="_blank"
                  className="group w-12 h-12 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link
                  href={profile.social.linkedin}
                  target="_blank"
                  className="group w-12 h-12 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {profile?.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  className="group w-12 h-12 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Stay Updated</h4>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Get notified about new projects and insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400"
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300" 
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
              {message && (
                <p className={`text-xs ${
                  message.includes('Thank you') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {message}
                </p>
              )}
            </form>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-200/50 dark:border-slate-700/50 pt-8 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>&copy; {new Date().getFullYear()} {profile?.name || "Portfolio"}.</span>
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>and lots of coffee</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="group rounded-xl bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            <span className="ml-2">Back to Top</span>
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}
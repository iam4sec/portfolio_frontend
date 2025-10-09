"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Mail, Sparkles, ArrowUp, Heart } from "lucide-react"
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
        console.error("[v0] Failed to fetch profile:", error)
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
    <footer className="relative overflow-hidden border-t border-accent/20 bg-gradient-to-b from-background to-muted/20 px-6 py-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-20 left-[10%] h-64 w-64 rounded-full bg-gradient-to-br from-accent/10 to-primary/5 blur-3xl animate-float"></div>
        <div className="absolute -top-10 right-[15%] h-48 w-48 rounded-full bg-gradient-to-tl from-primary/8 to-accent/6 blur-2xl animate-pulse-ring"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-accent animate-ping opacity-20"></div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {profile?.name || "Portfolio"}
              </h3>
            </div>
            <p className="mb-6 max-w-md text-base leading-relaxed text-muted-foreground/90">
              {profile?.bio?.slice(0, 180) || "Building exceptional digital experiences with passion, precision, and purpose. Let's create something amazing together."}
            </p>
            
            {/* Enhanced Social Links */}
            <div className="flex items-center gap-4">
              {profile?.social?.github && (
                <Link
                  href={profile.social.github}
                  target="_blank"
                  className="group relative rounded-full glass p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link
                  href={profile.social.linkedin}
                  target="_blank"
                  className="group relative rounded-full glass p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent"
                >
                  <Linkedin className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
                </Link>
              )}
              {profile?.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  className="group relative rounded-full glass p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent"
                >
                  <Mail className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-6 text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "#contact", label: "Contact" },
              ].map((link, index) => (
                <motion.li 
                  key={link.href}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground transition-all duration-300 hover:text-accent hover:font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-6 text-lg font-semibold text-foreground">Stay Updated</h4>
            <p className="mb-4 text-sm text-muted-foreground">
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
                className="glass border-accent/20 bg-background/50 transition-all duration-300 focus:border-accent/50 focus:bg-background/80"
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-accent to-primary transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
              {message && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs ${
                    message.includes('Thank you') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-accent/20 pt-8 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} {profile?.name || "Portfolio"}.</span>
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>and lots of coffee</span>
          </div>
          
          {/* Back to Top Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="group rounded-full glass border-accent/30 transition-all duration-300 hover:scale-105 hover:border-accent/50"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            <span className="ml-2">Back to Top</span>
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}

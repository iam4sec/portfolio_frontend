"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = [
        "hero",
        "about",
        "skills",
        "experience",
        "projects",
        "achievements",
        "contact",
      ]
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(current || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault()

    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setIsMobileMenuOpen(false)
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = href
      }
    }
  }

  const navLinks = [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Work", id: "projects" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  return (
    <>
      <ScrollProgress />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/20 dark:border-slate-700/20 shadow-lg shadow-slate-900/5"
            : "bg-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Modern Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-3 text-2xl font-black transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0E0E52] to-[#6C63FF] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[#6C63FF]/25 transition-all duration-300">
                <div className="w-4 h-4 bg-white rounded-lg" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] bg-clip-text text-transparent">
              Ariful Islam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-2 border border-white/50 dark:border-gray-700/50 shadow-xl">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={e => handleSmoothScroll(e, link.href)}
                    className={`relative px-5 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      activeSection === link.id
                        ? "bg-[#0E0E52] text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#0E0E52] dark:hover:text-[#6C63FF] hover:bg-white/80 dark:hover:bg-gray-700/80"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-[#0E0E52] rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-300 shadow-lg"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600" />
                  )}
                </motion.div>
              </Button>
            )}

            {/* CTA Button */}
            <Button 
              asChild 
              className="hidden md:flex bg-[#0E0E52] hover:bg-[#0E0E52]/90 text-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-[#6C63FF]/25 transition-all duration-300 transform hover:scale-105 px-6 font-semibold"
            >
              <a href="#contact">Let's Talk</a>
            </Button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={e => handleSmoothScroll(e, link.href)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      activeSection === link.id
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <Button 
                  asChild 
                  className="w-full bg-[#0E0E52] hover:bg-[#0E0E52]/90 text-white rounded-xl shadow-lg font-semibold"
                >
                  <a href="#contact">Let's Talk</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.nav>
    </>
  )
}
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Zap, Circle } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
      
      // Update active section based on scroll position
      const sections = ['about', 'skills', 'projects', 'experience', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(current || '')
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        })
      }
      
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    } else {
      window.location.href = href
    }
  }

  const navLinks = [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Work", id: "projects" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "/blog", label: "Blog", id: "blog" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Modern Logo */}
        <Link 
          href="/" 
          className="group relative flex items-center gap-3 text-xl font-bold"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div className="absolute inset-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 opacity-20 animate-pulse"></div>
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Portfolio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  activeSection === link.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.id && (
                  <motion.div
                    className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                    layoutId="activeSection"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          
          {/* Enhanced Theme Toggle */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="ml-4"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-4 w-4 text-amber-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-4 w-4 text-slate-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 
                <Sun className="h-4 w-4 text-amber-500" /> : 
                <Moon className="h-4 w-4 text-slate-700" />
              }
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="flex items-center gap-3 py-3 px-4 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300"
                  >
                    <Circle className="h-2 w-2 fill-current" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
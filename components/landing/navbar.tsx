"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react"
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? "glass-strong border-b border-accent/20 shadow-2xl backdrop-blur-xl" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Enhanced Logo */}
        <Link 
          href="/" 
          className="group relative flex items-center gap-2 text-xl font-bold"
        >
          <div className="relative">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <div className="absolute inset-0 h-6 w-6 text-accent animate-ping opacity-20"></div>
          </div>
          <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            Portfolio
          </span>
          <span className="absolute -bottom-1 left-8 h-[3px] w-0 rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500 group-hover:w-[calc(100%-2rem)]"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
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
                className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeSection === link.id
                    ? "text-accent"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-1/2 h-[2px] rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-300 ${
                  activeSection === link.id
                    ? "w-8 -translate-x-1/2"
                    : "w-0 -translate-x-1/2 group-hover:w-8"
                }`}></span>
              </Link>
            </motion.div>
          ))}
          
          {/* Enhanced Theme Toggle */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-4 rounded-full glass border border-accent/20 transition-all duration-300 hover:scale-110 hover:border-accent/40 hover:bg-accent/10"
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
                      <Sun className="h-5 w-5 text-accent" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5 text-accent" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full glass border border-accent/20 transition-all duration-300 hover:scale-110"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 
                <Sun className="h-5 w-5 text-accent" /> : 
                <Moon className="h-5 w-5 text-accent" />
              }
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full glass border border-accent/20 transition-all duration-300 hover:scale-110"
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
                  <X className="h-5 w-5 text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 text-accent" />
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
            className="absolute left-0 right-0 glass-strong border-t border-accent/20 md:hidden"
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
                    className="block py-3 px-4 text-base font-medium text-muted-foreground transition-all duration-300 hover:text-accent hover:translate-x-2 hover:bg-accent/5 rounded-lg"
                  >
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

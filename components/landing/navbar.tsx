"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // Only handle internal anchor links
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        })
      }
      
      // Close mobile menu after click
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    } else {
      // For external links, let the default behavior handle it
      window.location.href = href
    }
  }

  const navLinks = [
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link 
          href="/" 
          className="group relative text-xl font-semibold text-foreground"
        >
          <span className="relative z-10">Portfolio</span>
          <span className="absolute bottom-0 left-0 h-[6px] w-0 rounded-full bg-accent/30 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* Theme Toggle */}
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-accent/10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle for Mobile */}
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-accent/10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-accent/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div
        className={`absolute left-0 right-0 border-t border-border bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

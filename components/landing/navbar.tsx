"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = [
        "about",
        "skills",
        "projects",
        "experience",
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
      window.location.href = href
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
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-gray-800/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent"
          >
            devarif
          </Link>

          <div className="hidden md:flex items-center space-x-2 bg-slate-100/80 dark:bg-gray-800/80 rounded-full p-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={e => handleSmoothScroll(e, link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === link.id
                    ? "bg-white dark:bg-gray-900 text-slate-900 dark:text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            <Button asChild className="hidden md:flex rounded-full">
              <a href="#contact">Hire Me</a>
            </Button>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={e => handleSmoothScroll(e, link.href)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === link.id
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-slate-200 dark:border-gray-700 pt-4 mt-4">
            <Button asChild className="w-full">
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
"use client"

import { useEffect, useState } from "react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <button 
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent/80 text-white shadow-lg transition-all duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  )
}
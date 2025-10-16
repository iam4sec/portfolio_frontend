"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0E0E52] via-[#6C63FF] to-[#0E0E52] z-50 origin-left"
      style={{
        scaleX: scrollProgress,
      }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
    />
  )
}
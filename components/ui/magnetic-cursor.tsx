"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseenter", mouseEnter)
    window.addEventListener("mouseleave", mouseLeave)

    // Add magnetic effect to interactive elements
    const magneticElements = document.querySelectorAll('[data-magnetic="true"]')
    
    magneticElements.forEach((element) => {
      element.addEventListener("mouseenter", () => setCursorVariant("magnetic"))
      element.addEventListener("mouseleave", () => setCursorVariant("default"))
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseenter", mouseEnter)
      window.removeEventListener("mouseleave", mouseLeave)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    magnetic: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
    },
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#0E0E52] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-[#6C63FF]/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
        style={{
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </>
  )
}
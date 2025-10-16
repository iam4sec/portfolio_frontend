"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  showPercentage?: boolean
  color?: string
  backgroundColor?: string
  duration?: number
  delay?: number
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  className = "",
  showPercentage = true,
  color = "#6C63FF",
  backgroundColor = "#e5e7eb",
  duration = 2,
  delay = 0,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (!inView) return

    const timer = setTimeout(() => {
      setProgress(value)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [inView, value, delay])

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset } : {}}
          transition={{
            duration,
            delay,
            ease: "easeOut",
          }}
          style={{
            filter: "drop-shadow(0 0 6px rgba(108, 99, 255, 0.3))",
          }}
        />
      </svg>
      
      {/* Percentage text */}
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] bg-clip-text text-transparent">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </div>
  )
}
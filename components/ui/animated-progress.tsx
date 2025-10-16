"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedProgressProps {
  value: number
  className?: string
  showPercentage?: boolean
  color?: string
  duration?: number
  delay?: number
}

export function AnimatedProgress({
  value,
  className = "",
  showPercentage = true,
  color = "from-[#0E0E52] to-[#6C63FF]",
  duration = 1.5,
  delay = 0,
}: AnimatedProgressProps) {
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

  useEffect(() => {
    if (!inView) return

    const timer = setTimeout(() => {
      setProgress(value)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [inView, value, delay])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {showPercentage && (
          <motion.span
            className="text-sm font-semibold text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
          >
            {Math.round(progress)}%
          </motion.span>
        )}
      </div>
      
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full shadow-lg relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${progress}%` } : {}}
          transition={{
            duration,
            delay,
            ease: "easeOut",
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            animate={{
              x: inView ? [-100, 200] : -100,
            }}
            transition={{
              duration: 1.5,
              delay: delay + duration,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
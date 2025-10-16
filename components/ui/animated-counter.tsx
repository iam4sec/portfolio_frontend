"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

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

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = from + (to - from) * easeOutQuart
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [inView, from, to, duration])

  const formatNumber = (num: number) => {
    return num.toFixed(decimals)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  )
}
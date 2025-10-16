"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  perspective?: number
  scale?: number
  transitionSpeed?: number
  gyroscope?: boolean
}

export function TiltCard({
  children,
  className = "",
  tiltMaxAngleX = 15,
  tiltMaxAngleY = 15,
  perspective = 1000,
  scale = 1.05,
  transitionSpeed = 400,
  gyroscope = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState("")

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * tiltMaxAngleX
    const rotateY = ((centerX - x) / centerX) * tiltMaxAngleY

    setTransform(
      `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    )
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransform("")
  }

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform,
        transition: `transform ${transitionSpeed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      }}
      whileHover={{ scale: 1.02 }}
      data-magnetic="true"
    >
      <div className="relative">
        {children}
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0"
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            x: isHovered ? [-100, 300] : -100,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          style={{
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.div>
  )
}
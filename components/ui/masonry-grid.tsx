"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: number
  gap?: number
  className?: string
}

export function MasonryGrid({ 
  children, 
  columns = 3, 
  gap = 24, 
  className = "" 
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [itemPositions, setItemPositions] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerWidth = container.offsetWidth
    const columnWidth = (containerWidth - gap * (columns - 1)) / columns
    
    const heights = new Array(columns).fill(0)
    const positions: Array<{ x: number; y: number }> = []

    children.forEach((_, index) => {
      // Find the shortest column
      const shortestColumnIndex = heights.indexOf(Math.min(...heights))
      
      // Calculate position
      const x = shortestColumnIndex * (columnWidth + gap)
      const y = heights[shortestColumnIndex]
      
      positions.push({ x, y })
      
      // Update column height (estimate based on index for initial layout)
      heights[shortestColumnIndex] += 300 + Math.random() * 100
    })

    setColumnHeights(heights)
    setItemPositions(positions)
  }, [children, columns, gap])

  const containerHeight = Math.max(...columnHeights)

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
    >
      {children.map((child, index) => {
        const position = itemPositions[index]
        if (!position) return null

        return (
          <motion.div
            key={index}
            className="absolute w-full"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            style={{
              left: position.x,
              top: position.y,
              width: `calc((100% - ${gap * (columns - 1)}px) / ${columns})`,
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
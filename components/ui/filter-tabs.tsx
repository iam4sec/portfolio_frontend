"use client"

import { motion } from "framer-motion"
import { Button } from "./button"

interface FilterTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export function FilterTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  className = "" 
}: FilterTabsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={`relative px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/25 scale-105"
                : "border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-[#6C63FF]/50 hover:text-[#6C63FF] hover:bg-[#6C63FF]/5"
            }`}
            data-magnetic="true"
          >
            {category}
            {activeCategory === category && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
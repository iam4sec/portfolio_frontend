"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  title?: string
  subtitle?: string
  centered?: boolean
}

export function SectionWrapper({ 
  children, 
  className, 
  id, 
  title, 
  subtitle, 
  centered = false 
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative py-20 md:py-32 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "mb-16 md:mb-20",
              centered ? "text-center" : ""
            )}
          >
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-emerald-400 dark:via-teal-400 dark:to-amber-300 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
      
      {/* Modern Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-200/8 dark:bg-emerald-800/8 rounded-3xl rotate-12 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-amber-200/8 dark:bg-amber-800/8 rounded-2xl -rotate-12 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-200/5 dark:bg-teal-800/5 rounded-full blur-2xl" />
    </motion.section>
  )
}

// Keep the HOC for backward compatibility
const SectionWrapperHOC = (Component: React.ComponentType<any>, idName: string) =>
  function HOC(props: any) {
    return (
      <SectionWrapper id={idName}>
        <Component {...props} />
      </SectionWrapper>
    )
  }

export default SectionWrapperHOC

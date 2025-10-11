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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-300 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/10 dark:bg-blue-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-200/10 dark:bg-purple-800/10 rounded-full blur-3xl" />
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

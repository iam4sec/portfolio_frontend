"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Sparkles } from "lucide-react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#0E0E52] via-[#6C63FF] to-[#0E0E52] flex items-center justify-center"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                animate={{
                  x: [0, Math.random() * window.innerWidth],
                  y: [0, Math.random() * window.innerHeight],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
              />
            ))}
          </div>

          <div className="text-center space-y-8 relative z-10">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border border-white/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Code2 className="w-12 h-12 text-white" />
                </motion.div>
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-black text-white">
                Ariful Islam
              </h1>
              <p className="text-white/80 text-lg font-medium">
                Crafting Digital Experiences
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-64 mx-auto"
            >
              <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-white to-yellow-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.p
                className="text-white/60 text-sm mt-2 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(progress)}% Loading...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
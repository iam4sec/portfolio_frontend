"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  words: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
}

export function TypewriterEffect({
  words,
  className = "",
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(() => {
      if (isWaiting) {
        setIsWaiting(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        if (currentText === "") {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        } else {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        }
      } else {
        if (currentText === currentWord) {
          setIsWaiting(true)
        } else {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        }
      }
    }, isWaiting ? delayBetweenWords : isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, isWaiting, words, typeSpeed, deleteSpeed, delayBetweenWords])

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E0E52] via-[#6C63FF] to-[#0E0E52] dark:from-[#6C63FF] dark:via-white dark:to-[#6C63FF]">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-1 w-1 h-8 bg-gradient-to-b from-[#0E0E52] to-[#6C63FF] dark:from-[#6C63FF] dark:to-white"
      />
    </div>
  )
}
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Send, CheckCircle, AlertCircle, Loader2, Mail, User, MessageSquare } from "lucide-react"
import { api } from "@/lib/api"

interface FormData {
  fullName: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  subject?: string
  message?: string
}

export function EnhancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        return undefined
      case "email":
        if (!value.trim()) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Please enter a valid email"
        return undefined
      case "subject":
        if (!value.trim()) return "Subject is required"
        if (value.trim().length < 5) return "Subject must be at least 5 characters"
        return undefined
      case "message":
        if (!value.trim()) return "Message is required"
        if (value.trim().length < 10) return "Message must be at least 10 characters"
        return undefined
      default:
        return undefined
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) newErrors[key as keyof FormErrors] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await api.createContact(formData)
      if (response.success) {
        setSubmitStatus("success")
        setFormData({ fullName: "", email: "", subject: "", message: "" })
        setErrors({})
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "fullName":
        return User
      case "email":
        return Mail
      case "subject":
      case "message":
        return MessageSquare
      default:
        return User
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Name Field */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative">
          <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
            focusedField === "fullName" ? "text-[#6C63FF]" : "text-gray-400"
          }`} />
          <Input
            type="text"
            placeholder="Your Full Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            onFocus={() => setFocusedField("fullName")}
            onBlur={() => setFocusedField(null)}
            className={`pl-12 h-14 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ${
              errors.fullName
                ? "border-red-300 focus:border-red-500"
                : focusedField === "fullName"
                ? "border-[#6C63FF] shadow-lg shadow-[#6C63FF]/20"
                : "border-gray-200 dark:border-gray-700 hover:border-[#6C63FF]/50"
            }`}
          />
        </div>
        <AnimatePresence>
          {errors.fullName && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mt-2 text-red-500 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.fullName}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email Field */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
            focusedField === "email" ? "text-[#6C63FF]" : "text-gray-400"
          }`} />
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={`pl-12 h-14 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ${
              errors.email
                ? "border-red-300 focus:border-red-500"
                : focusedField === "email"
                ? "border-[#6C63FF] shadow-lg shadow-[#6C63FF]/20"
                : "border-gray-200 dark:border-gray-700 hover:border-[#6C63FF]/50"
            }`}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mt-2 text-red-500 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subject Field */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative">
          <MessageSquare className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
            focusedField === "subject" ? "text-[#6C63FF]" : "text-gray-400"
          }`} />
          <Input
            type="text"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            className={`pl-12 h-14 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ${
              errors.subject
                ? "border-red-300 focus:border-red-500"
                : focusedField === "subject"
                ? "border-[#6C63FF] shadow-lg shadow-[#6C63FF]/20"
                : "border-gray-200 dark:border-gray-700 hover:border-[#6C63FF]/50"
            }`}
          />
        </div>
        <AnimatePresence>
          {errors.subject && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mt-2 text-red-500 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.subject}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message Field */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Textarea
          placeholder="Tell me about your project, ideas, or just say hello..."
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          rows={6}
          className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 resize-none ${
            errors.message
              ? "border-red-300 focus:border-red-500"
              : focusedField === "message"
              ? "border-[#6C63FF] shadow-lg shadow-[#6C63FF]/20"
              : "border-gray-200 dark:border-gray-700 hover:border-[#6C63FF]/50"
          }`}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mt-2 text-red-500 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-gradient-to-r from-[#0E0E52] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#0E0E52] text-white rounded-2xl shadow-2xl hover:shadow-[#6C63FF]/25 transition-all duration-300 transform hover:scale-105 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          data-magnetic="true"
        >
          {isSubmitting ? (
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending Message...
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.div>
          )}
        </Button>
      </motion.div>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-green-700 dark:text-green-300"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
          </motion.div>
        )}
        
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-300"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Failed to send message. Please try again.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import SectionWrapper from "./section-wrapper"
import { motion } from "framer-motion"

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Here you would typically use a service like EmailJS or a backend endpoint
      // For demo purposes, we'll just simulate success
      console.log("Form submitted:", formData)

      setFormData({ name: "", email: "", message: "" })
      setSubmitStatus("success")
    } catch (error) {
      console.error("Submission failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000) // Reset status after 5s
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "arifulislam@gmail.com",
      href: "mailto:arifulislam@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1793-696995",
      href: "tel:+8801793696995",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: null,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg mb-8">
          <span className="text-lg">💬</span>
          <span>Let's Connect</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-300 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            const content = (
              <div className="flex items-center space-x-6 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/50 dark:hover:border-emerald-600/50">
                <div className="w-18 h-18 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon className="w-9 h-9 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {info.label}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
                    {info.value}
                  </div>
                </div>
              </div>
            )

            return info.href ? (
              <a
                key={index}
                href={info.href}
                className="block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-gray-800 dark:text-gray-200"
              >
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-900/50 rounded-xl border-2 focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-800 dark:text-gray-200"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-900/50 rounded-xl border-2 focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-bold text-gray-800 dark:text-gray-200"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or just say hello..."
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-900/50 rounded-xl border-2 focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 py-4 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send Message
              </Button>
            </div>
            {submitStatus === "success" && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="mr-2 h-5 w-5" />
                <p>Message sent successfully! Thank you for reaching out.</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <AlertCircle className="mr-2 h-5 w-5" />
                <p>
                  Something went wrong. Please try again or contact me directly.
                </p>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export const Contact = SectionWrapper(ContactComponent, "contact")
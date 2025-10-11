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
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Get In Touch
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          Have a project in mind or just want to say hi? Feel free to reach
          out.
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
              <div className="flex items-center space-x-6 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {info.label}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 mt-1">
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
            className="space-y-6 p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-slate-800 dark:text-slate-200"
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
                className="dark:bg-gray-900/50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-800 dark:text-slate-200"
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
                className="dark:bg-gray-900/50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-900/50"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
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
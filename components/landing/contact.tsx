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
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react"
import { SectionWrapper } from "./section-wrapper"
import { motion } from "framer-motion"
import { api } from "@/lib/api"

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
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
      const response = await api.createContact(formData)
      if (response.success) {
        setFormData({ fullName: "", email: "", subject: "", message: "" })
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Submission failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@arifulislam.dev",
      href: "mailto:contact@arifulislam.dev",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/arifulislam",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/arifulislam",
    },
    {
      icon: MessageCircle,
      label: "Twitter",
      href: "https://twitter.com/arifulislam",
    },
  ]

  return (
    <SectionWrapper 
      id="contact" 
      title="Let's Work Together"
      subtitle="Ready to bring your vision to life? Let's discuss your project and create something extraordinary"
      centered
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#0E0E52] dark:text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                const content = (
                  <div className="flex items-center space-x-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-2xl hover:border-[#6C63FF]/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0E0E52] to-[#6C63FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#0E0E52] dark:text-white text-sm">
                        {info.label}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        {info.value}
                      </div>
                    </div>
                  </div>
                )

                return info.href ? (
                  <a
                    key={index}
                    href={info.href}
                    className="block hover:scale-105 transition-transform duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#0E0E52] dark:text-white">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-xl hover:border-[#6C63FF]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    >
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#6C63FF] transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-semibold text-[#0E0E52] dark:text-white"
                  >
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-[#6C63FF] dark:focus:border-[#6C63FF] transition-colors h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#0E0E52] dark:text-white"
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
                    className="bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-[#6C63FF] dark:focus:border-[#6C63FF] transition-colors h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-[#0E0E52] dark:text-white"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-[#6C63FF] dark:focus:border-[#6C63FF] transition-colors h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[#0E0E52] dark:text-white"
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
                  className="bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-[#6C63FF] dark:focus:border-[#6C63FF] transition-colors resize-none"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#0E0E52] hover:bg-[#0E0E52]/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 py-6 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Send className="mr-2 h-5 w-5" />
                )}
                Send Message
              </Button>
              
              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  <p>Thank you! I'll get back to you within 24 hours.</p>
                </motion.div>
              )}
              
              {submitStatus === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl"
                >
                  <AlertCircle className="mr-2 h-5 w-5" />
                  <p>Something went wrong. Please try again or contact me directly.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
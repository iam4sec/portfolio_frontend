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
import { EnhancedContactForm } from "@/components/ui/enhanced-contact-form"
import { TiltCard } from "@/components/ui/tilt-card"

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

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <TiltCard>
              <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl shadow-xl" data-magnetic="true">
                <EnhancedContactForm />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
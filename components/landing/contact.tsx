"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"
import { Mail, Send, MapPin, Clock, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await api.createContact(formData)
      if (response.success) {
        setSuccess(true)
        setFormData({ fullName: "", email: "", subject: "", message: "" })
      } else {
        setError(response.message || "Failed to send message")
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-400/10 via-blue-400/8 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/8 via-cyan-400/6 to-transparent rounded-full blur-3xl animate-morph"></div>
      </div>
      
      <div className="mx-auto max-w-6xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 px-6 py-3 text-sm font-medium border border-teal-200/50 dark:border-teal-700/50">
            <MessageCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <span className="text-teal-700 dark:text-teal-300">Let's Connect</span>
          </div>
          <h2 className="mb-6 text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 dark:from-white dark:via-teal-100 dark:to-white bg-clip-text text-transparent">
              Ready to
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Start Something?
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>
        
        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Let's start a conversation</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                    <p className="text-slate-600 dark:text-slate-400">hello@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Location</p>
                    <p className="text-slate-600 dark:text-slate-400">Available Worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Response Time</p>
                    <p className="text-slate-600 dark:text-slate-400">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {success && (
                    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                        ✨ Thank you for your message! I'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
                      <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-base font-semibold text-slate-900 dark:text-white">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        disabled={loading}
                        className="h-12 text-base bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-semibold text-slate-900 dark:text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={loading}
                        className="h-12 text-base bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-base font-semibold text-slate-900 dark:text-white">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      disabled={loading}
                      className="h-12 text-base bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-semibold text-slate-900 dark:text-white">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={loading}
                      className="text-base bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-teal-500 dark:focus:border-teal-400 resize-none"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending your message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
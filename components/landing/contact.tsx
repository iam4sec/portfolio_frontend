"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { api } from "@/lib/api"
import { Mail, Send, MapPin, Phone, Clock } from "lucide-react"
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
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      {/* Enhanced background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-muted/20 via-background to-background"></div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[20%] h-96 w-96 rounded-full bg-gradient-to-br from-accent/10 to-primary/5 blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 right-[15%] h-80 w-80 rounded-full bg-gradient-to-tl from-primary/8 to-accent/12 blur-3xl animate-morph"></div>
      </div>
      
      <div className="mx-auto max-w-6xl">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-6 inline-block rounded-full glass px-6 py-2 text-sm font-medium text-accent border border-accent/20">
            💬 Let's Connect
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent md:text-5xl lg:text-6xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>
        
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-2xl font-bold text-foreground">Let's start a conversation</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-2xl glass border border-accent/20 transition-all duration-300 hover:border-accent/40 hover-lift"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="rounded-full bg-accent/20 p-3">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">hello@example.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-2xl glass border border-accent/20 transition-all duration-300 hover:border-accent/40 hover-lift"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="rounded-full bg-accent/20 p-3">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">Available Worldwide</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-2xl glass border border-accent/20 transition-all duration-300 hover:border-accent/40 hover-lift"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="rounded-full bg-accent/20 p-3">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Response Time</p>
                    <p className="text-muted-foreground">Within 24 hours</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-accent/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl bg-green-500/10 border border-green-500/20 p-4"
                    >
                      <AlertDescription className="text-green-600 font-medium">
                        ✨ Thank you for your message! I'll get back to you soon.
                      </AlertDescription>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4"
                    >
                      <AlertDescription className="text-red-600 font-medium">{error}</AlertDescription>
                    </motion.div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <motion.div 
                      className="space-y-3"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label htmlFor="fullName" className="text-base font-semibold text-foreground">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        disabled={loading}
                        className="glass border-accent/20 bg-background/50 h-12 text-base transition-all duration-300 focus:border-accent/50 focus:bg-background/80"
                        placeholder="Your full name"
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-3"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label htmlFor="email" className="text-base font-semibold text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={loading}
                        className="glass border-accent/20 bg-background/50 h-12 text-base transition-all duration-300 focus:border-accent/50 focus:bg-background/80"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    className="space-y-3"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <Label htmlFor="subject" className="text-base font-semibold text-foreground">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      disabled={loading}
                      className="glass border-accent/20 bg-background/50 h-12 text-base transition-all duration-300 focus:border-accent/50 focus:bg-background/80"
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-3"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <Label htmlFor="message" className="text-base font-semibold text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={loading}
                      className="glass border-accent/20 bg-background/50 text-base transition-all duration-300 focus:border-accent/50 focus:bg-background/80 resize-none"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-base font-semibold bg-gradient-to-r from-accent to-primary shadow-xl transition-all duration-300 hover:shadow-2xl hover-glow" 
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
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

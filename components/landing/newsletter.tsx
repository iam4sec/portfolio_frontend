"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { Mail, Send, Sparkles, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import SectionWrapper from "./section-wrapper"

const NewsletterComponent = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Email address is required.")
      return
    }
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await api.subscribe(email)
      if (response.success) {
        setSuccess(true)
        setEmail("")
      } else {
        setError((response.message as string) || "Failed to subscribe.")
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
      setTimeout(() => {
        setSuccess(false)
        setError("")
      }, 5000)
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-gray-900/50" />
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl"
        >
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Stay Updated
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Subscribe to get notified about new blog posts, project updates, and
            insights from my journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-lg mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                className="flex-1 h-12 text-base bg-white/80 dark:bg-gray-900/50 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-full"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                <span className="ml-2">Subscribe</span>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              No spam, unsubscribe at any time.
            </p>
          </form>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-600 dark:text-green-400 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              <p>Thank you for subscribing!</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-600 dark:text-red-400"
            >
              <p>{error}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export const Newsletter = SectionWrapper(NewsletterComponent, "newsletter")
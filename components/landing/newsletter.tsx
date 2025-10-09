"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { Mail, Send, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await api.subscribe(email)
      if (response.success) {
        setSuccess(true)
        setEmail("")
      } else {
        setError(response.message || "Failed to subscribe")
      }
    } catch (err: any) {
      setError(err.message || "Failed to subscribe")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 via-blue-400/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-white/60 to-blue-50/60 dark:from-slate-800/60 dark:to-blue-950/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
            <CardContent className="p-12 text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500">
                <Mail className="h-8 w-8 text-white" />
              </div>
              
              <div className="mb-8">
                <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Stay Updated</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Subscribe to get notified about new blog posts, project updates, and insights from my journey.
                </p>
              </div>

              {success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                      Thank you for subscribing! Check your email for confirmation.
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4"
                >
                  <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="flex-1 h-12 text-base bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
              
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                No spam, unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
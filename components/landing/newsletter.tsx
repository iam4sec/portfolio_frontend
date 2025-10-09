"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { api } from "@/lib/api"
import { Mail, Send } from "lucide-react"

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
    <section className="px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 p-3">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-foreground">Stay Updated</h3>
            <p className="mb-6 text-muted-foreground">
              Subscribe to get notified about new blog posts and project updates.
            </p>

            {success && (
              <Alert className="mb-4">
                <AlertDescription>Thank you for subscribing! Check your email for confirmation.</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
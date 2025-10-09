"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export function Footer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile()
        if (response.success) {
          setProfile(response.data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch profile:", error)
      }
    }

    fetchProfile()
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await api.subscribe(email)
      if (response.success) {
        setMessage("Thank you for subscribing!")
        setEmail("")
      } else {
        setMessage(response.message || "Failed to subscribe")
      }
    } catch (err: any) {
      setMessage(err.message || "Failed to subscribe")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-foreground">{profile?.name || "Portfolio"}</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {profile?.bio?.slice(0, 150) || "Building digital experiences with passion and precision."}
            </p>
            <div className="flex items-center gap-3">
              {profile?.social?.github && (
                <Link
                  href={profile.social.github}
                  target="_blank"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {profile?.social?.linkedin && (
                <Link
                  href={profile.social.linkedin}
                  target="_blank"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {profile?.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#projects" className="transition-colors hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <Button type="submit" size="sm" className="w-full" disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
              {message && <p className="text-xs text-muted-foreground">{message}</p>}
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {profile?.name || "Portfolio"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export function Hero() {
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

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent">
          {profile?.role || "Developer"}
        </div>

        <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {profile?.name || "Your Name"}
        </h1>

        <p className="mb-4 text-xl font-medium text-foreground">{profile?.title || "Full Stack Developer"}</p>

        <p className="mx-auto mb-8 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
          {profile?.bio ||
            "Passionate developer crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering."}
        </p>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#projects">
              View Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#skills">See Skills</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4">
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
    </section>
  )
}

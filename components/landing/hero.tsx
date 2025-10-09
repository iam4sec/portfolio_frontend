"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"

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
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Abstract background elements */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden opacity-40">
        <div className="absolute -top-40 left-[10%] h-80 w-80 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute right-[15%] top-40 h-60 w-60 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center justify-center px-6 py-20 md:flex-row md:gap-12 lg:gap-20">
        <div className="w-full text-center md:max-w-[50%] md:text-left lg:max-w-[55%]">
          <div 
            className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            {profile?.role || "Developer"}
          </div>

          <h1 
            className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            {profile?.name || "Your Name"}
          </h1>

          <p 
            className="mb-4 text-xl font-medium text-foreground animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            {profile?.title || "Full Stack Developer"}
          </p>

          <p 
            className="mb-8 text-balance text-lg leading-relaxed text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "500ms" }}
          >
            {profile?.bio ||
              "Passionate developer crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering."}
          </p>

          <div 
            className="mb-8 flex flex-wrap items-center justify-center gap-4 md:justify-start animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Button size="lg" className="rounded-full shadow-md transition-transform hover:scale-105" asChild>
              <Link href="#projects">
                View Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full border-accent/20 bg-accent/5 transition-colors hover:bg-accent/10" 
              asChild
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
            {profile?.resume && (
              <Button 
                size="lg" 
                variant="ghost" 
                className="rounded-full transition-colors hover:bg-secondary" 
                asChild
              >
                <Link href={profile.resume} target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
            )}
          </div>

          <div 
            className="flex items-center justify-center gap-4 md:justify-start animate-fade-in-up"
            style={{ animationDelay: "700ms" }}
          >
            {profile?.social?.github && (
              <Link
                href={profile.social.github}
                target="_blank"
                className="rounded-full bg-secondary p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-accent/10 hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
            {profile?.social?.linkedin && (
              <Link
                href={profile.social.linkedin}
                target="_blank"
                className="rounded-full bg-secondary p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-accent/10 hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            {profile?.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="rounded-full bg-secondary p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-accent/10 hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
        
        {/* Profile image section */}
        <div className="mb-10 w-full max-w-xs md:mb-0 md:max-w-[40%] lg:max-w-[35%] animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 shadow-xl">
            <Image
              src={profile?.image || "/placeholder-user.jpg"}
              alt={profile?.name || "Profile"}
              fill
              className="object-cover transition-transform hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

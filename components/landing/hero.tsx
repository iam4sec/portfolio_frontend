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
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic gradient mesh background */}
      <div className="absolute inset-0 -z-20 opacity-30 gradient-mesh animate-gradient"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-40 left-[10%] h-96 w-96 rounded-full bg-gradient-to-r from-accent/30 to-primary/20 blur-3xl animate-float delay-0"></div>
        <div className="absolute right-[15%] top-40 h-80 w-80 rounded-full bg-gradient-to-l from-accent/20 to-secondary/30 blur-3xl animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-[20%] h-64 w-64 rounded-full bg-gradient-to-tr from-accent/15 to-primary/25 blur-2xl animate-morph"></div>
        
        {/* Animated particles */}
        <div className="absolute top-1/4 right-1/4 h-2 w-2 rounded-full bg-accent animate-pulse-ring"></div>
        <div className="absolute top-3/4 left-1/3 h-1 w-1 rounded-full bg-primary animate-bounce-subtle delay-500"></div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center justify-center px-6 py-20 md:flex-row md:gap-16 lg:gap-24">
        <div className="w-full text-center md:max-w-[50%] md:text-left lg:max-w-[55%]">
          <div 
            className="mb-6 inline-block rounded-full glass px-6 py-2 text-sm font-medium text-accent border border-accent/20 animate-fade-in hover-glow"
            style={{ animationDelay: "200ms" }}
          >
            ✨ {profile?.role || "Developer"}
          </div>

          <h1 
            className="mb-6 text-balance text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent md:text-6xl lg:text-8xl animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            {profile?.name || "Your Name"}
          </h1>

          <p 
            className="mb-4 text-2xl font-semibold text-gradient animate-fade-in-up"
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
            <Button size="lg" className="group rounded-full bg-gradient-to-r from-accent to-primary shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover-glow" asChild>
              <Link href="#projects">
                View Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full glass border-accent/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover-lift" 
              asChild
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
            {profile?.resume && (
              <Button 
                size="lg" 
                variant="ghost" 
                className="rounded-full glass transition-all duration-300 hover:scale-105 hover-lift" 
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
            className="flex items-center justify-center gap-6 md:justify-start animate-fade-in-up"
            style={{ animationDelay: "700ms" }}
          >
            {profile?.social?.github && (
              <Link
                href={profile.social.github}
                target="_blank"
                className="group relative rounded-full glass p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent hover-glow"
              >
                <Github className="h-6 w-6 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
            )}
            {profile?.social?.linkedin && (
              <Link
                href={profile.social.linkedin}
                target="_blank"
                className="group relative rounded-full glass p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent hover-glow"
              >
                <Linkedin className="h-6 w-6 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
            )}
            {profile?.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="group relative rounded-full glass p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-accent hover-glow"
              >
                <Mail className="h-6 w-6 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
            )}
          </div>
        </div>
        
        {/* Enhanced profile image section */}
        <div className="mb-10 w-full max-w-sm md:mb-0 md:max-w-[45%] lg:max-w-[40%] animate-scale-in" style={{ animationDelay: "300ms" }}>
          <div className="group relative">
            {/* Animated ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-accent via-primary to-accent opacity-30 blur-lg animate-pulse-ring"></div>
            
            {/* Main image container */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-accent/40 via-primary/30 to-accent/20 p-1 shadow-2xl transition-all duration-500 hover:shadow-accent/25 hover-glow">
              <div className="h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-background/10 to-transparent">
                <Image
                  src={profile?.image || "/placeholder-user.jpg"}
                  alt={profile?.name || "Profile"}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  priority
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-accent/80 animate-bounce-subtle delay-200"></div>
            <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-primary/60 animate-float delay-500"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="h-6 w-4 rounded-full border-2 border-current">
            <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-current animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

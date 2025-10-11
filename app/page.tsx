"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Skills } from "@/components/landing/skills"
import { Projects } from "@/components/landing/projects"
import { Experience } from "@/components/landing/experience"
import { Education } from "@/components/landing/education"
import { Achievements } from "@/components/landing/achievements"
import { Volunteer } from "@/components/landing/volunteer"
import { Blogs } from "@/components/landing/blogs"
import { Newsletter } from "@/components/landing/newsletter"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button"
import { Suspense } from "react"

const SectionLoading = () => (
  <div className="flex h-32 items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"></div>
  </div>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
      
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative w-full">
        <Navbar />
        <Hero />
      </div>
      <div className="w-full max-w-7xl p-4 md:p-16">
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Volunteer />
        <Blogs />
        <Contact />
        <Newsletter />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </main>

      <ScrollToTopButton />
    </div>
  )
}
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)]" />
      </div>
      
      {/* Floating Elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-200/20 dark:bg-cyan-800/20 rounded-full blur-xl animate-pulse delay-2000" />
      </div>

      <Navbar />
      
      <main className="relative">
        <Hero />
        
        {/* Content Sections with Enhanced Spacing */}
        <div className="relative space-y-32 py-20">
          <Suspense fallback={<SectionLoading />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Experience />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Education />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Projects />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Achievements />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Volunteer />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Blogs />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Contact />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Newsletter />
          </Suspense>
        </div>
        
        <Footer />
      </main>

      <ScrollToTopButton />
    </div>
  )
}
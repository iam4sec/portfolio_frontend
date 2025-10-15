"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Skills } from "@/components/landing/skills"
import { Projects } from "@/components/landing/projects"
import { Experience } from "@/components/landing/experience"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button"
import { Suspense } from "react"

const SectionLoading = () => (
  <div className="flex h-32 items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-3 border-gray-200 border-t-[#0E0E52]"></div>
  </div>
)

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F2F2F2] dark:bg-gray-900">
      {/* Professional Background with Navy & Purple Accents */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F2F2F2] via-white to-[#6C63FF]/5 dark:from-gray-900 dark:via-gray-800 dark:to-[#0E0E52]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,14,82,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(108,99,255,0.06),transparent_50%)]" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230E0E52' fill-opacity='1'%3E%3Cpath d='M20 20h20v20H20V20zm-20 0h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      </div>
      
      {/* Elegant Floating Elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#0E0E52]/5 dark:bg-[#0E0E52]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 right-20 w-48 h-48 bg-[#6C63FF]/5 dark:bg-[#6C63FF]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-[#0E0E52]/3 dark:bg-[#0E0E52]/8 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <Navbar />
      
      <main className="relative">
        <Hero />
        
        {/* Content Sections with Professional Spacing */}
        <div className="relative space-y-32 py-20">
          <Suspense fallback={<SectionLoading />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Projects />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Experience />
          </Suspense>
          
          <Suspense fallback={<SectionLoading />}>
            <Contact />
          </Suspense>
        </div>
        
        <Footer />
      </main>

      <ScrollToTopButton />
    </div>
  )
}
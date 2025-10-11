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
      {/* Modern Geometric Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.02)_50%,transparent_75%)]" />
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      </div>
      
      {/* Modern Floating Elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-200/10 dark:bg-emerald-800/10 rounded-2xl rotate-12 blur-2xl animate-pulse" />
        <div className="absolute top-60 right-20 w-32 h-32 bg-amber-200/10 dark:bg-amber-800/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-teal-200/10 dark:bg-teal-800/10 rounded-3xl -rotate-12 blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-orange-200/10 dark:bg-orange-800/10 rounded-xl rotate-45 blur-xl animate-pulse delay-3000" />
      </div>

      <Navbar />
      
      <main className="relative">
        <Hero />
        
        {/* Content Sections with Modern Spacing */}
        <div className="relative space-y-40 py-24">
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
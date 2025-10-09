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
  <div className="flex h-96 items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/20 border-t-accent"></div>
  </div>
)

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden scroll-smooth">
      {/* Clean minimal background */}
      <div className="fixed inset-0 -z-50 bg-background"></div>
      
      {/* Subtle accent elements */}
      <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        
        <div className="space-y-0">
          <Suspense fallback={<SectionLoading />}><About /></Suspense>
          <Suspense fallback={<SectionLoading />}><Skills /></Suspense>
          <Suspense fallback={<SectionLoading />}><Projects /></Suspense>
          <Suspense fallback={<SectionLoading />}><Experience /></Suspense>
          <Suspense fallback={<SectionLoading />}><Education /></Suspense>
          <Suspense fallback={<SectionLoading />}><Achievements /></Suspense>
          <Suspense fallback={<SectionLoading />}><Volunteer /></Suspense>
          <Suspense fallback={<SectionLoading />}><Blogs /></Suspense>
          <Suspense fallback={<SectionLoading />}><Newsletter /></Suspense>
          <Suspense fallback={<SectionLoading />}><Contact /></Suspense>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
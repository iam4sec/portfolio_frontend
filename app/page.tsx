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

// Add Loading fallback components
const SectionLoading = () => (
  <div className="flex h-64 items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
)

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden scroll-smooth">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 -z-50 bg-background"></div>
      <div className="fixed inset-0 -z-40 opacity-60 gradient-mesh animate-gradient"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-accent/60 animate-float delay-0"></div>
        <div className="absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-primary/40 animate-bounce-subtle delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 h-1 w-1 rounded-full bg-accent/50 animate-pulse delay-500"></div>
        <div className="absolute top-2/3 right-1/4 h-1 w-1 rounded-full bg-primary/60 animate-float delay-700"></div>
      </div>
      
      <Navbar />
      
      {/* Main content with improved spacing */}
      <main className="relative">
        <Hero />
        
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
          <Education />
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
          <Newsletter />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
      
      {/* Back to top button - now using a client component */}
      <ScrollToTopButton />
    </div>
  )
}

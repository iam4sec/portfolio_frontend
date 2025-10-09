import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
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
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 -z-50 bg-background opacity-80" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, var(--accent) / 0.03 0%, transparent 20%),
            radial-gradient(circle at 90% 50%, var(--accent) / 0.05 0%, transparent 25%),
            radial-gradient(circle at 40% 80%, var(--accent) / 0.03 0%, transparent 35%)
          `,
        }}
      />
      
      <Navbar />
      
      {/* Main content with improved spacing */}
      <main className="relative">
        <Hero />
        
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
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent/80 text-white shadow-lg opacity-0 transition-all duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 scroll-visible"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
      
      {/* Add inline script for scroll button visibility */}
      <script 
        dangerouslySetInnerHTML={{ 
          __html: `
            document.addEventListener('scroll', function() {
              const scrollButton = document.querySelector('.scroll-visible');
              if (window.scrollY > 500) {
                scrollButton.classList.add('opacity-100');
              } else {
                scrollButton.classList.remove('opacity-100');
              }
            });
          ` 
        }} 
      />
    </div>
  )
}

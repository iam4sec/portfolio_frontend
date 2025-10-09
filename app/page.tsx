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
    <div className="relative">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-blue-600"></div>
    </div>
  </div>
)

const SectionDivider = ({ delay = 0 }: { delay?: number }) => (
  <div className="relative py-16">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
    </div>
  </div>
)

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Simplified background */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)]"></div>
      </div>
      
      {/* Subtle floating elements */}
      <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
        <div className="absolute right-[20%] top-[15%] h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/5 to-purple-400/5 blur-3xl animate-float"></div>
        <div className="absolute left-[15%] bottom-[20%] h-80 w-80 rounded-full bg-gradient-to-tl from-emerald-400/5 to-blue-400/5 blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        
        <div className="space-y-0">
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><About /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Skills /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Projects /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Experience /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Education /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Achievements /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Volunteer /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Blogs /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Newsletter /></Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionLoading />}><Contact /></Suspense>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
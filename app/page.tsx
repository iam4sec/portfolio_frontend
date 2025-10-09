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
    <div className="relative">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-accent/60 border-r-primary/40"></div>
      <div className="absolute inset-2 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-b-accent/40 border-l-primary/60 animate-reverse-spin"></div>
      <div className="absolute inset-4 h-8 w-8 animate-pulse rounded-full bg-gradient-to-r from-accent/20 to-primary/20"></div>
    </div>
  </div>
)

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden scroll-smooth">
      {/* Revolutionary layered background system */}
      <div className="fixed inset-0 -z-50">
        {/* Base gradient foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30"></div>
        
        {/* Dynamic mesh gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.10),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]"></div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating geometric elements */}
      <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
        <div className="absolute right-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/10 via-purple-400/8 to-transparent blur-3xl animate-float"></div>
        <div className="absolute left-[10%] top-[50%] h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-emerald-400/8 via-blue-400/6 to-transparent blur-3xl animate-morph"></div>
        <div className="absolute right-[25%] bottom-[15%] h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-purple-400/6 via-pink-400/4 to-transparent blur-3xl animate-bounce-subtle"></div>
        
        {/* Geometric shapes */}
        <div className="absolute left-[5%] top-[25%] h-32 w-32 rotate-45 bg-gradient-to-br from-accent/5 to-primary/5 blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute right-[8%] top-[60%] h-24 w-24 rotate-12 bg-gradient-to-br from-primary/5 to-accent/5 blur-sm animate-morph" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Modern dot pattern */}
      <div className="pointer-events-none fixed inset-0 -z-30 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        
        {/* Redesigned section flow with modern separators */}
        <div className="relative space-y-32">
          {/* Flowing section dividers */}
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-accent/20"></div>
                <div className="h-2 w-2 rounded-full bg-accent/30 animate-pulse"></div>
                <div className="h-px w-16 bg-gradient-to-r from-accent/20 via-accent/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><About /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/40 to-primary/20"></div>
                <div className="h-2 w-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="h-px w-20 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Skills /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent/40 to-accent/20"></div>
                <div className="h-2 w-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="h-px w-24 bg-gradient-to-r from-accent/20 via-accent/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Projects /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/40 to-primary/20"></div>
                <div className="h-2 w-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="h-px w-16 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Experience /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent/40 to-accent/20"></div>
                <div className="h-2 w-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="h-px w-20 bg-gradient-to-r from-accent/20 via-accent/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Education /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-primary/20"></div>
                <div className="h-2 w-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                <div className="h-px w-24 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Achievements /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-accent/20"></div>
                <div className="h-2 w-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '3s' }}></div>
                <div className="h-px w-16 bg-gradient-to-r from-accent/20 via-accent/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Volunteer /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/40 to-primary/20"></div>
                <div className="h-2 w-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '3.5s' }}></div>
                <div className="h-px w-20 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Blogs /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent/40 to-accent/20"></div>
                <div className="h-2 w-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="h-px w-24 bg-gradient-to-r from-accent/20 via-accent/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Newsletter /></Suspense>
          
          <div className="relative py-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/40 to-primary/20"></div>
                <div className="h-2 w-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '4.5s' }}></div>
                <div className="h-px w-16 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={<SectionLoading />}><Contact /></Suspense>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
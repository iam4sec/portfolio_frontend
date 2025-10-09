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

// Enhanced loading component with modern skeleton
const SectionLoading = () => (
    <div className="flex h-96 items-center justify-center">
        <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
            <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-2 border-accent/10" />
        </div>
    </div>
)

export default function HomePage() {
    return (
        <div className="relative min-h-screen overflow-x-hidden scroll-smooth">
            {/* Advanced layered background system */}
            <div className="fixed inset-0 -z-50">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />

                {/* Dynamic mesh gradient */}
                <div className="absolute inset-0 opacity-40 gradient-mesh animate-gradient" />

                {/* Noise texture overlay — simplified to avoid parser issues */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>\")",
                    }}
                />
            </div>

            {/* Enhanced floating elements */}
            <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
                {/* Large ambient orbs */}
                <div className="absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-accent/5 to-primary/30 blur-3xl animate-float duration-[20s]" />
                <div className="absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-primary/40 to-accent/60 blur-3xl animate-float delay-[10s] duration-[25s]" />

                {/* Medium floating shapes */}
                <div className="absolute right-1/3 top-1/4 h-32 w-32 rounded-full bg-accent/80 blur-2xl animate-bounce-subtle delay-[2s]" />
                <div className="absolute bottom-1/3 left-1/4 h-24 w-24 rounded-full bg-primary/60 blur-xl animate-float delay-[5s]" />

                {/* Small particles */}
                <div className="absolute left-1/5 top-1/5 h-2 w-2 rounded-full bg-accent/40 animate-pulse-ring delay-[1s]" />
                <div className="absolute right-1/5 top-2/3 h-1 w-1 rounded-full bg-primary/60 animate-bounce-subtle delay-[3s]" />
                <div className="absolute bottom-1/4 left-2/3 h-1.5 w-1.5 rounded-full bg-accent/50 animate-float delay-[7s]" />
            </div>

            <Navbar />

            {/* Main content with enhanced spacing and transitions */}
            <main className="relative z-10">
                <Hero />

                {/* Content sections with staggered loading */}
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

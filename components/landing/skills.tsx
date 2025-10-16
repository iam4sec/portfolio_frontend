"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { SectionWrapper } from "./section-wrapper"
import { motion, Variants } from "framer-motion"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiAmazonaws,
  SiFigma,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiRedis,
  SiGraphql,
  SiPrisma,
  SiVercel,
  SiNetlify,
  SiVscode,
  SiLinux,
} from "react-icons/si"
import { Code2, Zap, Database, Wrench, Star, TrendingUp } from "lucide-react"
import { AnimatedProgress } from "@/components/ui/animated-progress"
import { CircularProgress } from "@/components/ui/circular-progress"
import { TiltCard } from "@/components/ui/tilt-card"

const iconMap: { [key: string]: React.ElementType } = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  GraphQL: SiGraphql,
  Prisma: SiPrisma,
  Git: SiGit,
  Docker: SiDocker,
  AWS: SiAmazonaws,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  "VS Code": SiVscode,
  Linux: SiLinux,
  Figma: SiFigma,
}

const categoryIcons = {
  Frontend: Code2,
  Backend: Database,
  "Tools & DevOps": Wrench,
  "Design & UX": Star,
}

export function Skills() {
  const [skillsData, setSkillsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.getSkills()
        if (response.success) {
          setSkillsData(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const defaultSkills = {
    categories: [
      {
        title: "Frontend",
        skills: [
          { name: "React", level: "Expert", years: "3+" },
          { name: "Next.js", level: "Expert", years: "3+" },
          { name: "TypeScript", level: "Advanced", years: "2+" },
          { name: "JavaScript", level: "Expert", years: "3+" },
          { name: "Tailwind CSS", level: "Advanced", years: "2+" },
          { name: "HTML5", level: "Expert", years: "3+" },
        ],
      },
      {
        title: "Backend",
        skills: [
          { name: "Node.js", level: "Advanced", years: "3+" },
          { name: "Express", level: "Advanced", years: "2+" },
          { name: "Python", level: "Advanced", years: "2+" },
          { name: "PostgreSQL", level: "Advanced", years: "2+" },
          { name: "MongoDB", level: "Advanced", years: "2+" },
          { name: "GraphQL", level: "Intermediate", years: "1+" },
        ],
      },
      {
        title: "Tools & DevOps",
        skills: [
          { name: "Git", level: "Expert", years: "3+" },
          { name: "Docker", level: "Advanced", years: "2+" },
          { name: "AWS", level: "Advanced", years: "2+" },
          { name: "Figma", level: "Advanced", years: "2+" },
          { name: "VS Code", level: "Expert", years: "3+" },
          { name: "Linux", level: "Advanced", years: "2+" },
        ],
      },
    ],
    highlights: [
      "UX Research & Prototyping",
      "Accessibility Compliance",
      "Motion Design",
      "Performance Optimization",
    ],
  }

  if (loading) {
    return (
      <SectionWrapper id="skills">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-64 bg-slate-200 dark:bg-gray-700 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    )
  }

  const skills = skillsData?.categories ? skillsData : defaultSkills

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "from-[#0E0E52] to-[#6C63FF]"
      case "Advanced":
        return "from-[#6C63FF] to-[#0E0E52]"
      case "Intermediate":
        return "from-gray-400 to-gray-600"
      default:
        return "from-gray-300 to-gray-500"
    }
  }

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case "Expert":
        return 95
      case "Advanced":
        return 80
      case "Intermediate":
        return 65
      default:
        return 40
    }
  }

  return (
    <SectionWrapper 
      id="skills" 
      title="Skills & Expertise"
      subtitle="Tools, technologies, and methodologies I use to craft exceptional digital experiences"
      centered
    >
      <div className="space-y-16">
        {/* Skills Highlights */}
        {skills.highlights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {skills.highlights.map((highlight: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 backdrop-blur-sm rounded-2xl border border-emerald-200/30 dark:border-emerald-700/30 hover:border-emerald-300/50 dark:hover:border-emerald-600/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
                >
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold">
                    <TrendingUp className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                    {typeof highlight === 'string' ? highlight : highlight.title || 'Skill'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills Categories with Enhanced Progress */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((category: any, categoryIndex: number) => {
            const CategoryIcon = categoryIcons[category.title as keyof typeof categoryIcons] || Code2
            return (
              <TiltCard key={categoryIndex}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="group relative h-full"
                  data-magnetic="true"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/15 to-[#0E0E52]/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 hover:border-[#6C63FF]/30 dark:hover:border-[#6C63FF]/50 transition-all duration-300 h-full hover:shadow-xl hover:shadow-[#6C63FF]/10">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-gradient-to-br from-[#0E0E52] to-[#6C63FF] rounded-2xl shadow-lg">
                        <CategoryIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills List with Enhanced Progress */}
                    <div className="space-y-6">
                      {category.skills.map((skill: any, skillIndex: number) => {
                        const skillName = typeof skill === "string" ? skill : skill.name
                        const skillLevel = typeof skill === "object" ? skill.level : "Intermediate"
                        const skillYears = typeof skill === "object" ? skill.years : "1+"
                        const Icon = iconMap[skillName]
                        const isHovered = hoveredSkill === `${categoryIndex}-${skillIndex}`
                        const percentage = getLevelPercentage(skillLevel)

                        return (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                            className="group/skill relative p-4 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer hover:shadow-lg"
                            onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex items-center gap-4">
                              {Icon && (
                                <div className="relative flex-shrink-0">
                                  <Icon className="w-8 h-8 text-[#6C63FF] dark:text-[#6C63FF] group-hover/skill:scale-110 transition-transform duration-300" />
                                  {isHovered && (
                                    <div className="absolute inset-0 bg-[#6C63FF]/20 rounded-full animate-ping" />
                                  )}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="font-bold text-gray-800 dark:text-gray-200 truncate">
                                    {skillName}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                                    {skillYears}
                                  </span>
                                </div>
                                <AnimatedProgress
                                  value={percentage}
                                  color={getLevelColor(skillLevel)}
                                  duration={1.5}
                                  delay={skillIndex * 0.1}
                                  showPercentage={false}
                                />
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                                    {skillLevel}
                                  </span>
                                  <span className="text-xs text-[#6C63FF] font-bold">
                                    {percentage}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
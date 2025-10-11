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
          { name: "Next.js", level: "Advanced", years: "2+" },
          { name: "TypeScript", level: "Advanced", years: "2+" },
          { name: "JavaScript", level: "Expert", years: "3+" },
          { name: "Tailwind CSS", level: "Advanced", years: "2+" },
          { name: "HTML5", level: "Expert", years: "3+" },
        ],
      },
      {
        title: "Backend",
        skills: [
          { name: "Node.js", level: "Advanced", years: "2+" },
          { name: "Express", level: "Advanced", years: "2+" },
          { name: "Python", level: "Intermediate", years: "1+" },
          { name: "PostgreSQL", level: "Advanced", years: "2+" },
          { name: "MongoDB", level: "Intermediate", years: "1+" },
          { name: "GraphQL", level: "Intermediate", years: "1+" },
        ],
      },
      {
        title: "Tools & DevOps",
        skills: [
          { name: "Git", level: "Expert", years: "3+" },
          { name: "Docker", level: "Intermediate", years: "1+" },
          { name: "AWS", level: "Intermediate", years: "1+" },
          { name: "Vercel", level: "Advanced", years: "2+" },
          { name: "VS Code", level: "Expert", years: "3+" },
          { name: "Linux", level: "Intermediate", years: "2+" },
        ],
      },
    ],
    highlights: [
      "Full-Stack Development",
      "Modern JavaScript Frameworks",
      "Cloud Architecture",
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
        return "from-green-500 to-emerald-600"
      case "Advanced":
        return "from-blue-500 to-cyan-600"
      case "Intermediate":
        return "from-yellow-500 to-orange-600"
      default:
        return "from-gray-500 to-slate-600"
    }
  }

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "Expert":
        return "w-full"
      case "Advanced":
        return "w-4/5"
      case "Intermediate":
        return "w-3/5"
      default:
        return "w-2/5"
    }
  }

  return (
    <SectionWrapper 
      id="skills" 
      title="Technical Skills"
      subtitle="Technologies and tools I use to bring ideas to life"
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
                  className="group px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 backdrop-blur-sm rounded-full border border-blue-200/30 dark:border-blue-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <TrendingUp className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    {typeof highlight === 'string' ? highlight : highlight.title || 'Skill'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((category: any, categoryIndex: number) => {
            const CategoryIcon = categoryIcons[category.title as keyof typeof categoryIcons] || Code2
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill: any, skillIndex: number) => {
                      const skillName = typeof skill === "string" ? skill : skill.name
                      const skillLevel = typeof skill === "object" ? skill.level : "Intermediate"
                      const skillYears = typeof skill === "object" ? skill.years : "1+"
                      const Icon = iconMap[skillName]
                      const isHovered = hoveredSkill === `${categoryIndex}-${skillIndex}`

                      return (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                          className="group/skill relative p-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                          onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className="flex items-center gap-3">
                            {Icon && (
                              <div className="relative">
                                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover/skill:scale-110 transition-transform duration-300" />
                                {isHovered && (
                                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                                )}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                  {skillName}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                  {skillYears}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                    className={`h-full bg-gradient-to-r ${getLevelColor(skillLevel)} ${getLevelWidth(skillLevel)} rounded-full`}
                                  />
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium min-w-fit">
                                  {skillLevel}
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
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
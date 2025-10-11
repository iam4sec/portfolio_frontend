"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import SectionWrapper from "./section-wrapper"
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
} from "react-icons/si"

const iconMap: { [key: string]: React.ElementType } = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Git: SiGit,
  Docker: SiDocker,
  AWS: SiAmazonaws,
  Figma: SiFigma,
}

const SkillsComponent = () => {
  const [skillsData, setSkillsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "Backend",
        skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
      },
      {
        title: "Tools & DevOps",
        skills: ["Git", "Docker", "AWS", "Figma"],
      },
    ],
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-48 bg-slate-200 dark:bg-gray-700 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const skills = skillsData?.categories ? skillsData : defaultSkills

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          My Tech Stack
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          Technologies I use to build modern, scalable, and robust web
          applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.categories.map((category: any, index: number) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {category.skills.map((skill: any, skillIndex: number) => {
                const skillName = typeof skill === "string" ? skill : skill.name
                const Icon = iconMap[skillName]
                return (
                  <div
                    key={skillIndex}
                    className="flex flex-col items-center justify-center p-4 bg-slate-100/50 dark:bg-gray-900/50 rounded-lg hover:bg-slate-200/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {Icon && (
                      <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-2" />
                    )}
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-center">
                      {skillName}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const Skills = SectionWrapper(SkillsComponent, "skills")
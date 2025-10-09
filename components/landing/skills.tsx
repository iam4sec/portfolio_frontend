"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { api } from "@/lib/api"

export function Skills() {
  const [skills, setSkills] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.getSkills()
        if (response.success) {
          setSkills(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading || !skills?.categories?.length) {
    return null
  }

  const getSkillLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert': return 95
      case 'advanced': return 85
      case 'intermediate': return 70
      case 'beginner': return 40
      default: return 60
    }
  }

  return (
    <section id="skills" className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground">Technologies and tools I work with</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.categories.map((category: any, index: number) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill: any, skillIndex: number) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {skill.years}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{skill.level}</span>
                        </div>
                      </div>
                      <Progress value={getSkillLevel(skill.level)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
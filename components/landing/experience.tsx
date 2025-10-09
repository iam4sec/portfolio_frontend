"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { Briefcase } from "lucide-react"

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await api.getExperiences()
        if (response.success) {
          setExperiences(response.data.slice(0, 4))
        }
      } catch (error) {
        console.error("[v0] Failed to fetch experiences:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  if (loading) {
    return null
  }

  return (
    <section id="experience" className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Experience</h2>
          <p className="text-lg text-muted-foreground">My professional journey</p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card key={exp._id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Briefcase className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{exp.position}</h3>
                        <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                      </div>
                      {exp.current && (
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exp.technologies?.slice(0, 6).map((tech: string) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

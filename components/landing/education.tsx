"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"
import { api } from "@/lib/api"

export function Education() {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.getEducation()
        if (response.success) {
          setEducation(response.data.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch education:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  if (loading || education.length === 0) {
    return null
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Education</h2>
          <p className="text-lg text-muted-foreground">Academic background and learning journey</p>
        </div>

        <div className="space-y-6">
          {education.map((edu) => (
            <Card key={edu._id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-sm font-medium text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                      </div>
                      {edu.type && (
                        <Badge variant="secondary">
                          {edu.type}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                    </div>
                    {edu.description && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
                    )}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Achievements:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {edu.achievements.map((achievement: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-accent">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
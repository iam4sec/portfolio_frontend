"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export function Achievements() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await api.getAchievements({ featured: true })
        if (response.success) {
          setAchievements(response.data.slice(0, 6))
        }
      } catch (error) {
        console.error("Failed to fetch achievements:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  if (loading || achievements.length === 0) {
    return null
  }

  return (
    <section className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Achievements</h2>
          <p className="text-lg text-muted-foreground">Certifications and recognitions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card key={achievement._id} className="group overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {achievement.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground">{achievement.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{achievement.issuer}</p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{achievement.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(achievement.date).toLocaleDateString()}
                  </span>
                  {achievement.url && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={achievement.url} target="_blank">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
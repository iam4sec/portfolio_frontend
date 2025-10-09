"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Heart } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export function Volunteer() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await api.getVolunteers()
        if (response.success) {
          setVolunteers(response.data.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch volunteer experiences:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVolunteers()
  }, [])

  if (loading || volunteers.length === 0) {
    return null
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Volunteer Work</h2>
          <p className="text-lg text-muted-foreground">Giving back to the community</p>
        </div>

        <div className="space-y-6">
          {volunteers.map((volunteer) => (
            <Card key={volunteer._id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Heart className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{volunteer.role}</h3>
                        <p className="text-sm font-medium text-muted-foreground">{volunteer.organization}</p>
                        <p className="text-sm text-muted-foreground">{volunteer.location}</p>
                      </div>
                      {volunteer.current && (
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {new Date(volunteer.startDate).getFullYear()} - {volunteer.endDate ? new Date(volunteer.endDate).getFullYear() : 'Present'}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{volunteer.description}</p>
                    {volunteer.skills && volunteer.skills.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {volunteer.skills.slice(0, 6).map((skill: string) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {volunteer.website && (
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={volunteer.website} target="_blank">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Visit Organization
                          </Link>
                        </Button>
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
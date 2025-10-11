"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await api.getExperiences()
      if (response.success) {
        setExperiences(response.data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch experiences:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return

    try {
      await api.deleteExperience(id)
      setExperiences(experiences.filter((exp) => exp._id !== id))
    } catch (error) {
      console.error("[v0] Failed to delete experience:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader 
        title="Experience" 
        description="Manage work experience"
        action={
          <Button asChild>
            <Link href="/admin/experience/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Link>
          </Button>
        }
      />

      <div className="flex-1 space-y-4 p-6">
        {experiences.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No experiences found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {experiences.map((exp) => (
              <Card key={exp._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{exp.position}</h3>
                        {exp.current && <Badge>Current</Badge>}
                      </div>
                      <p className="mt-1 font-medium text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {exp.technologies?.slice(0, 5).map((tech: string) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(exp._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

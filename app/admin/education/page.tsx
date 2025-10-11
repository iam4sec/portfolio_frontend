"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { api } from "@/lib/api"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function EducationPage() {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const response = await api.getEducation()
      if (response.success) {
        setEducation(response.data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch education:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return

    try {
      await api.deleteEducation(id)
      setEducation(education.filter((edu) => edu._id !== id))
    } catch (error) {
      console.error("[v0] Failed to delete education:", error)
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
        title="Education" 
        description="Manage education history"
        action={
          <Button asChild>
            <Link href="/admin/education/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Link>
          </Button>
        }
      />

      <div className="flex-1 space-y-4 p-6">
        {education.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No education entries found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {education.map((edu) => (
              <Card key={edu._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                      <p className="mt-1 font-medium text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.location}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(edu._id)}>
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

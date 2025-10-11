"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function VolunteerPage() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      const response = await api.getVolunteers()
      if (response.success) {
        setVolunteers(response.data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch volunteers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this volunteer experience?")) return

    try {
      await api.deleteVolunteer(id)
      setVolunteers(volunteers.filter((vol) => vol._id !== id))
    } catch (error) {
      console.error("[v0] Failed to delete volunteer:", error)
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
        title="Volunteer" 
        description="Manage volunteer experiences"
        action={
          <Button asChild>
            <Link href="/admin/volunteer/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Volunteer
            </Link>
          </Button>
        }
      />

      <div className="flex-1 space-y-4 p-6">
        {volunteers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No volunteer experiences found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {volunteers.map((vol) => (
              <Card key={vol._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{vol.role}</h3>
                        {vol.current && <Badge>Current</Badge>}
                      </div>
                      <p className="mt-1 font-medium text-muted-foreground">{vol.organization}</p>
                      <p className="text-sm text-muted-foreground">{vol.location}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{vol.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {vol.skills?.slice(0, 5).map((skill: string) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(vol._id)}>
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

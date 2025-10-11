"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await api.getAchievements()
      if (response.success) {
        setAchievements(response.data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return

    try {
      await api.deleteAchievement(id)
      setAchievements(achievements.filter((ach) => ach._id !== id))
    } catch (error) {
      console.error("[v0] Failed to delete achievement:", error)
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
        title="Achievements" 
        description="Manage achievements and certifications"
        action={
          <Button asChild>
            <Link href="/admin/achievements/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Achievement
            </Link>
          </Button>
        }
      />

      <div className="flex-1 space-y-4 p-6">
        {achievements.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No achievements found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((ach) => (
              <Card key={ach._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{ach.title}</h3>
                        {ach.featured && <Badge>Featured</Badge>}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{ach.issuer}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{ach.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {ach.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(ach._id)}>
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

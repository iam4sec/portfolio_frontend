"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewAchievementPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [achievement, setAchievement] = useState({
    title: "",
    issuer: "",
    category: "",
    date: "",
    description: "",
    credentialUrl: "",
    featured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.createAchievement(achievement)
      if (response.success) {
        router.push("/admin/achievements")
      }
    } catch (error) {
      console.error("Failed to create achievement:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader
        title="Add Achievement"
        description="Add new achievement or certification"
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/achievements">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        }
      />

      <div className="flex-1 p-6">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={achievement.title}
                  onChange={(e) => setAchievement({ ...achievement, title: e.target.value })}
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <Label htmlFor="issuer">Issuer</Label>
                <Input
                  id="issuer"
                  value={achievement.issuer}
                  onChange={(e) => setAchievement({ ...achievement, issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={achievement.category}
                  onChange={(e) => setAchievement({ ...achievement, category: e.target.value })}
                  placeholder="Certification, Award, Recognition"
                />
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={achievement.date}
                  onChange={(e) => setAchievement({ ...achievement, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="credentialUrl">Credential URL (optional)</Label>
                <Input
                  id="credentialUrl"
                  value={achievement.credentialUrl}
                  onChange={(e) => setAchievement({ ...achievement, credentialUrl: e.target.value })}
                  placeholder="https://credential-url.com"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  value={achievement.description}
                  onChange={(value) => setAchievement({ ...achievement, description: value || "" })}
                  placeholder="Brief description of the achievement..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={achievement.featured}
                  onCheckedChange={(checked) => setAchievement({ ...achievement, featured: checked })}
                />
                <Label htmlFor="featured">Featured Achievement</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Add Achievement"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/achievements">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
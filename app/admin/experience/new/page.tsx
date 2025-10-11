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

export default function NewExperiencePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [experience, setExperience] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    technologies: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const expData = {
        ...experience,
        technologies: experience.technologies.split(",").map(tech => tech.trim()).filter(Boolean),
      }
      
      const response = await api.createExperience(expData)
      if (response.success) {
        router.push("/admin/experience")
      }
    } catch (error) {
      console.error("Failed to create experience:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader
        title="Add Experience"
        description="Add new work experience"
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/experience">
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
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={experience.position}
                  onChange={(e) => setExperience({ ...experience, position: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={experience.company}
                  onChange={(e) => setExperience({ ...experience, company: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={experience.location}
                  onChange={(e) => setExperience({ ...experience, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => setExperience({ ...experience, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => setExperience({ ...experience, endDate: e.target.value })}
                    disabled={experience.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="current"
                  checked={experience.current}
                  onCheckedChange={(checked) => setExperience({ ...experience, current: checked, endDate: checked ? "" : experience.endDate })}
                />
                <Label htmlFor="current">Currently working here</Label>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  value={experience.description}
                  onChange={(value) => setExperience({ ...experience, description: value || "" })}
                  placeholder="Describe your role and achievements..."
                />
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma separated)</Label>
                <Input
                  id="technologies"
                  value={experience.technologies}
                  onChange={(e) => setExperience({ ...experience, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Add Experience"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/experience">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
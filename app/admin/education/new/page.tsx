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
import { api } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewEducationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [education, setEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    gpa: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.createEducation(education)
      if (response.success) {
        router.push("/admin/education")
      }
    } catch (error) {
      console.error("Failed to create education:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader
        title="Add Education"
        description="Add new education entry"
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/education">
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
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  value={education.degree}
                  onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                  placeholder="Bachelor of Science in Computer Science"
                  required
                />
              </div>

              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={education.institution}
                  onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                  placeholder="University Name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={education.location}
                  onChange={(e) => setEducation({ ...education, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={education.startDate}
                    onChange={(e) => setEducation({ ...education, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={education.endDate}
                    onChange={(e) => setEducation({ ...education, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gpa">GPA (optional)</Label>
                <Input
                  id="gpa"
                  value={education.gpa}
                  onChange={(e) => setEducation({ ...education, gpa: e.target.value })}
                  placeholder="3.8/4.0"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  value={education.description}
                  onChange={(value) => setEducation({ ...education, description: value || "" })}
                  placeholder="Relevant coursework, achievements, activities..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Add Education"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/education">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
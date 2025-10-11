"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewVolunteerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [volunteer, setVolunteer] = useState({
    role: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    skills: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const volData = {
        ...volunteer,
        skills: volunteer.skills.split(",").map(skill => skill.trim()).filter(Boolean),
      }
      
      const response = await api.createVolunteer(volData)
      if (response.success) {
        router.push("/admin/volunteer")
      }
    } catch (error) {
      console.error("Failed to create volunteer:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader
        title="Add Volunteer"
        description="Add new volunteer experience"
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/volunteer">
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
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={volunteer.role}
                  onChange={(e) => setVolunteer({ ...volunteer, role: e.target.value })}
                  placeholder="Volunteer Developer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={volunteer.organization}
                  onChange={(e) => setVolunteer({ ...volunteer, organization: e.target.value })}
                  placeholder="Non-profit Organization"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={volunteer.location}
                  onChange={(e) => setVolunteer({ ...volunteer, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={volunteer.startDate}
                    onChange={(e) => setVolunteer({ ...volunteer, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={volunteer.endDate}
                    onChange={(e) => setVolunteer({ ...volunteer, endDate: e.target.value })}
                    disabled={volunteer.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="current"
                  checked={volunteer.current}
                  onCheckedChange={(checked) => setVolunteer({ ...volunteer, current: checked, endDate: checked ? "" : volunteer.endDate })}
                />
                <Label htmlFor="current">Currently volunteering</Label>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={volunteer.description}
                  onChange={(e) => setVolunteer({ ...volunteer, description: e.target.value })}
                  rows={4}
                  placeholder="Describe your volunteer work and impact..."
                />
              </div>

              <div>
                <Label htmlFor="skills">Skills Used (comma separated)</Label>
                <Input
                  id="skills"
                  value={volunteer.skills}
                  onChange={(e) => setVolunteer({ ...volunteer, skills: e.target.value })}
                  placeholder="Web Development, Project Management, Teaching"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Add Volunteer"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/volunteer">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
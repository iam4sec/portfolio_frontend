"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [project, setProject] = useState({
    title: "",
    description: "",
    category: "",
    technologies: "",
    featured: false,
    links: {
      live: "",
      github: "",
    },
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories({ type: "project" })
      if (response.success) {
        setCategories(response.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const projectData = {
        ...project,
        technologies: project.technologies.split(",").map(tech => tech.trim()).filter(Boolean),
      }
      
      const response = await api.createProject(projectData)
      if (response.success) {
        router.push("/admin/projects")
      }
    } catch (error) {
      console.error("Failed to create project:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader
        title="New Project"
        description="Create a new portfolio project"
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
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
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={project.description}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={project.category} onValueChange={(value) => setProject({ ...project, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma separated)</Label>
                <Input
                  id="technologies"
                  value={project.technologies}
                  onChange={(e) => setProject({ ...project, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input
                  id="liveUrl"
                  value={project.links.live}
                  onChange={(e) => setProject({ ...project, links: { ...project.links, live: e.target.value } })}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={project.links.github}
                  onChange={(e) => setProject({ ...project, links: { ...project.links, github: e.target.value } })}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={project.featured}
                  onCheckedChange={(checked) => setProject({ ...project, featured: checked })}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Project"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/projects">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featured: false,
    trending: false,
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories({ type: "blog" })
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
      const blogData = {
        ...blog,
        tags: blog.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      }
      
      const response = await api.createBlog(blogData)
      if (response.success) {
        router.push("/admin/blogs")
      }
    } catch (error) {
      console.error("Failed to create blog:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader
        title="New Blog Post"
        description="Create a new blog post"
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
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
                  value={blog.title}
                  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={blog.excerpt}
                  onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={blog.category} onValueChange={(value) => setBlog({ ...blog, category: value })}>
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
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={blog.tags}
                  onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
                  placeholder="react, javascript, web development"
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  value={blog.content}
                  onChange={(value) => setBlog({ ...blog, content: value || "" })}
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={blog.featured}
                    onCheckedChange={(checked) => setBlog({ ...blog, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="trending"
                    checked={blog.trending}
                    onCheckedChange={(checked) => setBlog({ ...blog, trending: checked })}
                  />
                  <Label htmlFor="trending">Trending</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Blog"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/blogs">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await api.getBlogs({ limit: 50 })
      if (response.success) {
        setBlogs(response.data.blogs)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      await api.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog._id !== id))
    } catch (error) {
      console.error("[v0] Failed to delete blog:", error)
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
        title="Blogs"
        description="Manage your blog posts"
        action={
          <Button asChild>
            <Link href="/admin/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              New Blog
            </Link>
          </Button>
        }
      />

      <div className="flex-1 space-y-4 p-6">
        {blogs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No blogs found. Create your first blog post.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Card key={blog._id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{blog.title}</h3>
                      {blog.featured && <Badge variant="secondary">Featured</Badge>}
                      {blog.trending && <Badge>Trending</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{blog.excerpt}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{blog.category}</span>
                      <span>{blog.readTime}</span>
                      <span>{blog.views} views</span>
                      <span>{blog.likes} likes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/blog/${blog.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/blogs/${blog._id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(blog._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.getFeaturedBlogs()
        if (response.success) {
          setBlogs(response.data.slice(0, 3))
        }
      } catch (error) {
        console.error("[v0] Failed to fetch blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading || blogs.length === 0) {
    return null
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Latest Writing</h2>
            <p className="text-lg text-muted-foreground">Thoughts on design and development</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog._id} className="group overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {blog.category}
                </Badge>

                <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-accent">{blog.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{blog.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {blog.readTime}
                  </div>
                </div>

                <Button variant="link" className="mt-4 p-0" asChild>
                  <Link href={`/blog/${blog.slug}`}>
                    Read more
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

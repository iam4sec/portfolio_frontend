"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react"
import Link from "next/link"

export default function BlogPostPage() {
  const params = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.getBlogBySlug(params.slug as string)
        if (response.success) {
          setBlog(response.data.blog)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch blog:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchBlog()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Blog post not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Badge variant="secondary" className="mb-4">
          {blog.category}
        </Badge>

        <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {blog.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(blog.publishDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {blog.readTime}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {blog.views} views
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">{blog.excerpt}</p>
          <div className="mt-8 whitespace-pre-wrap leading-relaxed">{blog.content}</div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

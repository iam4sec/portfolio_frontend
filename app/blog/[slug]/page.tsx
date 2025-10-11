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
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.getBlogBySlug(params.slug as string)
        if (response.success) {
          setBlog(response.data.blog)
          // Set related blogs if available in response
          if (response.data.recommendedBlogs) {
            setRelatedBlogs(response.data.recommendedBlogs)
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error)
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
            {new Date(blog.publishDate || blog.publishedAt).toLocaleDateString()}
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

        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  href={`/blog/${relatedBlog.slug}`}
                  className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <Badge variant="secondary" className="mb-2">
                    {relatedBlog.category}
                  </Badge>
                  <h3 className="mb-2 font-semibold group-hover:text-primary">
                    {relatedBlog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {relatedBlog.excerpt}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(relatedBlog.publishDate).toLocaleDateString()}
                    <Clock className="h-3 w-3 ml-2" />
                    {relatedBlog.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

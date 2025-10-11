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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Button variant="ghost" asChild className="mb-6 hover:bg-slate-100">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="mb-6">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              {blog.category}
            </Badge>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          <p className="text-xl leading-relaxed text-slate-600 mb-8 max-w-3xl">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blog.publishDate || blog.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{blog.views || 0} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <article className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-slate-900 prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6">
            <div className="whitespace-pre-wrap leading-relaxed">{blog.content}</div>
          </div>
        </article>

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="hover:bg-slate-100">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="mb-8 text-3xl font-bold text-slate-900">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog._id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group block bg-slate-50 rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1"
                  >
                    <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {relatedBlog.category}
                    </Badge>
                    <h3 className="mb-3 font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(relatedBlog.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{relatedBlog.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

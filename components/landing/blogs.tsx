"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"

export function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.getBlogs()
        if (response.success) {
          setBlogs(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const defaultBlogs = [
    {
      title: "Building Scalable React Applications: Best Practices for 2024",
      excerpt: "Explore modern patterns and techniques for creating maintainable React applications that scale with your team and user base.",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      image: "/placeholder.jpg",
      slug: "scalable-react-applications-2024",
      featured: true
    },
    {
      title: "The Future of Web Development: Trends to Watch",
      excerpt: "From AI-powered development tools to new JavaScript frameworks, discover what's shaping the future of web development.",
      publishedAt: "2024-01-10",
      readTime: "6 min read",
      category: "Web Development",
      image: "/placeholder.jpg",
      slug: "future-web-development-trends",
      featured: true
    },
    {
      title: "Optimizing Core Web Vitals for Better User Experience",
      excerpt: "A comprehensive guide to improving your website's performance metrics and user experience.",
      publishedAt: "2024-01-05",
      readTime: "10 min read",
      category: "Performance",
      image: "/placeholder.jpg",
      slug: "optimizing-core-web-vitals",
      featured: false
    },
    {
      title: "TypeScript Tips for React Developers",
      excerpt: "Essential TypeScript patterns and best practices for React development.",
      publishedAt: "2023-12-28",
      readTime: "7 min read",
      category: "TypeScript",
      image: "/placeholder.jpg",
      slug: "typescript-tips-react-developers",
      featured: false
    }
  ]

  if (loading) {
    return (
      <section id="blogs" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              {[1,2].map(i => (
                <div key={i} className="h-80 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const displayBlogs = blogs.length ? blogs : defaultBlogs
  const featuredBlogs = displayBlogs.filter(blog => blog.featured)
  const regularBlogs = displayBlogs.filter(blog => !blog.featured)

  return (
    <section id="blogs" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Latest Writing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Sharing insights, tutorials, and thoughts on web development, technology trends, and best practices
          </p>
        </div>

        {featuredBlogs.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredBlogs.map((blog, index) => (
              <article key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-slate-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">{blog.excerpt}</p>

                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {regularBlogs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {regularBlogs.map((blog, index) => (
              <article key={index} className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{blog.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button size="lg" variant="outline" className="group" asChild>
            <Link href="/blog">
              <BookOpen className="mr-2 w-4 h-4" />
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-200/50">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Stay Updated</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Get notified when I publish new articles about web development, technology trends, and programming best practices.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </section>
  )
}
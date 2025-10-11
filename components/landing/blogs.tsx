"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import Image from "next/image"
import SectionWrapper from "./section-wrapper"
import { motion } from "framer-motion"

const BlogsComponent = () => {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.getBlogs({ limit: 3, page: 1 })
        if (response.success && (response.data as any).blogs) {
          setBlogs((response.data as any).blogs)
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
      title: "Building Scalable React Applications",
      excerpt:
        "Explore modern patterns for creating maintainable React applications.",
      publishedAt: "2024-01-15",
      readTime: "8 min",
      category: { name: "React" },
      image: "/placeholder.jpg",
      slug: "scalable-react-applications",
    },
    {
      title: "The Future of Web Development",
      excerpt:
        "From AI tools to new frameworks, discover what's next in web dev.",
      publishedAt: "2024-01-10",
      readTime: "6 min",
      category: { name: "Web Dev" },
      image: "/placeholder.jpg",
      slug: "future-web-development",
    },
    {
      title: "Optimizing Core Web Vitals",
      excerpt:
        "A guide to improving your site's performance and user experience.",
      publishedAt: "2024-01-05",
      readTime: "10 min",
      category: { name: "Performance" },
      image: "/placeholder.jpg",
      slug: "optimizing-core-web-vitals",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-slate-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-96 bg-slate-200 dark:bg-gray-700 rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const displayBlogs = blogs.length ? blogs : defaultBlogs

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          From the Blog
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
          Sharing my thoughts on technology, development, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayBlogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <Link href={`/blog/${blog.slug}`}>
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {blog.category.name}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="mx-2">·</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  {blog.excerpt}
                </p>
                <div className="text-blue-600 dark:text-blue-400 font-semibold flex items-center group-hover:gap-3 transition-all duration-300">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Button asChild size="lg" variant="outline" className="rounded-full">
          <Link href="/blog">
            View All Posts <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export const Blogs = SectionWrapper(BlogsComponent, "blogs")
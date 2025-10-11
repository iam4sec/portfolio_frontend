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
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 dark:from-teal-900/30 dark:to-cyan-900/30 text-teal-700 dark:text-teal-300 rounded-2xl text-sm font-semibold backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50 shadow-lg mb-8">
          <span className="text-lg">📝</span>
          <span>Latest Insights</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-500 dark:from-teal-400 dark:via-cyan-400 dark:to-emerald-300 bg-clip-text text-transparent">
            From the Blog
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Sharing insights, tutorials, and thoughts on modern web development and technology trends.
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
            className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-3 hover:border-teal-300/50 dark:hover:border-teal-600/50"
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
                <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg">
                  {blog.category.name}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="mx-3">·</span>
                  <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {blog.excerpt}
                </p>
                <div className="text-teal-600 dark:text-teal-400 font-bold flex items-center group-hover:gap-3 transition-all duration-300">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20">
        <Button asChild size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold">
          <Link href="/blog">
            View All Posts <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export const Blogs = SectionWrapper(BlogsComponent, "blogs")
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getBlogs().then(response => {
      setBlogs(response.data?.blogs || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6">
        {blogs.map((blog: any) => (
          <div key={blog._id} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-sm text-gray-500">
                <span>{blog.category}</span>
                <span>{blog.readTime}</span>
                <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
              </div>
              <Link href={`/blog/${blog.slug}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Read
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
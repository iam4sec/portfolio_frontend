"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import { Loading } from "@/components/ui/loading"

export function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects({ featured: true })
        if (response.success) {
          setProjects(response.data.slice(0, 6))
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Loading className="h-64" />
        </div>
      </section>
    )
  }

  if (error || projects.length === 0) {
    return (
      <section id="projects" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Selected Work</h2>
            <p className="text-lg text-muted-foreground">Projects I've built and contributed to</p>
          </div>
          <div className="text-center text-muted-foreground">
            {error || "No projects available at the moment."}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Selected Work</h2>
          <p className="text-lg text-muted-foreground">Projects I've built and contributed to</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project._id} className="group overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
                  {project.image ? (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                </div>

                <h3 className="mb-2 text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {project.links?.live && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.links.live} target="_blank">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Live
                      </Link>
                    </Button>
                  )}
                  {project.links?.github && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.links.github} target="_blank">
                        <Github className="mr-2 h-3 w-3" />
                        Code
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

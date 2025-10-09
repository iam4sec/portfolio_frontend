"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import { FileText, FolderKanban, Mail, Users, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getDashboardStats()
        if (response.success) {
          setStats(response.data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Blogs",
      value: stats?.stats?.blogs || 0,
      icon: FileText,
      description: `${stats?.stats?.featuredBlogs || 0} featured`,
    },
    {
      title: "Total Projects",
      value: stats?.stats?.projects || 0,
      icon: FolderKanban,
      description: `${stats?.stats?.featuredProjects || 0} featured`,
    },
    {
      title: "New Contacts",
      value: stats?.stats?.newContacts || 0,
      icon: Mail,
      description: `${stats?.stats?.contacts || 0} total`,
    },
    {
      title: "Subscribers",
      value: stats?.stats?.activeSubscribers || 0,
      icon: Users,
      description: `${stats?.stats?.subscribers || 0} total`,
    },
  ]

  return (
    <div className="flex h-full flex-col">
      <AdminHeader title="Dashboard" description="Overview of your portfolio" />

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity?.contacts?.slice(0, 5).map((contact: any) => (
                  <div
                    key={contact._id}
                    className="flex items-start justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{contact.fullName}</p>
                      <p className="text-xs text-muted-foreground">{contact.subject}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        contact.status === "new" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>
                )) || <p className="text-sm text-muted-foreground">No recent contacts</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Monthly Contacts</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{stats?.analytics?.monthlyContacts || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Monthly Subscribers</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {stats?.analytics?.monthlySubscribers || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Contact Growth</span>
                  </div>
                  <span className="text-sm font-medium text-accent">{stats?.analytics?.contactGrowth || "0%"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Subscriber Growth</span>
                  </div>
                  <span className="text-sm font-medium text-accent">{stats?.analytics?.subscriberGrowth || "0%"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Mail, Users, Filter } from "lucide-react"
import { api } from "@/lib/api"

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [pagination, setPagination] = useState<any>(null)

  useEffect(() => {
    fetchSubscribers()
  }, [statusFilter])

  const fetchSubscribers = async () => {
    try {
      const params = statusFilter !== "all" ? { status: statusFilter, limit: 20 } : { limit: 20 }
      const response = await api.getSubscribers(params)
      if (response.success) {
        setSubscribers(response.data)
        setPagination(response.pagination)
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this subscriber?")) {
      try {
        await api.deleteSubscriber(id)
        setSubscribers(subscribers.filter(s => s._id !== id))
      } catch (error) {
        console.error("Failed to delete subscriber:", error)
      }
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader 
        title="Subscribers" 
        description="Manage newsletter subscribers"
        action={
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <div className="flex-1 p-6">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subscribers.map((subscriber) => (
          <Card key={subscriber._id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{subscriber.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={subscriber.status === "active" ? "default" : "secondary"}>
                    {subscriber.status}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(subscriber._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>

        {subscribers.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No subscribers found</h3>
              <p className="text-muted-foreground">Newsletter subscribers will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

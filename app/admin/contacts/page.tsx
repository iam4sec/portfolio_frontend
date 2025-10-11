"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Mail, Filter } from "lucide-react"
import { api } from "@/lib/api"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [pagination, setPagination] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchContacts()
    }
  }, [statusFilter])

  const fetchContacts = async () => {
    try {
      const params = statusFilter !== "all" ? { status: statusFilter, limit: 20 } : { limit: 20 }
      const response = await api.getContacts(params)
      if (response.success) {
        setContacts(response.data || [])
        setPagination(response.pagination)
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateContactStatus(id, status)
      setContacts(contacts.map(c => c._id === id ? { ...c, status } : c))
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this contact?")) {
      try {
        await api.deleteContact(id)
        setContacts(contacts.filter(c => c._id !== id))
      } catch (error) {
        console.error("Failed to delete contact:", error)
      }
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader 
        title="Contacts" 
        description="Manage contact form submissions"
        action={
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <div className="flex-1 p-6">

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact._id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    <h3 className="font-semibold">{contact.fullName}</h3>
                    <Badge variant={contact.status === "new" ? "default" : "secondary"}>
                      {contact.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{contact.email}</p>
                  <p className="font-medium mb-2">{contact.subject}</p>
                  <p className="text-sm text-muted-foreground mb-2">{contact.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={contact.status} onValueChange={(value) => handleStatusChange(contact._id, value)}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(contact._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>

        {contacts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No contacts found</h3>
              <p className="text-muted-foreground">Contact submissions will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

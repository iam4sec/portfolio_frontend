"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/api"

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await api.getSettings()
      if (response.success) {
        setSettings(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.updateSettings(settings)
    } catch (error) {
      console.error("Failed to save settings:", error)
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader 
        title="Settings" 
        description="Manage application settings"
        action={
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        }
      />

      <div className="flex-1 p-6">

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Site Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Site Title</Label>
              <Input
                value={settings?.site?.title || ""}
                onChange={(e) => updateSetting("site", "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={settings?.site?.description || ""}
                onChange={(e) => updateSetting("site", "description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Keywords</Label>
              <Input
                value={settings?.site?.keywords || ""}
                onChange={(e) => updateSetting("site", "keywords", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>GitHub</Label>
              <Input
                value={settings?.social?.github || ""}
                onChange={(e) => updateSetting("social", "github", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input
                value={settings?.social?.linkedin || ""}
                onChange={(e) => updateSetting("social", "linkedin", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Twitter</Label>
              <Input
                value={settings?.social?.twitter || ""}
                onChange={(e) => updateSetting("social", "twitter", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Google Analytics ID</Label>
              <Input
                value={settings?.analytics?.googleAnalytics || ""}
                onChange={(e) => updateSetting("analytics", "googleAnalytics", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Google Tag Manager ID</Label>
              <Input
                value={settings?.analytics?.googleTagManager || ""}
                onChange={(e) => updateSetting("analytics", "googleTagManager", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings?.maintenance?.enabled || false}
                onCheckedChange={(checked) => updateSetting("maintenance", "enabled", checked)}
              />
              <Label>Enable Maintenance Mode</Label>
            </div>
            <div className="space-y-2">
              <Label>Maintenance Message</Label>
              <Textarea
                value={settings?.maintenance?.message || ""}
                onChange={(e) => updateSetting("maintenance", "message", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}

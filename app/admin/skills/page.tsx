"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function SkillsPage() {
  const [skills, setSkills] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", level: "", years: "", category: "" })
  const [newCategory, setNewCategory] = useState("")
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.getSkills()
        if (response.success) {
          setSkills(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return
    
    const updatedSkills = {
      ...skills,
      categories: [...(skills?.categories || []), { title: newCategory, skills: [] }]
    }
    
    try {
      const response = await api.updateSkills(updatedSkills)
      if (response.success) {
        setSkills(response.data)
        setNewSkill({...newSkill, category: newCategory})
        setNewCategory("")
        setIsCreatingCategory(false)
      }
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  const handleAddSkill = async () => {
    if (!newSkill.name || !newSkill.level || !newSkill.years || !newSkill.category) return
    
    try {
      const response = await api.request('/profile/skills/add', {
        method: 'POST',
        body: JSON.stringify({
          categoryTitle: newSkill.category,
          skill: {
            name: newSkill.name,
            level: newSkill.level,
            years: newSkill.years
          }
        })
      })
      
      if (response.success) {
        setSkills(response.data)
        setNewSkill({ name: "", level: "", years: "", category: "" })
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error('Failed to add skill:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <AdminHeader 
        title="Skills" 
        description="Manage your technical skills and expertise"
        action={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  {!isCreatingCategory ? (
                    <div className="flex gap-2">
                      <Select value={newSkill.category} onValueChange={(value) => setNewSkill({...newSkill, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {skills?.categories?.map((cat: any) => (
                            <SelectItem key={cat.title} value={cat.title}>{cat.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" variant="outline" onClick={() => setIsCreatingCategory(true)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input 
                        placeholder="New category name" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                      <Button type="button" onClick={handleCreateCategory}>Add</Button>
                      <Button type="button" variant="outline" onClick={() => {setIsCreatingCategory(false); setNewCategory("")}}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="name">Skill Name</Label>
                  <Input 
                    id="name" 
                    value={newSkill.name} 
                    onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} 
                  />
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select value={newSkill.level} onValueChange={(value) => setNewSkill({...newSkill, level: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="years">Years of Experience</Label>
                  <Input 
                    id="years" 
                    value={newSkill.years} 
                    onChange={(e) => setNewSkill({...newSkill, years: e.target.value})} 
                    placeholder="e.g., 2+, 5+" 
                  />
                </div>
                <Button onClick={handleAddSkill} className="w-full">
                  Add Skill
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="flex-1 space-y-6 p-6">
        {skills?.categories?.map((category: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {category.title}
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.skills?.map((skill: any, skillIndex: number) => (
                  <div key={skillIndex} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{skill.level}</Badge>
                        <span className="text-sm text-muted-foreground">{skill.years}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
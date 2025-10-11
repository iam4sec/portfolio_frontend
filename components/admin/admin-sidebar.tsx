"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Trophy,
  Heart,
  Mail,
  Users,
  Settings,
  LogOut,
  Tags,
  Code,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Skills", href: "/admin/skills", icon: Code },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
  { name: "Volunteer", href: "/admin/volunteer", icon: Heart },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Subscribers", href: "/admin/subscribers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-lg font-semibold tracking-tight">Admin Panel</h1>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-3 rounded-lg bg-muted p-3">
          <p className="text-sm font-medium text-foreground">{user?.username}</p>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>
        <Button 
          variant="outline" 
          className="w-full bg-transparent" 
          onClick={async () => {
            setIsLoggingOut(true)
            await logout()
          }}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { setAuthToken, removeAuthToken, setUser, getUser, isAuthenticated, type User } from "@/lib/auth"

export function useAuth() {
  const [user, setUserState] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getUser()
    setUserState(currentUser)
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await api.login(username, password)
      if (response.success && response.data) {
        setAuthToken(response.data.accessToken, response.data.refreshToken)
        setUser(response.data.user)
        setUserState(response.data.user)
        return { success: true }
      }
      return { success: false, message: response.message || "Login failed" }
    } catch (error: any) {
      return { success: false, message: error.message || "Login failed" }
    }
  }

  const logout = async () => {
    // Immediate cleanup for better UX
    removeAuthToken()
    setUserState(null)
    router.push("/login")
    
    // API call in background
    try {
      await api.logout()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    login,
    logout,
  }
}

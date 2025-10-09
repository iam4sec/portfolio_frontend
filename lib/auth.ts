export interface User {
  id: string
  username: string
  role: string
}

export const setAuthToken = (token: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
  }
}

export const setUser = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

export const isAuthenticated = (): boolean => {
  return !!getAuthToken()
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Array<{ field: string; message: string }>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const headers = options.headers && Object.keys(options.headers).length === 0 
        ? {} // For FormData uploads, don't set default headers
        : { ...this.getAuthHeaders(), ...options.headers }
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return data
    } catch (error) {
      console.error("[v0] API request error:", error)
      throw error
    }
  }

  // Auth endpoints
  async login(username: string, password: string) {
    return this.request<{
      user: { id: string; username: string; role: string }
      token: string
      refreshToken: string
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
  }

  async logout() {
    return this.request("/auth/logout", { method: "POST" })
  }

  // Profile endpoints
  async getProfile() {
    return this.request("/profile")
  }

  async updateProfile(data: any) {
    return this.request("/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Blog endpoints
  async getBlogs(params?: {
    page?: number
    limit?: number
    category?: string
    featured?: boolean
    search?: string
  }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/blogs${queryString}`)
  }

  async getBlogBySlug(slug: string) {
    return this.request(`/blogs/${slug}`)
  }

  async createBlog(data: any) {
    return this.request("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateBlog(id: string, data: any) {
    return this.request(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteBlog(id: string) {
    return this.request(`/blogs/${id}`, { method: "DELETE" })
  }

  // Project endpoints
  async getProjects(params?: { category?: string; featured?: boolean; page?: number }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/projects${queryString}`)
  }

  async getProjectById(id: string) {
    return this.request(`/projects/${id}`)
  }

  async createProject(data: any) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, { method: "DELETE" })
  }

  // Experience endpoints
  async getExperiences() {
    return this.request("/experiences")
  }

  async getExperienceById(id: string) {
    return this.request(`/experiences/${id}`)
  }

  async createExperience(data: any) {
    return this.request("/experiences", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateExperience(id: string, data: any) {
    return this.request(`/experiences/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteExperience(id: string) {
    return this.request(`/experiences/${id}`, { method: "DELETE" })
  }

  // Education endpoints
  async getEducation() {
    return this.request("/education")
  }

  async getEducationById(id: string) {
    return this.request(`/education/${id}`)
  }

  async createEducation(data: any) {
    return this.request("/education", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateEducation(id: string, data: any) {
    return this.request(`/education/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteEducation(id: string) {
    return this.request(`/education/${id}`, { method: "DELETE" })
  }

  // Contact endpoints
  async getContacts(params?: { status?: string; page?: number; limit?: number }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/contacts${queryString}`)
  }

  async getContactById(id: string) {
    return this.request(`/contacts/${id}`)
  }

  async createContact(data: { fullName: string; email: string; subject: string; message: string }) {
    return this.request("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateContactStatus(id: string, status: string) {
    return this.request(`/contacts/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  async deleteContact(id: string) {
    return this.request(`/contacts/${id}`, { method: "DELETE" })
  }

  // Subscriber endpoints
  async getSubscribers(params?: { status?: string; page?: number; limit?: number }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/subscribers${queryString}`)
  }

  async subscribe(email: string) {
    return this.request("/subscribers", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async deleteSubscriber(id: string) {
    return this.request(`/subscribers/${id}`, { method: "DELETE" })
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request("/dashboard/stats")
  }

  // Skills endpoints
  async getSkills() {
    return this.request("/profile/skills")
  }

  async updateSkills(data: any) {
    return this.request("/profile/skills", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Blog categories and tags
  async getBlogCategories() {
    return this.request("/blogs/categories")
  }

  async getBlogTags() {
    return this.request("/blogs/tags")
  }

  async getFeaturedBlogs() {
    return this.request("/blogs/featured")
  }

  async getTrendingBlogs() {
    return this.request("/blogs/trending")
  }

  async getRelatedBlogs(slug: string) {
    return this.request(`/blogs/${slug}/related`)
  }

  async getBlogSEO(slug: string) {
    return this.request(`/blogs/${slug}/seo`)
  }

  async getBlogSitemap() {
    return this.request("/blogs/sitemap")
  }

  // Settings endpoints
  async getSettings() {
    return this.request("/settings")
  }

  async updateSettings(data: any) {
    return this.request("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Notification endpoints
  async getNotifications() {
    return this.request("/notifications")
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: "PATCH",
    })
  }

  async markAllNotificationsAsRead() {
    return this.request("/notifications/read-all", {
      method: "PATCH",
    })
  }

  // Upload endpoints
  async uploadImage(file: File) {
    const formData = new FormData()
    formData.append("image", file)
    return this.request("/upload/image", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    })
  }

  async uploadResume(file: File) {
    const formData = new FormData()
    formData.append("resume", file)
    return this.request("/upload/resume", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    })
  }

  // Subscriber endpoints
  async unsubscribe(email: string) {
    return this.request("/subscribers/unsubscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  // Achievement endpoints
  async getAchievements(params?: { category?: string; featured?: boolean }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/achievements${queryString}`)
  }

  async getAchievementById(id: string) {
    return this.request(`/achievements/${id}`)
  }

  async createAchievement(data: any) {
    return this.request("/achievements", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateAchievement(id: string, data: any) {
    return this.request(`/achievements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteAchievement(id: string) {
    return this.request(`/achievements/${id}`, { method: "DELETE" })
  }

  // Volunteer endpoints
  async getVolunteers() {
    return this.request("/volunteers")
  }

  async getVolunteerById(id: string) {
    return this.request(`/volunteers/${id}`)
  }

  async createVolunteer(data: any) {
    return this.request("/volunteers", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateVolunteer(id: string, data: any) {
    return this.request(`/volunteers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteVolunteer(id: string) {
    return this.request(`/volunteers/${id}`, { method: "DELETE" })
  }

  // Category endpoints
  async getCategories(params?: { type?: string }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/categories${queryString}`)
  }

  async createCategory(data: any) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateCategory(id: string, data: any) {
    return this.request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, { method: "DELETE" })
  }
}

export const api = new ApiClient(API_BASE_URL)

# Portfolio Backend API Specification

**Base URL:** `http://localhost:3000/api/v1`  
**Version:** v1  
**Content-Type:** `application/json`

## Authentication

Most admin endpoints require JWT authentication via `Authorization: Bearer <token>` header.

---

## 🏠 System Endpoints

### Health Check
- **GET** `/health`
- **Description:** Check server health status
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345
}
```

### Root Endpoint
- **GET** `/`
- **Description:** API information and available endpoints
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "message": "Portfolio API Server",
  "version": "v1",
  "endpoints": { /* all available endpoints */ }
}
```

---

## 🔐 Authentication Endpoints

### Login
- **POST** `/api/v1/auth/login`
- **Description:** Admin login
- **Authentication:** None
- **Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```
- **Response (Success):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "userId",
      "username": "admin",
      "role": "admin"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```
- **Response (Error):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Refresh Token
- **POST** `/api/v1/auth/refresh`
- **Description:** Refresh JWT token
- **Authentication:** None
- **Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

### Logout
- **POST** `/api/v1/auth/logout`
- **Description:** Logout user
- **Authentication:** Bearer Token
- **Request Body:** `{}`
- **Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👤 Profile Endpoints

### Get Profile
- **GET** `/api/v1/profile`
- **Description:** Get profile information
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": {
    "name": "Ariful Islam",
    "title": "Full Stack Developer",
    "role": "Senior Developer",
    "bio": "Passionate developer...",
    "email": "contact@example.com",
    "location": "San Francisco, CA",
    "avatar": "avatar_url",
    "social": {
      "github": "github_url",
      "linkedin": "linkedin_url"
    },
    "about": {
      "title": "Transforming Ideas Into Digital Reality",
      "subtitle": "A passionate solution architect with 3+ years of expertise in enterprise-level development",
      "journey": "With a strong foundation in software engineering...",
      "values": ["Excellence", "Innovation", "Collaboration", "Continuous Learning", "User-Centric"],
      "expertise": [
        {
          "title": "Frontend Development",
          "description": "Creating responsive and user-friendly interfaces using modern frameworks"
        },
        {
          "title": "Backend Architecture",
          "description": "Building scalable and maintainable server-side applications"
        }
      ]
    },
    "skills": {
      "categories": [
        {
          "title": "Frontend",
          "skills": [
            {
              "name": "React",
              "level": "Expert",
              "years": "5+"
            }
          ]
        }
      ]
    }
  }
}
```

### Update Profile
- **PUT** `/api/v1/profile`
- **Description:** Update profile information
- **Authentication:** None
- **Request Body:** (Same structure as GET response data)
- **Response:**
```json
{
  "success": true,
  "data": { /* updated profile data */ }
}
```

### Get About Section
- **GET** `/api/v1/profile/about`
- **Description:** Get about section information
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": {
    "title": "Transforming Ideas Into Digital Reality",
    "subtitle": "A passionate solution architect with 3+ years of expertise in enterprise-level development",
    "journey": "With a strong foundation in software engineering...",
    "values": ["Excellence", "Innovation", "Collaboration", "Continuous Learning", "User-Centric"],
    "expertise": [
      {
        "title": "Frontend Development",
        "description": "Creating responsive and user-friendly interfaces using modern frameworks"
      },
      {
        "title": "Backend Architecture",
        "description": "Building scalable and maintainable server-side applications"
      }
    ]
  }
}
```

### Update About Section
- **PUT** `/api/v1/profile/about`
- **Description:** Update about section information
- **Authentication:** None
- **Request Body:** (Same structure as GET response data)
- **Response:**
```json
{
  "success": true,
  "data": { /* updated about section data */ }
}
```

### Manage Expertise
- **POST** `/api/v1/profile/about/expertise/add`
- **Description:** Add a new expertise item
- **Authentication:** None
- **Request Body:**
```json
{
  "title": "Cloud Architecture",
  "description": "Designing and implementing cloud-based solutions for scalability"
}
```
- **Response:**
```json
{
  "success": true,
  "data": { /* updated expertise array */ }
}
```

- **PUT** `/api/v1/profile/about/expertise/update`
- **Description:** Update an existing expertise item
- **Authentication:** None
- **Request Body:**
```json
{
  "oldTitle": "Cloud Architecture",
  "expertise": {
    "title": "Cloud Solutions",
    "description": "Updated description here"
  }
}
```

- **DELETE** `/api/v1/profile/about/expertise/delete`
- **Description:** Delete an expertise item
- **Authentication:** None
- **Request Body:**
```json
{
  "title": "Cloud Architecture"
}
```

### Get Skills
- **GET** `/api/v1/profile/skills`
- **Description:** Get skills information
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": {
    "categories": [/* skill categories */],
    "highlights": [/* skill highlights */]
  }
}
```

### Update Skills
- **PUT** `/api/v1/profile/skills`
- **Description:** Update skills
- **Authentication:** None
- **Request Body:**
```json
{
  "categories": [/* skill categories */],
  "highlights": [/* skill highlights */]
}
```

### Add Skill
- **POST** `/api/v1/profile/skills/add`
- **Description:** Add new skill to category
- **Authentication:** None
- **Request Body:**
```json
{
  "categoryTitle": "Frontend",
  "skill": {
    "name": "Vue.js",
    "level": "Intermediate",
    "years": "2+"
  }
}
```

### Update Skill
- **PUT** `/api/v1/profile/skills/update`
- **Description:** Update existing skill
- **Authentication:** None
- **Request Body:**
```json
{
  "categoryTitle": "Frontend",
  "skillName": "React",
  "updatedSkill": {
    "name": "React",
    "level": "Expert",
    "years": "6+"
  }
}
```

### Delete Skill
- **DELETE** `/api/v1/profile/skills/delete`
- **Description:** Delete skill from category
- **Authentication:** None
- **Request Body:**
```json
{
  "categoryTitle": "Frontend",
  "skillName": "Vue.js"
}
```

---

## 📝 Blog Endpoints

### Get All Blogs
- **GET** `/api/v1/blogs`
- **Description:** Get paginated list of published blogs
- **Authentication:** None
- **Query Parameters:**
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 10, max: 50)
    - `category` (optional): Filter by category
    - `featured` (optional): Filter featured blogs (true/false)
    - `trending` (optional): Filter trending blogs (true/false)
    - `search` (optional): Search in title, excerpt, tags
    - `sort` (optional): Sort order (default: -publishDate)
- **Response:**
```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "_id": "blogId",
        "title": "Blog Title",
        "slug": "blog-title",
        "excerpt": "Blog excerpt...",
        "category": "React",
        "author": "Ariful Islam",
        "image": "image_url",
        "tags": ["react", "javascript"],
        "featured": true,
        "trending": false,
        "publishDate": "2024-01-01T00:00:00.000Z",
        "readTime": "5 min",
        "views": 150,
        "likes": 25
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalBlogs": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Get Blog by Slug
- **GET** `/api/v1/blogs/{slug}`
- **Description:** Get single blog post with full content
- **Authentication:** None
- **Parameters:**
    - `slug` (required): Blog slug
- **Response:**
```json
{
  "success": true,
  "data": {
    "blog": {
      "_id": "blogId",
      "title": "Blog Title",
      "slug": "blog-title",
      "excerpt": "Blog excerpt...",
      "content": "Full blog content in markdown...",
      "category": "React",
      "author": "Ariful Islam",
      "image": "image_url",
      "tags": ["react", "javascript"],
      "featured": true,
      "publishDate": "2024-01-01T00:00:00.000Z",
      "readTime": "5 min",
      "views": 151,
      "seo": {
        "metaTitle": "SEO Title",
        "metaDescription": "SEO Description"
      }
    },
    "recommendedBlogs": [/* 3 related blogs */]
  }
}
```

### Get Blog Categories
- **GET** `/api/v1/blogs/categories`
- **Description:** Get all blog categories
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": ["React", "Backend", "AI/ML", "Performance"]
}
```

### Get Blog Tags
- **GET** `/api/v1/blogs/tags`
- **Description:** Get popular blog tags with counts
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "react",
      "count": 15
    },
    {
      "name": "javascript",
      "count": 12
    }
  ]
}
```

### Get Featured Blogs
- **GET** `/api/v1/blogs/featured`
- **Description:** Get featured blogs (max 3)
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": [/* featured blogs without content */]
}
```

### Get Trending Blogs
- **GET** `/api/v1/blogs/trending`
- **Description:** Get trending blogs (max 5)
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": [/* trending blogs without content */]
}
```

### Get Related Blogs
- **GET** `/api/v1/blogs/{slug}/related`
- **Description:** Get blogs related to specific blog
- **Authentication:** None
- **Parameters:**
    - `slug` (required): Blog slug
- **Response:**
```json
{
  "success": true,
  "data": [/* 3 related blogs */]
}
```

### Get Blog SEO Data
- **GET** `/api/v1/blogs/{slug}/seo`
- **Description:** Get SEO metadata for blog
- **Authentication:** None
- **Parameters:**
    - `slug` (required): Blog slug
- **Response:**
```json
{
  "success": true,
  "data": {
    "title": "SEO Title",
    "description": "SEO Description",
    "keywords": ["react", "javascript"],
    "canonicalUrl": "https://domain.com/blog/slug",
    "ogTitle": "OG Title",
    "ogDescription": "OG Description",
    "ogImage": "og_image_url",
    "structuredData": {/* JSON-LD structured data */}
  }
}
```

### Get Blog Sitemap
- **GET** `/api/v1/blogs/sitemap`
- **Description:** Get sitemap data for blogs
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "url": "/blog/slug",
      "lastmod": "2024-01-01T00:00:00.000Z",
      "changefreq": "weekly",
      "priority": 0.8
    }
  ]
}
```

### Get Blog Sitemap XML
- **GET** `/api/v1/blogs/sitemap.xml`
- **Description:** Get XML sitemap for blogs
- **Authentication:** None
- **Response:** XML sitemap content

### Create Blog (Admin)
- **POST** `/api/v1/blogs`
- **Description:** Create new blog post
- **Authentication:** Bearer Token (Admin)
- **Request Body:**
```json
{
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "excerpt": "Blog excerpt...",
  "content": "Full blog content...",
  "category": "React",
  "image": "image_url",
  "tags": ["react", "javascript"],
  "featured": false,
  "trending": false,
  "published": true,
  "readTime": "5 min",
  "seo": {
    "metaTitle": "SEO Title",
    "metaDescription": "SEO Description"
  }
}
```
- **Response:**
```json
{
  "success": true,
  "data": {/* created blog data */}
}
```

### Update Blog (Admin)
- **PUT** `/api/v1/blogs/{id}`
- **Description:** Update existing blog post
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Blog ID
- **Request Body:** (Same as create blog)
- **Response:**
```json
{
  "success": true,
  "data": {/* updated blog data */}
}
```

### Delete Blog (Admin)
- **DELETE** `/api/v1/blogs/{id}`
- **Description:** Delete blog post
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Blog ID
- **Response:**
```json
{
  "success": true,
  "message": "Blog deleted"
}
```

---

## 📂 Project Endpoints

### Get All Projects
- **GET** `/api/v1/projects`
- **Description:** Get paginated list of projects
- **Authentication:** None
- **Query Parameters:**
    - `category` (optional): Filter by category
    - `featured` (optional): Filter featured projects (true/false)
    - `status` (optional): Filter by status (default: active)
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 10)
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "projectId",
      "title": "Project Title",
      "description": "Project description...",
      "category": "Full-Stack",
      "featured": true,
      "image": "image_url",
      "technologies": ["React", "Node.js"],
      "features": ["Feature 1", "Feature 2"],
      "metrics": {
        "users": "500+",
        "uptime": "99.9%",
        "duration": "3 months"
      },
      "links": {
        "live": "live_url",
        "github": "github_url",
        "demo": "demo_url"
      },
      "order": 1,
      "status": "active"
    }
  ],
  "pagination": {
    "current": 1,
    "pages": 3,
    "total": 25,
    "limit": 10
  }
}
```

### Get Project by ID
- **GET** `/api/v1/projects/{id}`
- **Description:** Get single project details
- **Authentication:** None
- **Parameters:**
    - `id` (required): Project ID
- **Response:**
```json
{
  "success": true,
  "data": {/* project details */}
}
```

### Create Project (Admin)
- **POST** `/api/v1/projects`
- **Description:** Create new project
- **Authentication:** Bearer Token (Admin)
- **Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description...",
  "category": "Full-Stack",
  "featured": false,
  "image": "image_url",
  "technologies": ["React", "Node.js"],
  "features": ["Feature 1", "Feature 2"],
  "metrics": {
    "users": "100+",
    "uptime": "99%",
    "duration": "2 months"
  },
  "links": {
    "live": "live_url",
    "github": "github_url"
  },
  "status": "active"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {/* created project */}
}
```

### Update Project (Admin)
- **PUT** `/api/v1/projects/{id}`
- **Description:** Update existing project
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Project ID
- **Request Body:** (Same as create project)
- **Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {/* updated project */}
}
```

### Delete Project (Admin)
- **DELETE** `/api/v1/projects/{id}`
- **Description:** Delete project
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Project ID
- **Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## 💼 Experience Endpoints

### Get All Experiences
- **GET** `/api/v1/experiences`
- **Description:** Get all work experiences
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "experienceId",
      "company": "TechNova Solutions",
      "position": "Senior Full Stack Developer",
      "description": "Led development of enterprise applications...",
      "startDate": "2021-06-01T00:00:00.000Z",
      "endDate": null,
      "current": true,
      "location": "San Francisco, CA",
      "technologies": ["React", "Node.js", "AWS"],
      "responsibilities": ["Responsibility 1", "Responsibility 2"],
      "achievements": ["Achievement 1", "Achievement 2"],
      "order": 1
    }
  ]
}
```

### Get Experience by ID
- **GET** `/api/v1/experiences/{id}`
- **Description:** Get single experience details
- **Authentication:** None
- **Parameters:**
    - `id` (required): Experience ID
- **Response:**
```json
{
  "success": true,
  "data": {/* experience details */}
}
```

### Create Experience (Admin)
- **POST** `/api/v1/experiences`
- **Description:** Create new experience
- **Authentication:** Bearer Token (Admin)
- **Request Body:**
```json
{
  "company": "New Company",
  "position": "Developer",
  "description": "Job description...",
  "startDate": "2024-01-01",
  "endDate": null,
  "current": true,
  "location": "Remote",
  "technologies": ["React", "Node.js"],
  "responsibilities": ["Responsibility 1"],
  "achievements": ["Achievement 1"]
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Experience created successfully",
  "data": {/* created experience */}
}
```

### Update Experience (Admin)
- **PUT** `/api/v1/experiences/{id}`
- **Description:** Update existing experience
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Experience ID
- **Request Body:** (Same as create experience)
- **Response:**
```json
{
  "success": true,
  "message": "Experience updated successfully",
  "data": {/* updated experience */}
}
```

### Delete Experience (Admin)
- **DELETE** `/api/v1/experiences/{id}`
- **Description:** Delete experience
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Experience ID
- **Response:**
```json
{
  "success": true,
  "message": "Experience deleted successfully"
}
```

---

## 🎓 Education Endpoints

### Get All Education
- **GET** `/api/v1/education`
- **Description:** Get all education entries
- **Authentication:** None
- **Query Parameters:**
    - `type` (optional): Filter by education type
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "educationId",
      "institution": "Stanford University",
      "degree": "Master of Science in Computer Science",
      "field": "Computer Science",
      "startDate": "2015-09-01T00:00:00.000Z",
      "endDate": "2017-06-30T00:00:00.000Z",
      "location": "Stanford, CA",
      "description": "Specialized in AI and ML...",
      "achievements": ["Achievement 1", "Achievement 2"],
      "order": 1
    }
  ]
}
```

### Get Education by ID
- **GET** `/api/v1/education/{id}`
- **Description:** Get single education entry
- **Authentication:** None
- **Parameters:**
    - `id` (required): Education ID (must be valid MongoDB ObjectId)
- **Response:**
```json
{
  "success": true,
  "data": {/* education details */}
}
```

### Create Education (Admin)
- **POST** `/api/v1/education`
- **Description:** Create new education entry
- **Authentication:** Bearer Token (Admin)
- **Request Body:**
```json
{
  "degree": "Bachelor of Science",
  "institution": "University Name",
  "location": "City, State",
  "startDate": "2020-09-01",
  "endDate": "2024-05-30",
  "type": "Degree",
  "field": "Computer Science",
  "description": "Education description...",
  "achievements": ["Achievement 1"]
}
```
- **Validation Rules:**
    - `degree`: Required, not empty
    - `institution`: Required, not empty
    - `location`: Required, not empty
    - `startDate`: Required, valid ISO8601 date
    - `endDate`: Optional, valid ISO8601 date
    - `type`: Optional, must be one of: Degree, Certification, Course, Training, Workshop
- **Response:**
```json
{
  "success": true,
  "data": {/* created education */}
}
```

### Update Education (Admin)
- **PUT** `/api/v1/education/{id}`
- **Description:** Update existing education entry
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Education ID (must be valid MongoDB ObjectId)
- **Request Body:** (Same as create education)
- **Response:**
```json
{
  "success": true,
  "data": {/* updated education */}
}
```

### Delete Education (Admin)
- **DELETE** `/api/v1/education/{id}`
- **Description:** Delete education entry
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Education ID (must be valid MongoDB ObjectId)
- **Response:**
```json
{
  "success": true,
  "message": "Education deleted successfully"
}
```

---

## 🏆 Achievement Endpoints

### Get All Achievements
- **GET** `/api/v1/achievements`
- **Description:** Get all achievements
- **Authentication:** None
- **Query Parameters:**
    - `category` (optional): Filter by category
    - `featured` (optional): Filter featured achievements (true/false)
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "achievementId",
      "title": "AWS Certified Solutions Architect",
      "description": "Professional certification...",
      "category": "Certification",
      "issuer": "Amazon Web Services",
      "date": "2022-04-15T00:00:00.000Z",
      "url": "certification_url",
      "image": "image_url",
      "featured": true,
      "order": 1
    }
  ]
}
```

### Create Achievement
- **POST** `/api/v1/achievements`
- **Description:** Create new achievement
- **Authentication:** None
- **Request Body:**
```json
{
  "title": "New Achievement",
  "description": "Achievement description...",
  "category": "Award",
  "issuer": "Organization Name",
  "date": "2024-01-01",
  "url": "achievement_url",
  "image": "image_url",
  "featured": false
}
```
- **Category Options:** Award, Certification, Recognition, Publication, Speaking, Other
- **Response:**
```json
{
  "success": true,
  "data": {/* created achievement */}
}
```

### Update Achievement
- **PUT** `/api/v1/achievements/{id}`
- **Description:** Update existing achievement
- **Authentication:** None
- **Parameters:**
    - `id` (required): Achievement ID
- **Request Body:** (Same as create achievement)
- **Response:**
```json
{
  "success": true,
  "data": {/* updated achievement */}
}
```

### Delete Achievement
- **DELETE** `/api/v1/achievements/{id}`
- **Description:** Delete achievement
- **Authentication:** None
- **Parameters:**
    - `id` (required): Achievement ID
- **Response:**
```json
{
  "success": true,
  "message": "Achievement deleted"
}
```

---

## 🤝 Volunteer Endpoints

### Get All Volunteers
- **GET** `/api/v1/volunteers`
- **Description:** Get all volunteer experiences
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "volunteerId",
      "organization": "Code for Good",
      "role": "Technical Mentor",
      "description": "Mentored aspiring developers...",
      "startDate": "2020-01-01T00:00:00.000Z",
      "endDate": null,
      "current": true,
      "location": "Virtual",
      "website": "organization_website",
      "skills": ["JavaScript", "React", "Mentoring"],
      "order": 1
    }
  ]
}
```

### Create Volunteer
- **POST** `/api/v1/volunteers`
- **Description:** Create new volunteer experience
- **Authentication:** None
- **Request Body:**
```json
{
  "organization": "Organization Name",
  "role": "Volunteer Role",
  "description": "Volunteer description...",
  "startDate": "2024-01-01",
  "endDate": null,
  "current": true,
  "location": "Location",
  "website": "website_url",
  "skills": ["Skill1", "Skill2"]
}
```
- **Response:**
```json
{
  "success": true,
  "data": {/* created volunteer experience */}
}
```

### Update Volunteer
- **PUT** `/api/v1/volunteers/{id}`
- **Description:** Update existing volunteer experience
- **Authentication:** None
- **Parameters:**
    - `id` (required): Volunteer ID
- **Request Body:** (Same as create volunteer)
- **Response:**
```json
{
  "success": true,
  "data": {/* updated volunteer experience */}
}
```

### Delete Volunteer
- **DELETE** `/api/v1/volunteers/{id}`
- **Description:** Delete volunteer experience
- **Authentication:** None
- **Parameters:**
    - `id` (required): Volunteer ID
- **Response:**
```json
{
  "success": true,
  "message": "Volunteer experience deleted"
}
```

---

## 📧 Contact Endpoints

### Create Contact
- **POST** `/api/v1/contacts`
- **Description:** Submit contact form
- **Authentication:** None
- **Rate Limit:** Contact rate limiter applied
- **Request Body:**
```json
{
  "fullName": "John Smith",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in discussing a project..."
}
```
- **Validation Rules:**
    - `fullName`: Required, 2-100 characters
    - `email`: Required, valid email format
    - `subject`: Required, 5-200 characters
    - `message`: Required, 10-2000 characters
- **Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you within 24 hours.",
  "data": {
    "id": "contactId",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Contacts (Admin)
- **GET** `/api/v1/contacts`
- **Description:** Get paginated list of contacts
- **Authentication:** Bearer Token (Admin)
- **Query Parameters:**
    - `status` (optional): Filter by status (new, read, replied, archived)
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 10)
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "contactId",
      "fullName": "John Smith",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "Message content...",
      "status": "new",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3
  }
}
```

### Get Contact by ID (Admin)
- **GET** `/api/v1/contacts/{id}`
- **Description:** Get single contact details
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Contact ID
- **Response:**
```json
{
  "success": true,
  "data": {/* contact details */}
}
```

### Update Contact Status (Admin)
- **PATCH** `/api/v1/contacts/{id}/status`
- **Description:** Update contact status
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Contact ID
- **Request Body:**
```json
{
  "status": "replied"
}
```
- **Status Options:** new, read, replied, archived
- **Response:**
```json
{
  "success": true,
  "message": "Contact status updated successfully",
  "data": {/* updated contact */}
}
```

### Delete Contact (Admin)
- **DELETE** `/api/v1/contacts/{id}`
- **Description:** Delete contact
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Contact ID
- **Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## 📬 Subscriber Endpoints

### Subscribe
- **POST** `/api/v1/subscribers`
- **Description:** Subscribe to newsletter
- **Authentication:** None
- **Rate Limit:** Subscriber rate limiter applied
- **Request Body:**
```json
{
  "email": "user@example.com"
}
```
- **Validation Rules:**
    - `email`: Required, valid email format
- **Response (New Subscriber):**
```json
{
  "success": true,
  "message": "Thank you for subscribing! Check your email for confirmation."
}
```
- **Response (Reactivated):**
```json
{
  "success": true,
  "message": "Welcome back! Your subscription has been reactivated."
}
```
- **Response (Already Subscribed):**
```json
{
  "success": false,
  "message": "This email is already subscribed"
}
```

### Unsubscribe
- **POST** `/api/v1/subscribers/unsubscribe`
- **Description:** Unsubscribe from newsletter
- **Authentication:** None
- **Request Body:**
```json
{
  "email": "user@example.com"
}
```
- **Response (Success):**
```json
{
  "success": true,
  "message": "You have been successfully unsubscribed"
}
```
- **Response (Not Found):**
```json
{
  "success": false,
  "message": "Subscriber not found"
}
```
- **Response (Already Unsubscribed):**
```json
{
  "success": false,
  "message": "Already unsubscribed"
}
```

### Get All Subscribers (Admin)
- **GET** `/api/v1/subscribers`
- **Description:** Get paginated list of subscribers
- **Authentication:** Bearer Token (Admin)
- **Query Parameters:**
    - `status` (optional): Filter by status (active, unsubscribed)
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 20)
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "subscriberId",
      "email": "user@example.com",
      "status": "active",
      "subscribedAt": "2024-01-01T00:00:00.000Z",
      "unsubscribedAt": null
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 8
  }
}
```

### Delete Subscriber (Admin)
- **DELETE** `/api/v1/subscribers/{id}`
- **Description:** Delete subscriber
- **Authentication:** Bearer Token (Admin)
- **Parameters:**
    - `id` (required): Subscriber ID
- **Response:**
```json
{
  "success": true,
  "message": "Subscriber deleted successfully"
}
```

---

## 📂 Category Endpoints

### Get All Categories
- **GET** `/api/v1/categories`
- **Description:** Get all categories
- **Authentication:** None
- **Query Parameters:**
    - `type` (optional): Filter by category type (blog, project)
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "categoryId",
      "name": "React",
      "slug": "react",
      "type": "blog",
      "description": "React.js tutorials and tips",
      "color": "#61dafb",
      "order": 1,
      "featured": true,
      "active": true
    }
  ]
}
```

### Create Category (Admin)
- **POST** `/api/v1/categories`
- **Description:** Create new category
- **Authentication:** Bearer Token
- **Request Body:**
```json
{
  "name": "New Category",
  "slug": "new-category",
  "type": "blog",
  "description": "Category description",
  "color": "#3b82f6",
  "featured": false
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {/* created category */}
}
```

### Update Category (Admin)
- **PUT** `/api/v1/categories/{id}`
- **Description:** Update existing category
- **Authentication:** Bearer Token
- **Parameters:**
    - `id` (required): Category ID
- **Request Body:** (Same as create category)
- **Response:**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {/* updated category */}
}
```

### Delete Category (Admin)
- **DELETE** `/api/v1/categories/{id}`
- **Description:** Delete category
- **Authentication:** Bearer Token
- **Parameters:**
    - `id` (required): Category ID
- **Response:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

## 🔔 Notification Endpoints

### Get Notifications
- **GET** `/api/v1/notifications`
- **Description:** Get notifications with unread count
- **Authentication:** Bearer Token
- **Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "_id": "notificationId",
        "title": "New Contact Message",
        "message": "You received a new contact message...",
        "type": "contact",
        "isRead": false,
        "relatedId": "contactId",
        "relatedModel": "Contact",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "unreadCount": 5
  }
}
```

### Mark Notification as Read
- **PATCH** `/api/v1/notifications/{id}/read`
- **Description:** Mark single notification as read
- **Authentication:** Bearer Token
- **Parameters:**
    - `id` (required): Notification ID
- **Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### Mark All Notifications as Read
- **PATCH** `/api/v1/notifications/read-all`
- **Description:** Mark all notifications as read
- **Authentication:** Bearer Token
- **Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## ⚙️ Settings Endpoints

### Get Settings
- **GET** `/api/v1/settings`
- **Description:** Get application settings
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": {
    "site": {
      "title": "Portfolio Title",
      "description": "Portfolio Description",
      "keywords": "keywords, here",
      "favicon": "/favicon.ico",
      "logo": "/logo.png"
    },
    "email": {
      "smtp": {
        "host": "smtp.gmail.com",
        "port": 587,
        "secure": false
      },
      "from": "contact@example.com"
    },
    "social": {
      "github": "github_url",
      "linkedin": "linkedin_url",
      "twitter": "twitter_url"
    },
    "analytics": {
      "googleAnalytics": "GA_ID",
      "googleTagManager": "GTM_ID"
    },
    "maintenance": {
      "enabled": false,
      "message": "Site under maintenance"
    }
  }
}
```

### Update Settings (Admin)
- **PUT** `/api/v1/settings`
- **Description:** Update application settings
- **Authentication:** Bearer Token (Admin)
- **Request Body:** (Same structure as GET response data)
- **Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully",
  "data": {/* updated settings */}
}
```

---

## 📊 Dashboard Endpoints

### Get Dashboard Stats
- **GET** `/api/v1/dashboard/stats`
- **Description:** Get comprehensive dashboard statistics
- **Authentication:** None
- **Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "blogs": 30,
      "projects": 12,
      "contacts": 25,
      "subscribers": 150,
      "achievements": 8,
      "volunteers": 3,
      "education": 4,
      "experiences": 5,
      "newContacts": 5,
      "activeSubscribers": 145,
      "featuredBlogs": 8,
      "featuredProjects": 4
    },
    "recentActivity": {
      "contacts": [
        {
          "_id": "contactId",
          "fullName": "John Doe",
          "email": "john@example.com",
          "subject": "Project Inquiry",
          "status": "new",
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      ],
      "subscribers": [
        {
          "_id": "subscriberId",
          "email": "user@example.com",
          "status": "active",
          "subscribedAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    },
    "analytics": {
      "monthlyContacts": 8,
      "weeklyContacts": 3,
      "monthlySubscribers": 25,
      "contactGrowth": "+15%",
      "subscriberGrowth": "+12%"
    }
  }
}
```

---

## 📤 Upload Endpoints

### Upload Image
- **POST** `/api/v1/upload/image`
- **Description:** Upload image file
- **Authentication:** None
- **Content-Type:** `multipart/form-data`
- **Request Body:**
    - `image` (file): Image file (jpg, jpeg, png, gif, webp)
    - Max size: 5MB
- **Response:**
```json
{
  "success": true,
  "data": {
    "filename": "uploaded_filename.jpg",
    "originalName": "original_photo.jpg",
    "size": 1024000,
    "url": "/uploads/uploaded_filename.jpg",
    "fullUrl": "http://localhost:3000/uploads/uploaded_filename.jpg"
  }
}
```

### Upload Resume
- **POST** `/api/v1/upload/resume`
- **Description:** Upload resume file
- **Authentication:** None
- **Content-Type:** `multipart/form-data`
- **Request Body:**
    - `resume` (file): Resume file (pdf, doc, docx)
    - Max size: 10MB
- **Response:**
```json
{
  "success": true,
  "data": {
    "filename": "resume.pdf",
    "originalName": "john_doe_resume.pdf",
    "size": 2048000,
    "url": "/uploads/resume.pdf",
    "fullUrl": "http://localhost:3000/uploads/resume.pdf"
  }
}
```

---

## 📁 Static File Serving

### Uploaded Files
- **GET** `/uploads/{path}`
- **Description:** Serve uploaded files (images, resumes, etc.)
- **Authentication:** None
- **Example:** `/uploads/images/photo.jpg`

---

## 🚨 Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (in development mode)"
}
```

---

## 🔒 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Contact Form**: 5 requests per 15 minutes per IP
- **Subscriber**: 10 requests per 15 minutes per IP

---

## 📝 Notes

1. All timestamps are in ISO 8601 format (UTC)
2. All IDs are MongoDB ObjectIds (24-character hex strings)
3. File uploads have size and type restrictions
4. Admin endpoints require valid JWT token
5. Public endpoints are cached for performance
6. CORS is configured for allowed origins
7. Request/response bodies are JSON unless specified otherwise
8. MongoDB sanitization is applied to prevent NoSQL injection
9. Helmet.js security headers are applied
10. Compression is enabled for responses
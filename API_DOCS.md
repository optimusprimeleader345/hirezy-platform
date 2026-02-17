# HIREZY Platform - API Documentation

## Overview

This document provides comprehensive API documentation for the HIREZY platform, including endpoint specifications, request/response formats, authentication, and usage examples.

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Error Handling](#error-handling)
4. [Rate Limiting](#rate-limiting)
5. [API Endpoints](#api-endpoints)
   - [User Management](#user-management)
   - [Job & Gig Management](#job--gig-management)
   - [Applications](#applications)
   - [AI Services](#ai-services)
   - [Analytics](#analytics)
   - [Communication](#communication)
6. [Webhooks](#webhooks)
7. [SDK Examples](#sdk-examples)

## API Overview

### Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### API Versioning
- **Current Version**: v1
- **Version Header**: `API-Version: 1.0.0`
- **Backward Compatibility**: Maintained for 2 major versions

### Response Format
All API responses follow a consistent format:

```json
{
  "success": boolean,
  "data": any,
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0",
    "requestId": "req_123456789"
  },
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "specific field error"
    }
  }
}
```

## Authentication

### JWT Authentication
All protected endpoints require JWT authentication via Bearer token.

#### Request Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Token Structure
```json
{
  "sub": "user_123",
  "email": "user@example.com",
  "role": "student|recruiter|admin",
  "iat": 1516239022,
  "exp": 1516325422
}
```

### API Keys (For External Integrations)
Some endpoints support API key authentication for external integrations.

#### Request Header
```
X-API-Key: your-api-key-here
```

## Error Handling

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **422**: Validation Error
- **429**: Rate Limited
- **500**: Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request data is invalid",
    "details": {
      "email": "Email format is invalid",
      "password": "Password must be at least 8 characters"
    }
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0",
    "requestId": "req_123456789"
  }
}
```

### Common Error Codes
- **VALIDATION_ERROR**: Request validation failed
- **AUTHENTICATION_ERROR**: Invalid or missing authentication
- **AUTHORIZATION_ERROR**: Insufficient permissions
- **NOT_FOUND**: Resource not found
- **RATE_LIMIT_EXCEEDED**: Too many requests
- **INTERNAL_ERROR**: Server error

## Rate Limiting

### Limits by Plan
- **Free Plan**: 100 requests/hour
- **Pro Plan**: 1000 requests/hour
- **Enterprise**: 10000 requests/hour

### Rate Limit Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

### Exceeding Limits
When rate limits are exceeded:
- **Status Code**: 429 Too Many Requests
- **Response**: Error with retry information
- **Retry-After**: Header with seconds to wait

## API Endpoints

### User Management

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student",
    "profile": {
      "bio": "Software developer",
      "skills": ["JavaScript", "React", "Node.js"],
      "experience": "3 years"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "bio": "Senior software developer",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"],
  "experience": "5 years"
}
```

#### Get Users (Admin Only)
```http
GET /api/admin/users?page=1&limit=20&role=student&search=john
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "email": "john@example.com",
        "name": "John Doe",
        "role": "student",
        "status": "active",
        "lastLogin": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

### Job & Gig Management

#### Get Jobs
```http
GET /api/gigs?page=1&limit=10&category=tech&location=remote&salary_min=50000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "gigs": [
      {
        "id": "gig_123",
        "title": "Frontend Developer",
        "description": "Build amazing user interfaces",
        "category": "technology",
        "location": {
          "type": "remote",
          "city": null,
          "country": null
        },
        "salary": {
          "min": 50000,
          "max": 80000,
          "currency": "USD"
        },
        "skills": ["React", "TypeScript", "CSS"],
        "recruiter": {
          "id": "recruiter_123",
          "name": "Tech Company",
          "avatar": "https://example.com/avatar.jpg"
        },
        "status": "active",
        "createdAt": "2024-01-01T00:00:00Z",
        "applicationsCount": 15
      }
    ],
    "filters": {
      "categories": ["technology", "design", "marketing"],
      "locations": ["remote", "onsite", "hybrid"],
      "salaries": ["0-50k", "50k-100k", "100k+"]
    }
  }
}
```

#### Create Job (Recruiter Only)
```http
POST /api/recruiter/gigs
Authorization: Bearer <recruiter_token>
Content-Type: application/json

{
  "title": "Senior React Developer",
  "description": "Build scalable React applications",
  "requirements": {
    "skills": ["React", "TypeScript", "Redux"],
    "experience": "5+ years",
    "education": "Bachelor's degree"
  },
  "location": {
    "type": "remote",
    "city": null,
    "country": "USA"
  },
  "salary": {
    "min": 80000,
    "max": 120000,
    "currency": "USD"
  },
  "benefits": ["Health insurance", "Remote work", "Stock options"],
  "type": "full-time"
}
```

#### Update Job Status
```http
PUT /api/admin/gigs/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "gigId": "gig_123",
  "status": "flagged",
  "reason": "Inappropriate content"
}
```

### Applications

#### Submit Application
```http
POST /api/student/applications
Authorization: Bearer <student_token>
Content-Type: application/json

{
  "gigId": "gig_123",
  "resumeId": "resume_123",
  "coverLetter": "I'm excited about this opportunity...",
  "answers": {
    "question_1": "My relevant experience is...",
    "question_2": "I can contribute by..."
  }
}
```

#### Get Applications (Student)
```http
GET /api/student/applications?page=1&status=pending&gig=frontend
Authorization: Bearer <student_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "app_123",
        "gig": {
          "id": "gig_123",
          "title": "Frontend Developer",
          "company": "Tech Corp"
        },
        "status": "reviewed",
        "aiScore": 85,
        "recruiterFeedback": "Strong candidate, will contact for interview",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      }
    ]
  }
}
```

#### Get Applications (Recruiter)
```http
GET /api/recruiter/applications?gig=gig_123&status=pending&sort=score
Authorization: Bearer <recruiter_token>
```

### AI Services

#### Resume Analysis
```http
POST /api/ai/resume-analyze
Authorization: Bearer <token>
Content-Type: application/json

{
  "resumeId": "resume_123",
  "jobDescription": "Looking for React developer with 3+ years experience..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "atsScore": 85,
    "strengths": ["React experience", "TypeScript knowledge"],
    "weaknesses": ["Missing specific keywords"],
    "improvements": [
      "Add more specific React keywords",
      "Include measurable achievements"
    ],
    "skills": {
      "technical": ["React", "TypeScript", "CSS"],
      "soft": ["Communication", "Teamwork"]
    }
  }
}
```

#### Job Matching
```http
POST /api/ai/job-match
Authorization: Bearer <student_token>
Content-Type: application/json

{
  "skills": ["JavaScript", "React", "Node.js"],
  "preferences": {
    "location": "remote",
    "salary_min": 60000,
    "experience_level": "mid"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "gigId": "gig_123",
        "title": "Frontend Developer",
        "matchScore": 92,
        "reasons": ["Skills match", "Location preference"],
        "company": "Tech Corp"
      }
    ],
    "insights": {
      "in_demand_skills": ["TypeScript", "React Native"],
      "salary_range": "$60k - $80k",
      "application_tips": ["Highlight React experience"]
    }
  }
}
```

#### Interview Preparation
```http
POST /api/ai/interview-prep
Authorization: Bearer <student_token>
Content-Type: application/json

{
  "jobId": "gig_123",
  "experienceLevel": "mid",
  "focusAreas": ["technical", "behavioral"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "type": "technical",
        "question": "Explain the virtual DOM in React",
        "difficulty": "medium",
        "category": "React"
      },
      {
        "type": "behavioral",
        "question": "Describe a challenging project you worked on",
        "difficulty": "easy",
        "category": "soft_skills"
      }
    ],
    "answers": [
      {
        "questionId": "q_123",
        "sampleAnswer": "The virtual DOM is...",
        "keyPoints": ["Performance", "Efficiency", "Reconciliation"]
      }
    ],
    "tips": ["Practice explaining concepts clearly", "Use the STAR method for behavioral questions"]
  }
}
```

### Analytics

#### Platform Analytics (Admin)
```http
GET /api/admin/analytics/platform?start=2024-01-01&end=2024-01-31
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 1500,
      "new": 150,
      "active": 800,
      "byRole": {
        "students": 1200,
        "recruiters": 250,
        "admins": 50
      }
    },
    "jobs": {
      "total": 500,
      "new": 50,
      "filled": 200,
      "averageSalary": 75000
    },
    "applications": {
      "total": 2500,
      "accepted": 500,
      "rejected": 1200,
      "pending": 800
    },
    "revenue": {
      "total": 50000,
      "breakdown": {
        "subscriptions": 30000,
        "jobPostings": 15000,
        "premiumFeatures": 5000
      }
    }
  }
}
```

#### User Analytics (Student)
```http
GET /api/student/analytics?timeframe=30d
Authorization: Bearer <student_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "applications": {
      "total": 15,
      "accepted": 3,
      "rejected": 8,
      "pending": 4,
      "responseRate": 73.3
    },
    "skills": {
      "assessed": ["JavaScript", "React", "Node.js"],
      "improvements": ["TypeScript", "Testing"],
      "growth": {
        "JavaScript": 85,
        "React": 78
      }
    },
    "marketInsights": {
      "inDemandSkills": ["TypeScript", "React Native"],
      "averageSalary": 75000,
      "competition": "medium"
    }
  }
}
```

### Communication

#### Send Message
```http
POST /api/communication/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipientId": "user_123",
  "content": "Hello, I'd like to discuss the job opportunity...",
  "type": "text",
  "attachments": []
}
```

#### Get Messages
```http
GET /api/communication/messages?userId=user_123&limit=20
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_123",
        "sender": {
          "id": "user_123",
          "name": "John Doe"
        },
        "content": "Hello!",
        "type": "text",
        "timestamp": "2024-01-01T12:00:00Z",
        "read": true
      }
    ],
    "unreadCount": 5
  }
}
```

#### Create Interview Schedule
```http
POST /api/recruiter/interviews
Authorization: Bearer <recruiter_token>
Content-Type: application/json

{
  "applicationId": "app_123",
  "interviewType": "technical",
  "proposedTimes": [
    "2024-01-15T10:00:00Z",
    "2024-01-15T14:00:00Z"
  ],
  "duration": 60,
  "platform": "zoom"
}
```

## Webhooks

### Webhook Events

#### Application Status Change
```json
{
  "event": "application.status_changed",
  "data": {
    "applicationId": "app_123",
    "oldStatus": "pending",
    "newStatus": "accepted",
    "gigId": "gig_123",
    "studentId": "student_123"
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "signature": "webhook_signature_here"
}
```

#### New Job Posted
```json
{
  "event": "job.created",
  "data": {
    "gigId": "gig_123",
    "title": "Frontend Developer",
    "company": "Tech Corp",
    "recruiterId": "recruiter_123"
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "signature": "webhook_signature_here"
}
```

### Webhook Configuration
```http
POST /api/webhooks
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "url": "https://your-service.com/webhooks",
  "events": ["application.status_changed", "job.created"],
  "secret": "your_webhook_secret"
}
```

## SDK Examples

### JavaScript/Node.js SDK

```javascript
class HirezyClient {
  constructor(apiKey, baseURL = 'https://api.hirezy.com') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Request failed');
    }

    return data;
  }

  // User methods
  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(data) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Job methods
  async getJobs(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/gigs?${params}`);
  }

  async createJob(jobData) {
    return this.request('/recruiter/gigs', {
      method: 'POST',
      body: JSON.stringify(jobData)
    });
  }

  // AI methods
  async analyzeResume(resumeId, jobDescription) {
    return this.request('/ai/resume-analyze', {
      method: 'POST',
      body: JSON.stringify({ resumeId, jobDescription })
    });
  }

  async getJobMatches(skills, preferences) {
    return this.request('/ai/job-match', {
      method: 'POST',
      body: JSON.stringify({ skills, preferences })
    });
  }
}

// Usage
const client = new HirezyClient('your-api-key');

// Get current user
const user = await client.getCurrentUser();
console.log(user.data.name);

// Get job matches
const matches = await client.getJobMatches(
  ['JavaScript', 'React'],
  { location: 'remote', salary_min: 60000 }
);
console.log(matches.data.matches);
```

### Python SDK

```python
import requests
import json
from typing import Dict, List, Optional

class HirezyClient:
    def __init__(self, api_key: str, base_url: str = 'https://api.hirezy.com'):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        })

    def _request(self, endpoint: str, method: str = 'GET', data: Optional[Dict] = None):
        url = f"{self.base_url}/api{endpoint}"
        
        if method.upper() == 'GET' and data:
            response = self.session.get(url, params=data)
        elif method.upper() == 'POST':
            response = self.session.post(url, json=data)
        elif method.upper() == 'PUT':
            response = self.session.put(url, json=data)
        else:
            response = self.session.request(method, url, json=data)

        response.raise_for_status()
        return response.json()

    def get_current_user(self):
        return self._request('/auth/me')

    def update_profile(self, profile_data: Dict):
        return self._request('/auth/profile', 'PUT', profile_data)

    def get_jobs(self, filters: Dict = None):
        return self._request('/gigs', 'GET', filters)

    def create_job(self, job_data: Dict):
        return self._request('/recruiter/gigs', 'POST', job_data)

    def analyze_resume(self, resume_id: str, job_description: str):
        return self._request('/ai/resume-analyze', 'POST', {
            'resumeId': resume_id,
            'jobDescription': job_description
        })

    def get_job_matches(self, skills: List[str], preferences: Dict):
        return self._request('/ai/job-match', 'POST', {
            'skills': skills,
            'preferences': preferences
        })

# Usage
client = HirezyClient('your-api-key')

# Get current user
user = client.get_current_user()
print(user['data']['name'])

# Get job matches
matches = client.get_job_matches(
    ['JavaScript', 'React'],
    {'location': 'remote', 'salary_min': 60000}
)
print(matches['data']['matches'])
```

## Best Practices

### Request Optimization
- Use pagination for large datasets
- Filter results server-side when possible
- Cache responses when appropriate
- Use bulk operations for multiple items

### Error Handling
- Implement retry logic for transient errors
- Handle rate limiting gracefully
- Validate responses before processing
- Log errors for debugging

### Security
- Never expose API keys in client-side code
- Use HTTPS for all requests
- Validate webhook signatures
- Implement proper authentication flows

### Performance
- Use efficient query parameters
- Implement client-side caching
- Batch multiple requests when possible
- Monitor API usage and performance

This API documentation provides comprehensive guidance for integrating with the HIREZY platform and building applications on top of its services.
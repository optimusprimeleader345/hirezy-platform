# HIREZY Platform - Technical Architecture

## Overview

This document provides comprehensive technical architecture documentation for the HIREZY platform, detailing system design, component interactions, data flow, and technical decisions.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Component Architecture](#component-architecture)
3. [Data Architecture](#data-architecture)
4. [API Architecture](#api-architecture)
5. [Security Architecture](#security-architecture)
6. [Performance Architecture](#performance-architecture)
7. [Deployment Architecture](#deployment-architecture)
8. [Scalability Architecture](#scalability-architecture)

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 14 App Router  │  Static Assets  │  API Routes         │
├─────────────────────────┼─────────────────┼─────────────────────┤
│                        SERVER LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  API Routes  │  Middleware  │  Authentication  │  Error Handling │
├─────────────────────────────────────────────────────────────────┤
│                        SERVICE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  AI Services  │  Business Logic  │  Data Access  │  Utilities    │
├─────────────────────────────────────────────────────────────────┤
│                        DATA LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL  │  Redis (Optional)  │  File Storage  │  External   │
│              │                   │                │  APIs        │
└─────────────────────────────────────────────────────────────────┘
```

### Architecture Patterns

**1. Layered Architecture**
- **Presentation Layer**: Next.js components and pages
- **Business Logic Layer**: Service modules and utilities
- **Data Access Layer**: Prisma ORM and database operations
- **Infrastructure Layer**: External services and integrations

**2. Service-Oriented Design**
- **AI Services**: Isolated AI feature modules
- **Business Services**: Domain-specific logic
- **Infrastructure Services**: External integrations

**3. Event-Driven Architecture**
- **Real-time Updates**: WebSocket connections
- **Background Processing**: Queue-based operations
- **Event Streaming**: User activity tracking

## Component Architecture

### Frontend Architecture

#### App Router Structure
```
src/app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Landing page
├── admin/                 # Admin dashboard
│   ├── layout.tsx        # Admin-specific layout
│   ├── dashboard/page.tsx # Admin dashboard
│   └── analytics/        # Analytics pages
├── recruiter/             # Recruiter interface
│   ├── layout.tsx        # Recruiter layout
│   ├── dashboard/page.tsx # Recruiter dashboard
│   └── applications/     # Application management
├── student/               # Student interface
│   ├── layout.tsx        # Student layout
│   ├── dashboard/page.tsx # Student dashboard
│   └── resume-ai/        # Resume optimization
└── api/                   # API routes
    ├── admin/            # Admin APIs
    ├── recruiter/        # Recruiter APIs
    └── student/          # Student APIs
```

#### Component Hierarchy
```
App
├── Layout (Root)
│   ├── Sidebar (Role-based)
│   ├── Topbar (User context)
│   └── Main Content
│       ├── Dashboard (Role-specific)
│       │   ├── Analytics Cards
│       │   ├── Charts/Visualizations
│       │   └── Recent Activity
│       ├── Features
│       │   ├── Job Matching
│       │   ├── Resume Analysis
│       │   ├── Interview Prep
│       │   └── Communication
│       └── Settings
└── Providers
    ├── QueryProvider (React Query)
    ├── AuthProvider (NextAuth)
    └── ThemeProvider (Tailwind)
```

### Backend Architecture

#### API Route Structure
```
src/app/api/
├── admin/
│   ├── users/           # User management
│   ├── analytics/       # Platform analytics
│   ├── gigs/           # Gig moderation
│   └── finance/        # Financial tracking
├── recruiter/
│   ├── gigs/           # Job posting
│   ├── applications/   # Application management
│   ├── screening/      # AI screening
│   └── communication/  # Messaging
├── student/
│   ├── applications/   # Application tracking
│   ├── resume-ai/      # Resume optimization
│   ├── career-path/    # Career guidance
│   └── market-demand/  # Market insights
└── ai-assistant/       # Universal AI assistant
```

#### Service Layer Architecture
```
src/lib/
├── ai/                 # AI service integrations
│   ├── openai-service.ts
│   ├── google-ai-service.ts
│   ├── career-intelligence-service.ts
│   └── learning-path-service.ts
├── auth.ts            # Authentication helpers
├── prisma.ts          # Database configuration
├── api/               # API client utilities
└── utils/             # General utilities
```

## Data Architecture

### Database Schema Overview

#### Core Entities
```
Users (Polymorphic)
├── Students
├── Recruiters
└── Admins

Gigs (Job Postings)
├── Basic Info (title, description, requirements)
├── Compensation (salary, benefits)
├── Location (remote, onsite, hybrid)
└── Status (active, filled, expired)

Applications
├── Student Reference
├── Gig Reference
├── Status (pending, reviewed, accepted, rejected)
└── AI Score (automated scoring)

Resumes
├── Student Reference
├── Content (parsed text)
├── Skills (extracted skills)
├── ATS Score (compatibility score)
└── Analysis (AI-generated insights)

Analytics
├── User Activity
├── Platform Metrics
├── Feature Usage
└── Performance Data
```

#### Key Relationships
```
Users (1) ──── (N) Applications
Gigs (1) ───── (N) Applications
Students (1) ── (N) Resumes
Students (1) ── (N) Applications
Recruiters (1) ─ (N) Gigs
```

### Data Flow Patterns

#### Read Operations
```
Client Request → API Route → Service Layer → Prisma ORM → PostgreSQL
     ↓              ↓              ↓              ↓            ↓
  React Query → Validation → Business Logic → Query Builder → Database
```

#### Write Operations
```
Client Request → API Route → Service Layer → Transaction → PostgreSQL
     ↓              ↓              ↓              ↓            ↓
  Form Data → Validation → Business Logic → ACID Transaction → Commit/Rollback
```

#### AI Integration Flow
```
User Input → AI Service → Prompt Engineering → External API → Response Processing
     ↓              ↓              ↓              ↓            ↓
  Text/Files → Service Layer → Structured Prompt → OpenAI/Gemini → Structured Output
```

## API Architecture

### RESTful API Design

#### Resource Endpoints
```
GET    /api/users                    # List users (admin only)
POST   /api/users                    # Create user
GET    /api/users/:id               # Get user details
PUT    /api/users/:id               # Update user
DELETE /api/users/:id               # Delete user

GET    /api/gigs                    # List gigs
POST   /api/gigs                    # Create gig (recruiter)
GET    /api/gigs/:id               # Get gig details
PUT    /api/gigs/:id               # Update gig
DELETE /api/gigs/:id               # Delete gig

GET    /api/applications            # List applications
POST   /api/applications            # Create application
GET    /api/applications/:id       # Get application details
PUT    /api/applications/:id       # Update application status
```

#### AI API Endpoints
```
POST   /api/ai/resume-analyze      # Analyze resume
POST   /api/ai/job-match           # Match jobs to skills
POST   /api/ai/interview-prep      # Generate interview questions
POST   /api/ai/career-roadmap      # Generate career path
POST   /api/ai/market-insights     # Get market trends
```

### API Response Format
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0"
  }
}
```

### Error Handling
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

## Security Architecture

### Authentication & Authorization

#### NextAuth.js Configuration
```typescript
// src/lib/auth.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Custom authentication logic
        // Role-based access control
        // Session management
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role information to JWT
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      session.user.role = token.role;
      return session;
    }
  }
};
```

#### Role-Based Access Control (RBAC)
```
Admin
├── Full system access
├── User management
├── Content moderation
└── Analytics access

Recruiter
├── Job posting
├── Application management
├── Candidate screening
└── Communication tools

Student
├── Profile management
├── Job applications
├── Resume analysis
└── Career guidance
```

### Security Measures

#### Input Validation
```typescript
// src/lib/validation.ts
export const validateUserInput = (data: any) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['student', 'recruiter', 'admin'])
  });
  return schema.parse(data);
};
```

#### Rate Limiting
```typescript
// src/middleware.ts
export const config = {
  matcher: ['/api/:path*']
};

export default async function middleware(request: NextRequest) {
  // Rate limiting logic
  // CORS handling
  // Authentication checks
}
```

#### Data Protection
- **Encryption**: Sensitive data encryption at rest and in transit
- **Sanitization**: Input sanitization to prevent XSS attacks
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **CSRF Protection**: Built-in Next.js CSRF protection

## Performance Architecture

### Caching Strategy

#### Multi-Level Caching
```
L1: Browser Cache (Static Assets)
├── Images, CSS, JavaScript
├── Cache-Control headers
└── Service Worker (PWA)

L2: CDN Cache (Global)
├── Static file distribution
├── Image optimization
└── Geographic distribution

L3: Application Cache (Redis)
├── API response caching
├── Session storage
└── AI response caching

L4: Database Cache (PostgreSQL)
├── Query result caching
├── Connection pooling
└── Index optimization
```

#### React Query Caching
```typescript
// src/lib/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3
    }
  }
});
```

### Performance Optimization

#### Code Splitting
```typescript
// Dynamic imports for route-based splitting
const Dashboard = dynamic(() => import('@/components/Dashboard'));
const Analytics = dynamic(() => import('@/components/Analytics'));
```

#### Image Optimization
```typescript
// src/components/Image.tsx
<Image
  src="/hero.jpg"
  alt="Platform hero"
  width={1200}
  height={630}
  priority
  placeholder="blur"
  blurDataURL="/placeholder.jpg"
/>
```

#### Bundle Optimization
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    gzipSize: true
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
};
```

## Deployment Architecture

### Environment Configuration

#### Multi-Environment Setup
```
Development
├── Local PostgreSQL
├── Mock AI services
├── Hot reload enabled
└── Debug logging

Staging
├── Staging database
├── Real AI services (test keys)
├── Performance monitoring
└── Automated testing

Production
├── Production database
├── Real AI services
├── Full monitoring
└── Security hardening
```

#### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/hirezy
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: hirezy
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### CI/CD Pipeline

#### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      - run: npm run test
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Scalability Architecture

### Horizontal Scaling Strategy

#### Load Balancing
```
Load Balancer
├── App Instance 1 (Node.js)
├── App Instance 2 (Node.js)
├── App Instance 3 (Node.js)
└── Health Checks
```

#### Database Scaling
```
PostgreSQL Cluster
├── Primary (Read/Write)
├── Replica 1 (Read)
├── Replica 2 (Read)
└── Connection Pooling
```

#### Caching Layer
```
Redis Cluster
├── Cache Node 1
├── Cache Node 2
├── Cache Node 3
└── Session Store
```

### Microservices Considerations

#### Future Service Decomposition
```
Current: Monolithic Next.js App
Future: Microservices Architecture
├── Auth Service
├── Job Service
├── AI Service
├── Analytics Service
├── Notification Service
└── File Service
```

#### API Gateway Pattern
```
API Gateway
├── Route to appropriate service
├── Authentication & Authorization
├── Rate Limiting
├── Request/Response Transformation
└── Monitoring & Logging
```

### Monitoring & Observability

#### Metrics Collection
```typescript
// src/lib/metrics.ts
export const metrics = {
  apiCalls: new Counter({
    name: 'api_calls_total',
    help: 'Total number of API calls',
    labelNames: ['method', 'endpoint', 'status']
  }),
  
  responseTime: new Histogram({
    name: 'response_time_seconds',
    help: 'API response time in seconds',
    labelNames: ['method', 'endpoint']
  })
};
```

#### Health Checks
```typescript
// src/app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      ai: await checkAI()
    }
  };
  
  return Response.json(health);
}
```

## Technical Decisions

### Framework Selection

**Next.js 14**
- **Reason**: Full-stack capabilities, excellent SEO, built-in optimization
- **Benefits**: App Router, Server Components, Edge Runtime support
- **Alternatives Considered**: Remix, Nuxt.js, traditional React + Express

**TypeScript**
- **Reason**: Type safety, better developer experience, maintainability
- **Benefits**: Early error detection, better IDE support, documentation
- **Alternatives Considered**: JavaScript with JSDoc, Flow

**PostgreSQL**
- **Reason**: Relational data, ACID compliance, scalability
- **Benefits**: Complex queries, transactions, mature ecosystem
- **Alternatives Considered**: MongoDB, MySQL, SQLite

### Architecture Decisions

**App Router over Pages Router**
- **Decision**: Use Next.js 14 App Router
- **Rationale**: Better performance, improved data fetching, cleaner code organization
- **Impact**: Server Components, streaming, nested layouts

**Prisma ORM**
- **Decision**: Use Prisma for database access
- **Rationale**: Type safety, excellent developer experience, migration support
- **Impact**: Reduced boilerplate, better type safety, easier maintenance

**React Query for State Management**
- **Decision**: Use React Query for server state
- **Rationale**: Built-in caching, background updates, error handling
- **Impact**: Better performance, offline support, simplified data fetching

This architecture provides a solid foundation for a scalable, maintainable, and performant enterprise application while maintaining developer productivity and code quality.
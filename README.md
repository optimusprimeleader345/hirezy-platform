<div align="center">

<img src="https://img.shields.io/badge/HIREZY-AI%20Platform-6366f1?style=for-the-badge&logo=sparkles&logoColor=white" alt="HIREZY" height="40"/>

# 🚀 HIREZY — AI-Powered Talent Intelligence Platform

**The next generation of hiring. Embedding-based matching, explainable AI scoring, and real-time recruiter intelligence.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

[**🔴 Live Demo**](https://hirezy-platform.vercel.app) · [**📖 Docs**](./AI_SCORING.md) · [**🐛 Report Bug**](.github/ISSUE_TEMPLATE/bug_report.md) · [**✨ Request Feature**](.github/ISSUE_TEMPLATE/feature_request.md)

---

</div>

## 📸 Platform Preview

> *A premium dark-mode SaaS platform connecting Students, Recruiters, and Admins through AI-driven intelligence.*

| Recruiter Dashboard | AI Alignment Analysis | Resume Strength |
|---|---|---|
| AI-ranked candidate lists | Score breakdown cards | Keyword gap detection |
| Match score badges | Natural language explanations | Improvement suggestions |

---

## 🧠 What is HIREZY?

HIREZY is a **production-ready, enterprise-grade** freelancing & career intelligence platform that replaces old-fashioned keyword matching with **semantic AI**. It connects three types of users:

- 👨‍🎓 **Students / Freelancers** — Find relevant gigs, get AI-scored for jobs, receive career roadmaps
- 🏢 **Recruiters** — Post jobs, get AI-ranked applicants, analyze resumes with a single click
- 🛡️ **Admins** — Manage the platform, review analytics, handle support tickets

---

## ⚡ Key Features

### For Recruiters
| Feature | Description |
|---|---|
| 🤖 **AI-Ranked Candidates** | Candidates ranked by weighted embedding score (semantic + skill + experience + education) |
| 🔍 **Explainable AI** | Every score comes with a natural language explanation: *"Why this candidate"* |
| 📊 **Score Breakdown Cards** | Visual breakdown: Semantic Similarity, Skill Overlap, Experience, Education |
| 📄 **Resume Strength Analyzer** | Heuristic-based analysis with missing keyword detection and improvement suggestions |
| 💬 **Candidate Messaging** | Built-in messaging system with real-time read receipts |
| 📅 **Interview Scheduling** | Schedule and manage interviews directly from the platform |

### For Students
| Feature | Description |
|---|---|
| 🎯 **Smart Job Matching** | See your AI match score for every job before applying |
| 🗺️ **Career Roadmap** | Personalized learning paths and skill development guidance |
| 🏆 **ATS Resume Optimizer** | Score your resume against job descriptions, get targeted improvements |
| 📈 **Market Intelligence** | Real-time insights on in-demand skills and salary ranges |

### For Admins
| Feature | Description |
|---|---|
| 📊 **Platform Analytics** | Full funnel analytics — applications, shortlists, hires |
| 🛡️ **Content Moderation** | Review flagged gigs and users |
| 💰 **Financial Tracking** | Transaction logs, commission management |
| 🎫 **Support Tickets** | Built-in ticketing system with admin reply support |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      HIREZY PLATFORM                            │
├─────────────────┬──────────────────┬────────────────────────────┤
│   Next.js 14    │   API Routes     │      PostgreSQL             │
│   App Router    │◄──────────────►  │      Prisma ORM             │
│   Server/Client │   Auth + RBAC    │      Migrations             │
└────────┬────────┴────────┬─────────┴────────────────────────────┘
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌─────────────────────────────────────────┐
│  Python AI      │  │         External AI Services            │
│  Matching Engine│  │  Google Gemini | OpenAI GPT-4o-mini     │
│  (FastAPI)      │  │  Resume Analysis | Interview Questions  │
│  Port 8000      │  │  Scoring Explanations | Career Advice   │
└────────┬────────┘  └─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Python AI Engine (Modular)                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐   │
│  │ EmbeddingService │  │ MatchingService  │  │ ResumeStrength│   │
│  │ all-MiniLM-L6-v2│  │ Weighted Scoring │  │ Analyzer      │   │
│  │ 384-dim vectors  │  │ NL Explanations  │  │ Keyword Gap   │   │
│  └─────────────────┘  └─────────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### AI Matching Flow

```
Recruiter posts Job  ──► Job Embedded ──────────────────────────┐
                                                                  ▼
                                                     Cosine Similarity (60%)
Student applies     ──► Candidate Embedded ──────────┤
                                                      ├─► Weighted Score (0-100%)
Job Skills vs               Skill Overlap (20%) ─────┤
Candidate Skills    ──────────────────────────────────┤
                                                      ├─► Natural Language Explanation
Experience Match            Experience (10%) ─────────┤
Education Match             Education (10%) ──────────┘
```

---

## 🤖 AI Matching Engine — Deep Dive

The heart of HIREZY is an **Embedding-Based AI Matching Engine** that replaces naive keyword matching with semantic understanding.

### Scoring Formula

```
Total Score = (Embedding Similarity × 60%)
            + (Skill Overlap        × 20%)
            + (Experience Match     × 10%)
            + (Education Match      × 10%)
```

| Factor | Weight | Technology |
|---|---|---|
| Semantic Similarity | **60%** | `all-MiniLM-L6-v2` · cosine similarity of 384-dim vectors |
| Skill Overlap | **20%** | Normalized fuzzy skill intersection |
| Experience Relevance | **10%** | Keyword heuristic against required level |
| Education Relevance | **10%** | Keyword heuristic against academic field |

### Score Labels

| Score | Label | Action |
|---|---|---|
| 90–100% | 🟢 Exceptional Match | Immediate Interview |
| 80–89% | 🟢 Strong Match | High Priority |
| 70–79% | 🟡 Good Match | Worth Considering |
| 60–69% | 🟡 Partial Match | Manual Review |
| < 60% | 🔴 Weak Match | Not Recommended |

### Explainability

Every score includes a human-readable explanation:
> *"Top-ranked candidate. React and Next.js expertise aligns precisely with job requirements. 6 years of experience and leadership background significantly exceeds expectations. PhD in CS is a major differentiator."*

> 📖 Full formula documentation: [AI_SCORING.md](./AI_SCORING.md)

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Server/client rendering, SEO optimization |
| **TypeScript** | Full type safety across the codebase |
| **TailwindCSS** | Responsive, utility-first styling |
| **Framer Motion** | Smooth micro-animations and transitions |
| **Lucide React** | Consistent icon system |

### Backend
| Technology | Purpose |
|---|---|
| **Next.js API Routes** | REST API endpoints with authentication |
| **Prisma ORM** | Type-safe database access |
| **PostgreSQL** | Primary relational database |
| **NextAuth.js** | Authentication with role-based access |

### AI Services
| Technology | Purpose |
|---|---|
| **Python + FastAPI** | High-performance AI microservice (port 8000) |
| **sentence-transformers** | `all-MiniLM-L6-v2` — lightweight semantic embeddings |
| **Google Gemini 1.5 Flash** | Resume analysis, interview questions, career advice |
| **OpenAI GPT-4o-mini** | ATS scoring, resume optimization |

---

## 📁 Project Structure

```
hirezy-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin dashboard
│   │   ├── recruiter/          # Recruiter interface
│   │   ├── student/            # Student interface
│   │   └── api/                # API route handlers
│   ├── components/
│   │   ├── admin/              # Admin-specific UI
│   │   ├── recruiter/          # Recruiter components
│   │   │   ├── ApplicantDetail.tsx   # AI Alignment card, score breakdown
│   │   │   └── ApplicantList.tsx     # AI ranked list with match badges
│   │   ├── student/            # Student components
│   │   └── ui/                 # Base UI library (Button, Card, etc.)
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── embedding_service.py     # Vector embedding generation
│   │   │   ├── matching_service.py      # Weighted AI scoring
│   │   │   ├── google-ai-service.ts     # Gemini integration
│   │   │   ├── openai-service.ts        # OpenAI integration
│   │   │   └── python-ai-bridge.ts      # Next.js → Python bridge
│   │   └── prisma.ts           # Prisma client singleton
│   └── types/                  # TypeScript type definitions
├── python_ai/
│   ├── main.py                 # FastAPI entry point
│   ├── requirements.txt        # Python dependencies
│   ├── services/
│   │   ├── embedding_service.py     # Sentence-transformers model
│   │   ├── matching_service.py      # Weighted scoring + explanation
│   │   └── resume_strength.py       # Resume heuristic analyzer
│   └── tests/
│       └── test_services.py         # 15 pytest unit tests
├── prisma/
│   └── schema.prisma           # Database schema
├── AI_SCORING.md               # AI scoring formula documentation
├── .env.example                # Environment variable template
└── README.md                   # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0+ (LTS)
- **Python** 3.9+
- **PostgreSQL** 15.x

### 1. Clone & Install

```bash
git clone https://github.com/optimusprimeleader345/hirezy-platform.git
cd hirezy-platform
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local and fill in your values
```

**Required variables:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/hirezy"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_AI_API_KEY="your-google-ai-key"
OPENAI_API_KEY="sk-your-openai-key"
PYTHON_AI_SERVICE_URL="http://localhost:8000"
```

### 3. Database Setup

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Start Python AI Engine

```bash
cd python_ai
pip install -r requirements.txt
python main.py
# → Python AI service starts on http://localhost:8000
```

### 5. Start Next.js App

```bash
# In a new terminal from project root
npm run dev
# → App starts on http://localhost:3000
```

### Demo Credentials (Development Only)
| Role | Email | Password |
|---|---|---|
| Student | student@example.com | password123 |
| Recruiter | recruiter@example.com | password123 |
| Admin | admin@example.com | password123 |

---

## 🧪 Running Tests

```bash
# Python AI service unit tests (15 tests)
cd python_ai
pytest tests/test_services.py -v

# Next.js type checks
npm run type-check

# Lint
npm run lint
```

---

## 🔌 API Reference

### Python AI Engine (port 8000)

| Endpoint | Method | Description |
|---|---|---|
| `/match` | `POST` | Calculate weighted AI match score |
| `/analyze-resume` | `POST` | Resume strength analysis + keyword gaps |
| `/health` | `GET` | Service health check |

### Next.js API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/job-match/calculate` | `POST` | Calculate job-student match |
| `/api/recruiter/ranked-candidates` | `GET` | AI-ranked candidates for a job |
| `/api/recruiter/ai/candidate-scoring` | `POST` | Full candidate assessment |
| `/api/recruiter/ai/resume-analyzer` | `POST` | Deep resume analysis |

---

## 🚢 Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel --prod
```

### Python AI Engine (Railway / Render / Docker)
```bash
# Docker
docker build -t hirezy-ai ./python_ai
docker run -p 8000:8000 hirezy-ai
```

Set `PYTHON_AI_SERVICE_URL` in your Vercel environment variables to point to your deployed Python service.

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 📬 Support

- 🐛 **Bugs**: [Open an Issue](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 **Ideas**: [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)
- 💬 **Questions**: [GitHub Discussions](https://github.com/optimusprimeleader345/hirezy-platform/discussions)

---

<div align="center">

**Built with ❤️ for the next generation of talent and hiring professionals**

⭐ **If this project helped you, please give it a star!** ⭐

</div>
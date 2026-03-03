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

[**🔴 Live Demo**](https://hirezy-platform.vercel.app) · [**📖 AI Scoring Docs**](../AI_SCORING.md) · [**🐛 Report Bug**](ISSUE_TEMPLATE/bug_report.md) · [**✨ Request Feature**](ISSUE_TEMPLATE/feature_request.md)

---

</div>

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
| 🔍 **Explainable AI** | Every score includes a natural language explanation: *"Why this candidate"* |
| 📊 **Score Breakdown Cards** | Visual: Semantic Similarity, Skill Overlap, Experience, Education |
| 📄 **Resume Strength Analyzer** | Heuristic analysis with missing keyword detection and improvement suggestions |
| 💬 **Candidate Messaging** | Built-in messaging with real-time read receipts |
| 📅 **Interview Scheduling** | Schedule and manage interviews from the platform |

### For Students
| Feature | Description |
|---|---|
| 🎯 **Smart Job Matching** | See your AI match score for every job before applying |
| 🗺️ **Career Roadmap** | Personalized learning paths and skill development guidance |
| 🏆 **ATS Resume Optimizer** | Score your resume against job descriptions |
| 📈 **Market Intelligence** | Real-time insights on in-demand skills and salary ranges |

### For Admins
| Feature | Description |
|---|---|
| 📊 **Platform Analytics** | Full funnel analytics — applications, shortlists, hires |
| 🛡️ **Content Moderation** | Review flagged gigs and users |
| 💰 **Financial Tracking** | Transaction logs and commission management |
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
Student applies     ──► Candidate Embedded ──► Cosine Similarity (60%)
                                                      │
Job Skills vs Candidate Skills ──────────► Skill Overlap (20%)  ├─► Score + Explanation
                                                      │
Experience Match ────────────────────────────────► Exp (10%)    │
Education Match ─────────────────────────────────► Edu (10%) ───┘
```

---

## 🤖 AI Matching Engine

### Scoring Formula

```
Total Score = (Embedding Similarity × 60%)
            + (Skill Overlap        × 20%)
            + (Experience Match     × 10%)
            + (Education Match      × 10%)
```

### Score Labels

| Score | Label | Recommended Action |
|---|---|---|
| 90–100% | 🟢 Exceptional Match | Immediate Interview |
| 80–89% | 🟢 Strong Match | High Priority |
| 70–79% | 🟡 Good Match | Worth Considering |
| 60–69% | 🟡 Partial Match | Manual Review |
| < 60% | 🔴 Weak Match | Not Recommended |

### Explainability Example
> *"Top-ranked candidate. React and Next.js expertise aligns precisely with job requirements. 6 years of experience and leadership background significantly exceeds expectations. PhD in CS is a major differentiator."*

📖 Full formula docs: [AI_SCORING.md](../AI_SCORING.md)

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14, TypeScript, TailwindCSS, Framer Motion, Lucide React |
| **Backend** | Next.js API Routes, Prisma ORM, PostgreSQL, NextAuth.js |
| **AI Engine** | Python 3.9+, FastAPI, sentence-transformers (`all-MiniLM-L6-v2`) |
| **LLMs** | Google Gemini 1.5 Flash, OpenAI GPT-4o-mini |

---

## 📁 Project Structure

```
hirezy-platform/
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── admin/                   # Admin dashboard
│   │   ├── recruiter/               # Recruiter interface
│   │   ├── student/                 # Student interface
│   │   └── api/                     # API routes
│   ├── components/
│   │   ├── recruiter/
│   │   │   ├── ApplicantDetail.tsx  # AI Alignment card, score breakdown
│   │   │   └── ApplicantList.tsx    # AI-ranked list with match badges
│   │   └── ui/                      # Base UI library
│   └── lib/
│       └── ai/
│           ├── python-ai-bridge.ts  # Next.js → Python service bridge
│           ├── google-ai-service.ts # Gemini integration
│           └── openai-service.ts    # OpenAI integration
├── python_ai/
│   ├── main.py                      # FastAPI entry point (port 8000)
│   ├── requirements.txt
│   ├── services/
│   │   ├── embedding_service.py     # Sentence-transformers model
│   │   ├── matching_service.py      # Weighted scoring + explanations
│   │   └── resume_strength.py       # Heuristic resume analyzer
│   └── tests/
│       └── test_services.py         # 15 pytest unit tests
├── prisma/schema.prisma             # Database schema
├── AI_SCORING.md                    # AI scoring formula documentation
└── .env.example                     # Environment variable template
```

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/optimusprimeleader345/hirezy-platform.git
cd hirezy-platform
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
# Fill in your values
```

**Key variables:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/hirezy"
NEXTAUTH_SECRET="your-secret"
GOOGLE_AI_API_KEY="your-google-ai-key"
OPENAI_API_KEY="sk-your-openai-key"
PYTHON_AI_SERVICE_URL="http://localhost:8000"
```

### 3. Database
```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Start Python AI Engine
```bash
cd python_ai
pip install -r requirements.txt
python main.py
# Starts on http://localhost:8000
```

### 5. Start Next.js
```bash
npm run dev
# App on http://localhost:3000
```

### Demo Credentials
| Role | Email | Password |
|---|---|---|
| Student | student@example.com | password123 |
| Recruiter | recruiter@example.com | password123 |
| Admin | admin@example.com | password123 |

---

## 🧪 Tests

```bash
# Python AI unit tests (15 tests)
cd python_ai
pytest tests/test_services.py -v

# TypeScript checks
npm run type-check
npm run lint
```

---

## 🔌 API Reference

### Python AI Engine (port 8000)
| Endpoint | Method | Description |
|---|---|---|
| `/match` | `POST` | Weighted AI match score |
| `/analyze-resume` | `POST` | Resume strength + keyword gaps |
| `/health` | `GET` | Health check |

### Next.js API
| Endpoint | Method | Description |
|---|---|---|
| `/api/job-match/calculate` | `POST` | Job-student match score |
| `/api/recruiter/ranked-candidates` | `GET` | AI-ranked candidates for a job |
| `/api/recruiter/ai/candidate-scoring` | `POST` | Full candidate assessment |
| `/api/recruiter/ai/resume-analyzer` | `POST` | Deep resume analysis |

---

## 🚢 Deployment

**Next.js** → [Vercel](https://vercel.com)
```bash
vercel --prod
```

**Python AI Engine** → Railway / Render / Docker
```bash
docker build -t hirezy-ai ./python_ai
docker run -p 8000:8000 hirezy-ai
```

Set `PYTHON_AI_SERVICE_URL` in Vercel env vars to your deployed Python service URL.

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m 'feat: add something'`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License — see [LICENSE](../LICENSE) for details.

---

## 📬 Support

- 🐛 **Bugs**: [Open an Issue](ISSUE_TEMPLATE/bug_report.md)
- 💡 **Ideas**: [Feature Request](ISSUE_TEMPLATE/feature_request.md)
- 💬 **Questions**: [GitHub Discussions](https://github.com/optimusprimeleader345/hirezy-platform/discussions)

---

<div align="center">

**Built with ❤️ for the next generation of talent and hiring professionals**

⭐ **Star this repo if it helped you!** ⭐

</div>
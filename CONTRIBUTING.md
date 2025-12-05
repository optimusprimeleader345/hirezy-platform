# 🤝 Contributing to HIREZY

Welcome! We're excited that you're interested in contributing to HIREZY. This document outlines the guidelines and processes for contributing to our revolutionary student career platform.

## 🌟 Mission Statement

**HIREZY empowers the next generation of talent by combining advanced AI, gamification, and market intelligence to revolutionize how students discover, prepare for, and succeed in their careers.**

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Contributions](#submitting-contributions)
- [Community Guidelines](#community-guidelines)

## 📖 Code of Conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please review it carefully before contributing.

**Key principles:**
- 🤝 **Respect** - Treat all community members with respect and kindness
- 🌈 **Inclusivity** - Value diverse perspectives and experiences
- 🔄 **Collaboration** - Work together constructively towards common goals
- 📊 **Meritocracy** - Contributions are valued based on technical merit

## 🚀 Getting Started

### Prerequisites

```bash
# Required software
Node.js 18+              # JavaScript runtime
PostgreSQL 15+           # Database
Git                      # Version control
npm or yarn             # Package manager

# Recommended IDE
Visual Studio Code      # Primary development environment
```

### Quick Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hirezy.git
   cd hirezy
   ```

3. **Set up the development environment**
   ```bash
   # Install dependencies
   npm install

   # Copy and configure environment (.env.example provided)
   cp .env.example .env.local

   # Set up the database
   npx prisma generate
   npx prisma db push

   # Optional: Seed the database
   npx prisma db seed
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### 1. Choose an Issue

- Browse [open issues](https://github.com/hirezy/hirezy/issues) with `good first issue` labels
- Check [feature requests](https://github.com/hirezy/hirezy/discussions) for inspiration
- Review [development roadmap](./ROADMAP.md) for strategic priorities

### 2. Create a Branch

```bash
# Create feature branch from main
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b bugfix/issue-number-description

# Or for documentation
git checkout -b docs/add-contribution-guide
```

### 3. Make Your Changes

- Write clear, focused commits
- Include tests for new functionality
- Update documentation as needed
- Follow our coding standards

### 4. Test Your Changes

```bash
# Run all tests
npm run test

# Run linting
npm run lint

# Check TypeScript compliance
npm run typecheck

# Run e2e tests (if applicable)
npm run test:e2e
```

### 5. Submit a Pull Request

- Create a clear PR title and description
- Reference related issues
- Provide testing instructions
- Request reviews from maintainers

## 💻 Coding Standards

### TypeScript Best Practices

```typescript
// ✅ Good: Explicit typing with interfaces
interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

// ✅ Good: Function signatures
export async function getUserById(id: string): Promise<User | null> {
  // Implementation
}

// ❌ Bad: Any types without good reason
function processData(data: any) { // Don't do this
```

### Component Structure

```typescript
// ✅ Good: Clear component structure
export function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="user-dashboard">
      <Header user={user} />
      <DashboardContent user={user} />
    </div>
  )
}
```

### Naming Conventions

```typescript
// ✅ Components: PascalCase
export function UserProfileCard() { }

// ✅ Functions: camelCase
export function formatUserName(firstName: string, lastName: string) { }

// ✅ Files: kebab-case
// user-profile-card.tsx
// format-user-name.ts

// ✅ API routes: kebab-case folders
// /api/user/profile/route.ts
// /api/jobs/matching/route.ts
```

### CSS/Styling Guidelines

```typescript
// ✅ Use Tailwind CSS utility classes
<div className="bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 transition-colors">

// ✅ Custom component styles in CSS modules
// For complex animations or custom designs
<style jsx>{`
  .custom-animation {
    animation: slide-in 0.3s ease-out;
  }
`}</style>
```

## 🧪 Testing Guidelines

### Unit Tests

```typescript
// ✅ Good: Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'
import { JobCard } from './job-card'

describe('JobCard', () => {
  it('displays job title and company', () => {
    const jobData = { title: 'Software Engineer', company: 'Tech Corp' }

    render(<JobCard job={jobData} />)

    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Tech Corp')).toBeInTheDocument()
  })
})
```

### API Testing

```typescript
// ✅ Good: API route testing
import { POST } from './route'

describe('/api/jobs', () => {
  it('creates new job posting', async () => {
    const request = createMockRequest({
      title: 'Software Engineer',
      company: 'Tech Corp'
    })

    const response = await POST(request)
    const newJob = await response.json()

    expect(response.status).toBe(201)
    expect(newJob).toHaveProperty('id')
  })
})
```

### Testing Requirements

- **Coverage**: Aim for >80% code coverage
- **Types**: All functions must have proper TypeScript types
- **Accessibility**: Test with screen readers and keyboard navigation

### Running Tests Locally

```bash
# Run all tests once
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run e2e tests with Playwright
npm run test:e2e
```

## 📝 Commit Message Guidelines

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code styling/formatting
- **refactor**: Code restructuring
- **test**: Add/modify tests
- **chore**: Maintenance tasks

### Examples

```bash
# Feature commit
feat(student): add AI job matching dashboard

AI-powered job recommendations with compatibility scoring
and real-time notifications for new opportunities.

Closes #123

# Bug fix commit
fix(api): handle empty resume parsing

Add null checks for resume parsing to prevent crashes
when text extraction fails.

# Documentation commit
docs(readme): update deployment instructions

Add detailed Vercel and Railway deployment guides
with troubleshooting section.
```

## 🔍 Pull Request Process

### PR Template
When you submit a PR, please include:

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] 🐛 Bug fix (non-breaking change)
- [ ] ✨ New feature (non-breaking change)
- [ ] 💥 Breaking change (fix or feature)
- [ ] 📝 Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Screenshots of UI changes.

## Additional Notes
Any additional information about the changes.
```

### Review Process

1. **Automated Checks**: CI/CD runs linting, tests, and security scans
2. **Code Review**: At least one maintainer reviews your code
3. **Testing**: Reviewer tests the functionality
4. **Feedback**: Reviewer provides constructive feedback
5. **Approval**: PR approved and merged, or iterate on feedback

### Review Criteria
- ✅ Code follows established patterns
- ✅ Tests pass and coverage maintained
- ✅ Documentation updated where needed
- ✅ Performance impact considered
- ✅ Security implications reviewed

## 🎯 Areas for Contribution

### High Priority
- **AI Features**: Improve AI matching algorithms
- **Mobile App**: React Native development
- **Performance**: Code splitting and optimization
- **Testing**: Expand test coverage

### Medium Priority
- **Analytics**: Advanced metrics and insights
- **Gamification**: New achievement types and rewards
- **Internationalization**: Multi-language support
- **Accessibility**: WCAG compliance improvements

### Community Features
- **Theming**: Dark/light mode support
- **Plugins**: Extension system for custom features
- **Integrations**: Third-party service connections
- **UI Components**: Design system expansion

## 🏆 Recognition & Credits

Contributors are recognized in:
- **GitHub Contributors**: Repository contributor list
- **Monthly Updates**: Newsletter spotlight
- **Annual Recognition**: Year-end contributor awards
- **Project Authors**: Core contributor credits

**Top contributors receive:**
- 🏅 Priority feature requests
- 👕 Exclusive HIREZY merchandise
- 🎟️ Conference/event invitations
- 🌟 Beta access to premium features

## 📞 Need Help?

- **Issues**: [GitHub Issues](https://github.com/hirezy/hirezy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/hirezy/hirezy/discussions)
- **Discord**: [Community Chat](https://discord.gg/hirezy)
- **Email**: dev@hirezy.com (technical help)

## 🎉 Recent Contributors

<a href="https://github.com/hirezy/hirezy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hirezy/hirezy" />
</a>

---

## 📄 License

By contributing to HIREZY, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

**Thank you for contributing to HIREZY and helping revolutionize student careers! 🎓✨**

*Built with ❤️ for the next generation of talent*

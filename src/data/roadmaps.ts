export type Level = "Junior" | "Mid" | "Senior" | "Lead" | "Director" | "VP" | "C-Suite";

export interface SalaryRange {
  min: number;
  max: number;
  median: number;
  currency: string;
}

export interface SalaryPercentiles {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
}

export interface SkillClusters {
  core: string[];
  secondary: string[];
  softSkills: string[];
}

export interface Role {
  id: string;
  title: string;
  level: Level;
  description: string;
  requiredSkills: string[];
  skillClusters: SkillClusters;
  salaryRange: SalaryRange;
  salaryPercentiles: SalaryPercentiles;
  yearsExperience: string;
  nextRoles: string[];
  nextStepRequirements: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  roles: Role[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  accentColor: string;
  accentColorClass: string;
  glowClass: string;
  bgGradient: string;
  paths: CareerPath[];
}

export const industries: Industry[] = [
  {
    id: "tech",
    name: "Technology",
    description: "Build the future with code, systems, and innovation. From frontend to cloud architecture.",
    icon: "Monitor",
    accentColor: "#06b6d4",
    accentColorClass: "text-cyan-400",
    glowClass: "shadow-cyan-500/20",
    bgGradient: "from-cyan-500/10 via-transparent to-transparent",
    paths: [
      {
        id: "frontend",
        title: "Frontend Engineer",
        description: "Craft beautiful, performant user interfaces and web experiences.",
        roles: [
          {
            id: "fe-intern",
            title: "Frontend Intern",
            level: "Junior",
            description: "Learn the fundamentals of web development, HTML, CSS, and JavaScript. Contribute to small features and bug fixes under mentorship.",
            requiredSkills: ["HTML", "CSS", "JavaScript", "Git", "Basic React"],
            skillClusters: {
              core: ["HTML5 Semantics", "CSS Fundamentals", "JavaScript ES6+", "Basic React"],
              secondary: ["Git Basics", "Chrome DevTools", "npm/yarn", "Responsive Design"],
              softSkills: ["Curiosity", "Willingness to Learn", "Time Management"],
            },
            salaryRange: { min: 45000, max: 65000, median: 55000, currency: "USD" },
            salaryPercentiles: { p10: 40000, p25: 48000, p50: 55000, p75: 60000, p90: 68000 },
            yearsExperience: "0-1",
            nextRoles: ["fe-junior"],
            nextStepRequirements: [
              "Complete 3+ production features independently",
              "Learn TypeScript fundamentals",
              "Pass code reviews without major revisions",
              "Build a small project from scratch",
              "Understand component lifecycle and state management basics",
            ],
          },
          {
            id: "fe-junior",
            title: "Junior Frontend Engineer",
            level: "Junior",
            description: "Build UI components and pages with guidance. Write clean, maintainable code and participate in code reviews.",
            requiredSkills: ["React/Vue/Angular", "TypeScript", "CSS-in-JS", "REST APIs", "Testing Basics"],
            skillClusters: {
              core: ["React (or Vue/Angular)", "TypeScript", "CSS-in-JS / Tailwind", "REST API Integration"],
              secondary: ["Unit Testing (Jest/Vitest)", "Storybook", "Figma Reading", "Basic CI/CD"],
              softSkills: ["Communication", "Code Review Etiquette", "Self-Organization"],
            },
            salaryRange: { min: 65000, max: 90000, median: 78000, currency: "USD" },
            salaryPercentiles: { p10: 60000, p25: 70000, p50: 78000, p75: 85000, p90: 95000 },
            yearsExperience: "1-2",
            nextRoles: ["fe-mid"],
            nextStepRequirements: [
              "Own a feature end-to-end from design to deployment",
              "Mentor at least 1 intern or new hire",
              "Contribute to the component library or design system",
              "Achieve 80%+ test coverage on owned modules",
              "Present a tech topic in a team meeting",
            ],
          },
          {
            id: "fe-mid",
            title: "Mid Frontend Engineer",
            level: "Mid",
            description: "Own feature development end-to-end. Mentor juniors, optimize performance, and make architectural decisions for your domain.",
            requiredSkills: ["Advanced React", "State Management", "Performance Optimization", "Accessibility", "CI/CD", "Design Systems"],
            skillClusters: {
              core: ["Advanced React Patterns", "State Management (Redux/Zustand)", "Performance Optimization", "Accessibility (WCAG)"],
              secondary: ["Design Systems", "CI/CD Pipelines", "Bundler Configuration", "E2E Testing (Playwright/Cypress)", "Animation Libraries"],
              softSkills: ["Mentoring", "Technical Writing", "Cross-team Collaboration", "Prioritization"],
            },
            salaryRange: { min: 95000, max: 140000, median: 118000, currency: "USD" },
            salaryPercentiles: { p10: 88000, p25: 100000, p50: 118000, p75: 132000, p90: 148000 },
            yearsExperience: "3-5",
            nextRoles: ["fe-senior"],
            nextStepRequirements: [
              "Lead a complex, multi-sprint project to completion",
              "Drive a significant performance improvement (measurable metrics)",
              "Author and maintain a shared library or tool used by the team",
              "Conduct technical design reviews for peers",
              "Successfully onboard 2+ new engineers",
            ],
          },
          {
            id: "fe-senior",
            title: "Senior Frontend Engineer",
            level: "Senior",
            description: "Drive technical strategy for frontend systems. Lead complex projects, define best practices, and influence team culture.",
            requiredSkills: ["System Design", "Micro-Frontends", "Webpack/Vite Deep Dive", "Team Leadership", "Cross-functional Communication", "GraphQL"],
            skillClusters: {
              core: ["System Design & Architecture", "Micro-Frontends", "Advanced Bundling (Webpack/Vite)", "GraphQL"],
              secondary: ["SSR/SSG Strategies", "Web Workers & PWA", "Security Best Practices", "Monorepo Tooling"],
              softSkills: ["Team Leadership", "Cross-functional Communication", "Conflict Resolution", "Technical Mentorship"],
            },
            salaryRange: { min: 145000, max: 200000, median: 170000, currency: "USD" },
            salaryPercentiles: { p10: 135000, p25: 152000, p50: 170000, p75: 188000, p90: 210000 },
            yearsExperience: "5-8",
            nextRoles: ["fe-staff", "fe-lead"],
            nextStepRequirements: [
              "Define and execute a multi-quarter technical roadmap",
              "Drive adoption of a new architectural pattern across the org",
              "Be recognized as the go-to expert in a specific domain",
              "Influence hiring decisions and interview processes",
              "Publish internal or external technical content (blog, talk, RFC)",
            ],
          },
          {
            id: "fe-staff",
            title: "Staff Frontend Engineer",
            level: "Lead",
            description: "Set the technical vision across multiple teams. Solve the hardest problems and drive org-wide frontend initiatives.",
            requiredSkills: ["Architecture at Scale", "Technical Strategy", "Cross-team Leadership", "Performance at Scale", "Developer Experience"],
            skillClusters: {
              core: ["Architecture at Scale", "Technical Strategy & Vision", "Cross-team System Design", "Performance at Scale"],
              secondary: ["Developer Experience Tooling", "Build Infrastructure", "Platform Engineering", "Tech Radar Curation"],
              softSkills: ["Org-wide Influence", "Executive Communication", "Navigating Ambiguity", "Strategic Thinking"],
            },
            salaryRange: { min: 200000, max: 300000, median: 250000, currency: "USD" },
            salaryPercentiles: { p10: 185000, p25: 215000, p50: 250000, p75: 280000, p90: 320000 },
            yearsExperience: "8-12",
            nextRoles: ["fe-principal"],
            nextStepRequirements: [
              "Drive a company-wide technical initiative to completion",
              "Author the definitive architecture doc for a core system",
              "Build and ship a developer platform used by 50+ engineers",
              "Establish yourself as an industry-recognized expert",
              "Shape multi-year technical strategy with VP+ leadership",
            ],
          },
          {
            id: "fe-lead",
            title: "Frontend Engineering Manager",
            level: "Lead",
            description: "Lead a team of frontend engineers. Balance technical excellence with people management and project delivery.",
            requiredSkills: ["People Management", "Project Planning", "Hiring", "Performance Reviews", "Stakeholder Management", "Technical Vision"],
            skillClusters: {
              core: ["People Management", "Project Planning & Delivery", "Hiring & Team Building", "Performance Reviews"],
              secondary: ["Budget Forecasting", "Agile Methodologies", "OKR Setting", "Vendor Evaluation"],
              softSkills: ["Empathy", "Stakeholder Management", "Delegation", "Coaching"],
            },
            salaryRange: { min: 180000, max: 270000, median: 225000, currency: "USD" },
            salaryPercentiles: { p10: 168000, p25: 195000, p50: 225000, p75: 255000, p90: 285000 },
            yearsExperience: "7-12",
            nextRoles: ["fe-director"],
            nextStepRequirements: [
              "Grow team from N to N+4 while maintaining velocity",
              "Successfully manage a senior engineer through promotion",
              "Own and deliver a department-level initiative",
              "Establish a repeatable hiring pipeline for frontend roles",
              "Present quarterly plans to VP/Director-level stakeholders",
            ],
          },
          {
            id: "fe-principal",
            title: "Principal Frontend Engineer",
            level: "Director",
            description: "Shape the entire frontend ecosystem. Define company-wide standards and drive multi-year technical roadmaps.",
            requiredSkills: ["Industry Thought Leadership", "Company-wide Architecture", "Business Strategy Alignment", "Innovation"],
            skillClusters: {
              core: ["Company-wide Architecture", "Multi-year Roadmap Planning", "Business Strategy Alignment", "Innovation Leadership"],
              secondary: ["Open Source Strategy", "Conference Speaking", "Patent / IP Development", "Academic Partnerships"],
              softSkills: ["Industry Thought Leadership", "Board-level Communication", "Visionary Thinking", "Mentoring Leaders"],
            },
            salaryRange: { min: 280000, max: 420000, median: 350000, currency: "USD" },
            salaryPercentiles: { p10: 260000, p25: 305000, p50: 350000, p75: 395000, p90: 450000 },
            yearsExperience: "12+",
            nextRoles: [],
            nextStepRequirements: [],
          },
          {
            id: "fe-director",
            title: "Director of Engineering",
            level: "Director",
            description: "Oversee multiple engineering teams. Drive organizational strategy, resource allocation, and engineering culture.",
            requiredSkills: ["Org Design", "Budget Management", "Executive Communication", "Multi-team Strategy", "Talent Development"],
            skillClusters: {
              core: ["Org Design", "Budget & Resource Management", "Multi-team Strategy", "Talent Development"],
              secondary: ["M&A Due Diligence (Tech)", "Vendor Negotiations", "Compliance Oversight", "Data-Driven Decision Making"],
              softSkills: ["Executive Communication", "Change Management", "Culture Building", "Strategic Patience"],
            },
            salaryRange: { min: 250000, max: 400000, median: 320000, currency: "USD" },
            salaryPercentiles: { p10: 230000, p25: 275000, p50: 320000, p75: 375000, p90: 425000 },
            yearsExperience: "12+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
      {
        id: "backend",
        title: "Backend Engineer",
        description: "Design scalable systems, APIs, and data pipelines that power applications.",
        roles: [
          {
            id: "be-junior",
            title: "Junior Backend Engineer",
            level: "Junior",
            description: "Build APIs and services with guidance. Learn database design, testing, and deployment fundamentals.",
            requiredSkills: ["Python/Node/Java/Go", "SQL", "REST APIs", "Git", "Linux Basics"],
            skillClusters: {
              core: ["Python/Node.js/Java/Go", "SQL & Relational Databases", "REST API Design", "Git Workflows"],
              secondary: ["Linux CLI", "Docker Basics", "Redis/Caching Intro", "Logging & Monitoring"],
              softSkills: ["Problem Solving", "Attention to Detail", "Asking Good Questions"],
            },
            salaryRange: { min: 70000, max: 95000, median: 82000, currency: "USD" },
            salaryPercentiles: { p10: 64000, p25: 74000, p50: 82000, p75: 90000, p90: 100000 },
            yearsExperience: "0-2",
            nextRoles: ["be-mid"],
            nextStepRequirements: [
              "Design and ship a new API endpoint with full test coverage",
              "Optimize a slow database query (demonstrate before/after)",
              "Write a post-mortem for a production incident",
              "Set up a CI/CD pipeline for a service",
              "Understand service-to-service communication patterns",
            ],
          },
          {
            id: "be-mid",
            title: "Mid Backend Engineer",
            level: "Mid",
            description: "Design and implement services. Own system components and contribute to architectural decisions.",
            requiredSkills: ["Microservices", "Message Queues", "Caching", "Docker", "Cloud Services (AWS/GCP)", "Database Optimization"],
            skillClusters: {
              core: ["Microservices Architecture", "Message Queues (Kafka/RabbitMQ)", "Advanced Caching Strategies", "Cloud Services (AWS/GCP)"],
              secondary: ["Docker & Containerization", "Database Optimization", "API Gateway Patterns", "gRPC"],
              softSkills: ["System Thinking", "Code Review Leadership", "Documentation Habits"],
            },
            salaryRange: { min: 100000, max: 150000, median: 125000, currency: "USD" },
            salaryPercentiles: { p10: 92000, p25: 108000, p50: 125000, p75: 142000, p90: 158000 },
            yearsExperience: "2-5",
            nextRoles: ["be-senior"],
            nextStepRequirements: [
              "Lead the design of a new microservice from RFC to production",
              "Reduce latency or cost significantly for a core service",
              "Become the on-call lead for a critical system",
              "Mentor a junior engineer through their first quarter",
              "Author an architectural decision record (ADR) that gets adopted",
            ],
          },
          {
            id: "be-senior",
            title: "Senior Backend Engineer",
            level: "Senior",
            description: "Lead system design for large-scale distributed systems. Mentor team members and drive technical excellence.",
            requiredSkills: ["Distributed Systems", "System Design", "Kubernetes", "Observability", "Security", "Technical Leadership"],
            skillClusters: {
              core: ["Distributed Systems Design", "Kubernetes Orchestration", "Observability (Metrics/Traces/Logs)", "Security Architecture"],
              secondary: ["Service Mesh", "Chaos Engineering", "Cost Optimization", "Data Pipeline Design"],
              softSkills: ["Technical Leadership", "Cross-team Negotiation", "Mentorship Culture", "Incident Command"],
            },
            salaryRange: { min: 155000, max: 220000, median: 185000, currency: "USD" },
            salaryPercentiles: { p10: 145000, p25: 165000, p50: 185000, p75: 205000, p90: 235000 },
            yearsExperience: "5-8",
            nextRoles: ["be-staff"],
            nextStepRequirements: [
              "Architect a system handling 10x current scale",
              "Establish observability standards adopted org-wide",
              "Drive a multi-team migration or platform initiative",
              "Be the escalation point for the hardest backend problems",
              "Build consensus across teams with competing priorities",
            ],
          },
          {
            id: "be-staff",
            title: "Staff Backend Engineer",
            level: "Lead",
            description: "Drive architecture across the organization. Solve cross-cutting concerns and define engineering best practices.",
            requiredSkills: ["Architecture at Scale", "Cross-org Leadership", "Technical Strategy", "Capacity Planning"],
            skillClusters: {
              core: ["Architecture at Scale", "Cross-org Technical Strategy", "Capacity Planning", "Platform Design"],
              secondary: ["Compliance & Governance", "Build vs. Buy Analysis", "Technical Due Diligence"],
              softSkills: ["Organizational Influence", "Executive Storytelling", "Strategic Prioritization"],
            },
            salaryRange: { min: 220000, max: 340000, median: 275000, currency: "USD" },
            salaryPercentiles: { p10: 200000, p25: 240000, p50: 275000, p75: 315000, p90: 360000 },
            yearsExperience: "8+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
      {
        id: "fullstack",
        title: "Full-Stack Engineer",
        description: "Bridge frontend and backend, building complete features from database to UI.",
        roles: [
          {
            id: "fs-junior",
            title: "Junior Full-Stack Engineer",
            level: "Junior",
            description: "Work across the stack on small features. Learn both frontend and backend patterns.",
            requiredSkills: ["React/Next.js", "Node.js/Python", "SQL", "REST APIs", "Git"],
            skillClusters: {
              core: ["React / Next.js", "Node.js / Python", "SQL Databases", "REST API Design"],
              secondary: ["Git Workflows", "Docker Basics", "Basic Auth (JWT/OAuth)", "Deployment"],
              softSkills: ["Adaptability", "Breadth-First Learning", "Pragmatism"],
            },
            salaryRange: { min: 68000, max: 92000, median: 80000, currency: "USD" },
            salaryPercentiles: { p10: 62000, p25: 72000, p50: 80000, p75: 88000, p90: 97000 },
            yearsExperience: "0-2",
            nextRoles: ["fs-mid"],
            nextStepRequirements: [
              "Ship a full feature (frontend + backend + database migration)",
              "Write integration tests spanning the full stack",
              "Set up a local development environment for the team",
              "Contribute meaningful code reviews across both layers",
            ],
          },
          {
            id: "fs-mid",
            title: "Mid Full-Stack Engineer",
            level: "Mid",
            description: "Own end-to-end feature delivery. Contribute to system design and mentor juniors.",
            requiredSkills: ["Advanced React", "Server-side Rendering", "Database Design", "Docker", "Testing Strategies", "CI/CD"],
            skillClusters: {
              core: ["Advanced React / SSR / SSG", "Database Design & Migrations", "API Design Patterns", "Testing Strategies"],
              secondary: ["Docker & Docker Compose", "CI/CD Pipelines", "Caching", "Queue Systems"],
              softSkills: ["Feature Ownership", "Estimation Skills", "Stakeholder Updates"],
            },
            salaryRange: { min: 100000, max: 145000, median: 122000, currency: "USD" },
            salaryPercentiles: { p10: 92000, p25: 108000, p50: 122000, p75: 138000, p90: 152000 },
            yearsExperience: "2-5",
            nextRoles: ["fs-senior"],
            nextStepRequirements: [
              "Design and implement a new product feature end-to-end",
              "Improve system reliability (uptime, error rate)",
              "Mentor a junior through a full sprint cycle",
              "Contribute to architectural decisions at the team level",
            ],
          },
          {
            id: "fs-senior",
            title: "Senior Full-Stack Engineer",
            level: "Senior",
            description: "Lead cross-functional projects and define architectural patterns. Drive team technical direction.",
            requiredSkills: ["System Architecture", "Cloud Infrastructure", "Performance", "Security", "Team Leadership", "Product Thinking"],
            skillClusters: {
              core: ["System Architecture", "Cloud Infrastructure (AWS/GCP)", "Performance Engineering", "Security Practices"],
              secondary: ["Infrastructure as Code", "Observability", "Feature Flagging", "A/B Testing Infra"],
              softSkills: ["Product Thinking", "Team Leadership", "Technical Storytelling"],
            },
            salaryRange: { min: 150000, max: 210000, median: 178000, currency: "USD" },
            salaryPercentiles: { p10: 140000, p25: 160000, p50: 178000, p75: 198000, p90: 220000 },
            yearsExperience: "5-8",
            nextRoles: ["fs-staff"],
            nextStepRequirements: [
              "Own a product area's technical direction",
              "Lead a cross-team initiative to completion",
              "Establish reusable patterns adopted by multiple teams",
              "Drive measurable business impact through technical work",
            ],
          },
          {
            id: "fs-staff",
            title: "Staff Full-Stack Engineer",
            level: "Lead",
            description: "Set technical vision across multiple product areas. Influence company-wide engineering strategy.",
            requiredSkills: ["Architecture at Scale", "Product Strategy", "Technical Vision", "Org Influence"],
            skillClusters: {
              core: ["Architecture at Scale", "Product-Engineering Strategy", "Technical Vision", "Platform Thinking"],
              secondary: ["Build vs. Buy", "Vendor Evaluation", "Cost Modeling", "Technical Debt Strategy"],
              softSkills: ["Org Influence", "Long-term Planning", "Consensus Building"],
            },
            salaryRange: { min: 210000, max: 320000, median: 265000, currency: "USD" },
            salaryPercentiles: { p10: 195000, p25: 230000, p50: 265000, p75: 300000, p90: 340000 },
            yearsExperience: "8+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    description: "Navigate markets, manage risk, and drive financial strategy in the world's most dynamic industry.",
    icon: "TrendingUp",
    accentColor: "#10b981",
    accentColorClass: "text-emerald-400",
    glowClass: "shadow-emerald-500/20",
    bgGradient: "from-emerald-500/10 via-transparent to-transparent",
    paths: [
      {
        id: "investment-banking",
        title: "Investment Banking",
        description: "Advise companies on mergers, acquisitions, and capital markets transactions.",
        roles: [
          {
            id: "ib-analyst",
            title: "IB Analyst",
            level: "Junior",
            description: "Build financial models, create pitch books, and support deal execution. The foundational role in investment banking.",
            requiredSkills: ["Financial Modeling", "Excel/Sheets", "Valuation Methods", "Pitch Book Creation", "Accounting Fundamentals"],
            skillClusters: {
              core: ["Financial Modeling (DCF, LBO, Comps)", "Advanced Excel / Google Sheets", "Valuation Methodologies", "Accounting Fundamentals"],
              secondary: ["Pitch Book Creation", "Bloomberg Terminal", "Capital IQ / FactSet", "Industry Research"],
              softSkills: ["Work Ethic", "Attention to Detail", "Working Under Pressure", "Team Player"],
            },
            salaryRange: { min: 100000, max: 150000, median: 125000, currency: "USD" },
            salaryPercentiles: { p10: 95000, p25: 110000, p50: 125000, p75: 140000, p90: 160000 },
            yearsExperience: "0-3",
            nextRoles: ["ib-associate"],
            nextStepRequirements: [
              "Complete 2+ live deal cycles from start to close",
              "Build financial models independently without senior review",
              "Earn an MBA or equivalent graduate degree (typical path)",
              "Develop a coverage area or industry vertical expertise",
              "Manage and delegate work to incoming analysts",
            ],
          },
          {
            id: "ib-associate",
            title: "IB Associate",
            level: "Mid",
            description: "Lead analyst teams, manage client relationships, and drive deal processes. Bridge between execution and origination.",
            requiredSkills: ["Deal Structuring", "Client Management", "Team Leadership", "Advanced Modeling", "Market Analysis"],
            skillClusters: {
              core: ["Deal Structuring", "Client Relationship Management", "Advanced Financial Modeling", "Market & Sector Analysis"],
              secondary: ["Due Diligence Coordination", "Legal Documentation Review", "Regulatory Filing", "Credit Analysis"],
              softSkills: ["Team Leadership", "Client Communication", "Negotiation Basics", "Time Management"],
            },
            salaryRange: { min: 150000, max: 250000, median: 200000, currency: "USD" },
            salaryPercentiles: { p10: 140000, p25: 170000, p50: 200000, p75: 230000, p90: 270000 },
            yearsExperience: "3-5",
            nextRoles: ["ib-vp"],
            nextStepRequirements: [
              "Lead the execution of 3+ transactions",
              "Develop independent client relationships",
              "Originate a meaningful portion of deal pipeline",
              "Demonstrate strong people management abilities",
              "Build a reputation within a specific industry group",
            ],
          },
          {
            id: "ib-vp",
            title: "Vice President",
            level: "Senior",
            description: "Manage deal execution and client relationships. Develop new business and mentor junior bankers.",
            requiredSkills: ["Business Development", "Negotiation", "Industry Expertise", "Cross-border Transactions", "Regulatory Knowledge"],
            skillClusters: {
              core: ["Business Development", "Advanced Negotiation", "Industry Deep Expertise", "Cross-border Transactions"],
              secondary: ["Regulatory & Compliance Knowledge", "Risk Assessment", "Capital Markets Strategy", "Restructuring Basics"],
              softSkills: ["Relationship Building", "Strategic Thinking", "Executive Presence", "Crisis Management"],
            },
            salaryRange: { min: 250000, max: 450000, median: 350000, currency: "USD" },
            salaryPercentiles: { p10: 230000, p25: 290000, p50: 350000, p75: 420000, p90: 500000 },
            yearsExperience: "5-10",
            nextRoles: ["ib-director"],
            nextStepRequirements: [
              "Originate $50M+ in deal fees independently",
              "Build a personal network of C-suite relationships",
              "Manage and develop a team of 5+ junior bankers",
              "Close a landmark or complex transaction",
              "Develop a reputation as a trusted advisor in your sector",
            ],
          },
          {
            id: "ib-director",
            title: "Director / Executive Director",
            level: "Director",
            description: "Senior deal maker with deep industry expertise. Originate transactions and manage key client relationships.",
            requiredSkills: ["Deal Origination", "C-Suite Relationships", "Strategic Advisory", "Market Making"],
            skillClusters: {
              core: ["Deal Origination at Scale", "C-Suite Advisory", "Strategic Transaction Design", "Market Positioning"],
              secondary: ["Cross-selling Products", "Capital Allocation Advisory", "Public Market Strategy"],
              softSkills: ["Board-level Presence", "Industry Thought Leadership", "Long-term Relationship Cultivation"],
            },
            salaryRange: { min: 400000, max: 800000, median: 600000, currency: "USD" },
            salaryPercentiles: { p10: 350000, p25: 480000, p50: 600000, p75: 720000, p90: 900000 },
            yearsExperience: "10-15",
            nextRoles: ["ib-md"],
            nextStepRequirements: [
              "Build and maintain 10+ active C-suite relationships",
              "Generate consistent annual revenue exceeding targets",
              "Lead a coverage or product group",
              "Win mandates against competing banks",
              "Demonstrate firm-building contributions (recruiting, culture)",
            ],
          },
          {
            id: "ib-md",
            title: "Managing Director",
            level: "C-Suite",
            description: "Top-level dealmaker. Responsible for major client relationships, revenue targets, and firm strategy.",
            requiredSkills: ["Revenue Generation", "Firm Strategy", "Industry Thought Leadership", "Global Relationships"],
            skillClusters: {
              core: ["Revenue Generation & P&L Ownership", "Firm Strategy", "Global Client Relationships", "Market Leadership"],
              secondary: ["Regulatory Lobbying", "Joint Venture Structuring", "Public Speaking", "Media Relations"],
              softSkills: ["Industry Thought Leadership", "Gravitas", "Political Navigation", "Legacy Building"],
            },
            salaryRange: { min: 700000, max: 2000000, median: 1200000, currency: "USD" },
            salaryPercentiles: { p10: 600000, p25: 850000, p50: 1200000, p75: 1700000, p90: 2500000 },
            yearsExperience: "15+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
      {
        id: "quant",
        title: "Quantitative Finance",
        description: "Apply mathematical models to financial markets and trading strategies.",
        roles: [
          {
            id: "q-junior",
            title: "Junior Quant Analyst",
            level: "Junior",
            description: "Implement and test quantitative models. Analyze data and support strategy development.",
            requiredSkills: ["Python/R", "Statistics", "Linear Algebra", "Time Series Analysis", "SQL"],
            skillClusters: {
              core: ["Python / R Programming", "Statistics & Probability", "Linear Algebra", "Time Series Analysis"],
              secondary: ["SQL & Data Pipelines", "NumPy / Pandas", "Basic ML Models", "Bloomberg API"],
              softSkills: ["Analytical Rigor", "Research Methodology", "Intellectual Curiosity"],
            },
            salaryRange: { min: 90000, max: 140000, median: 115000, currency: "USD" },
            salaryPercentiles: { p10: 82000, p25: 100000, p50: 115000, p75: 130000, p90: 150000 },
            yearsExperience: "0-2",
            nextRoles: ["q-mid"],
            nextStepRequirements: [
              "Implement and backtest 2+ quantitative strategies",
              "Publish an internal research paper or model validation",
              "Master stochastic calculus fundamentals",
              "Build a data pipeline for a new alpha signal",
            ],
          },
          {
            id: "q-mid",
            title: "Quant Analyst",
            level: "Mid",
            description: "Develop and validate pricing models and trading strategies. Collaborate with traders and risk managers.",
            requiredSkills: ["Stochastic Calculus", "Machine Learning", "C++", "Monte Carlo Simulation", "Risk Modeling"],
            skillClusters: {
              core: ["Stochastic Calculus", "Machine Learning / Deep Learning", "C++ (Performance-Critical Code)", "Monte Carlo Simulation"],
              secondary: ["Risk Modeling (VaR, CVaR)", "Options Pricing", "Natural Language Processing", "GPU Computing"],
              softSkills: ["Cross-team Collaboration (with Traders)", "Clear Research Communication", "Skepticism & Validation"],
            },
            salaryRange: { min: 150000, max: 250000, median: 200000, currency: "USD" },
            salaryPercentiles: { p10: 135000, p25: 170000, p50: 200000, p75: 235000, p90: 275000 },
            yearsExperience: "2-5",
            nextRoles: ["q-senior"],
            nextStepRequirements: [
              "Develop a strategy that generates positive P&L in live trading",
              "Lead a research initiative from hypothesis to production",
              "Optimize model performance achieving measurable speed gains",
              "Mentor a junior quant through a research project",
            ],
          },
          {
            id: "q-senior",
            title: "Senior Quant",
            level: "Senior",
            description: "Lead research initiatives and design novel strategies. Own P&L for specific strategy books.",
            requiredSkills: ["Research Leadership", "Advanced ML/DL", "Strategy Design", "Portfolio Optimization"],
            skillClusters: {
              core: ["Research Leadership", "Advanced ML / Deep Learning", "Strategy Design & Backtesting", "Portfolio Optimization"],
              secondary: ["Alternative Data Sources", "Execution Algorithms", "Regulatory Modeling", "Cross-asset Strategies"],
              softSkills: ["Vision Setting", "Research Team Management", "P&L Accountability"],
            },
            salaryRange: { min: 250000, max: 500000, median: 375000, currency: "USD" },
            salaryPercentiles: { p10: 220000, p25: 300000, p50: 375000, p75: 460000, p90: 550000 },
            yearsExperience: "5-10",
            nextRoles: ["q-head"],
            nextStepRequirements: [
              "Own P&L for a strategy book exceeding firm benchmarks",
              "Build and lead a quant research pod of 3+ researchers",
              "Publish externally recognized research",
              "Navigate a major market regime change successfully",
            ],
          },
          {
            id: "q-head",
            title: "Head of Quant Research",
            level: "Director",
            description: "Direct the quantitative research group. Set strategy, manage talent, and drive innovation.",
            requiredSkills: ["Team Building", "Research Vision", "Business Strategy", "Regulatory Navigation"],
            skillClusters: {
              core: ["Research Group Leadership", "Research Vision & Roadmap", "Business Strategy Alignment", "Regulatory Navigation"],
              secondary: ["Technology Infrastructure Planning", "Academic Partnership", "Talent Pipeline Development"],
              softSkills: ["Talent Attraction & Retention", "Firm-wide Influence", "External Representation"],
            },
            salaryRange: { min: 500000, max: 1500000, median: 900000, currency: "USD" },
            salaryPercentiles: { p10: 420000, p25: 650000, p50: 900000, p75: 1250000, p90: 1800000 },
            yearsExperience: "10+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
      {
        id: "financial-planning",
        title: "Financial Planning & Analysis",
        description: "Drive business decisions through financial forecasting, budgeting, and strategic analysis.",
        roles: [
          {
            id: "fpa-analyst",
            title: "FP&A Analyst",
            level: "Junior",
            description: "Build budgets, forecasts, and financial reports. Support month-end close and variance analysis.",
            requiredSkills: ["Excel Advanced", "Financial Reporting", "Budgeting", "ERP Systems", "Data Analysis"],
            skillClusters: {
              core: ["Advanced Excel / Modeling", "Financial Reporting (GAAP)", "Budgeting & Forecasting", "ERP Systems (SAP/Oracle)"],
              secondary: ["Data Analysis (SQL/BI Tools)", "Variance Analysis", "Cash Flow Modeling", "Dashboard Building"],
              softSkills: ["Analytical Mindset", "Deadline Management", "Clear Reporting"],
            },
            salaryRange: { min: 60000, max: 85000, median: 72000, currency: "USD" },
            salaryPercentiles: { p10: 55000, p25: 64000, p50: 72000, p75: 80000, p90: 90000 },
            yearsExperience: "0-2",
            nextRoles: ["fpa-senior"],
            nextStepRequirements: [
              "Own the monthly financial close process for a business unit",
              "Build and maintain a rolling 12-month forecast model",
              "Present variance analysis to senior management",
              "Automate a manual reporting process",
            ],
          },
          {
            id: "fpa-senior",
            title: "Senior FP&A Analyst",
            level: "Mid",
            description: "Lead forecasting processes and business partnering. Present insights to leadership.",
            requiredSkills: ["Business Partnering", "Scenario Modeling", "Presentation Skills", "SQL/BI Tools", "Strategic Analysis"],
            skillClusters: {
              core: ["Business Partnering", "Scenario & Sensitivity Modeling", "Strategic Analysis", "SQL / BI Tools (Tableau/Power BI)"],
              secondary: ["M&A Support Analysis", "Working Capital Optimization", "KPI Framework Design", "Board Deck Preparation"],
              softSkills: ["Presentation Skills", "Influencing Without Authority", "Business Acumen"],
            },
            salaryRange: { min: 85000, max: 130000, median: 108000, currency: "USD" },
            salaryPercentiles: { p10: 78000, p25: 92000, p50: 108000, p75: 122000, p90: 138000 },
            yearsExperience: "2-5",
            nextRoles: ["fpa-manager"],
            nextStepRequirements: [
              "Lead the annual budget process for the organization",
              "Partner with a VP+ stakeholder on strategic decisions",
              "Implement a new forecasting tool or methodology",
              "Develop a business case that influences a major investment",
            ],
          },
          {
            id: "fpa-manager",
            title: "FP&A Manager",
            level: "Senior",
            description: "Manage the FP&A function. Drive strategic planning and cross-functional financial leadership.",
            requiredSkills: ["Team Management", "Strategic Planning", "Board Presentations", "Process Improvement", "Systems Implementation"],
            skillClusters: {
              core: ["Team Management", "Strategic Planning", "Board Presentations", "Process Improvement"],
              secondary: ["Systems Implementation", "Cost Optimization Programs", "Treasury Coordination", "Audit Support"],
              softSkills: ["Leadership", "Cross-functional Influence", "Executive Communication"],
            },
            salaryRange: { min: 130000, max: 190000, median: 160000, currency: "USD" },
            salaryPercentiles: { p10: 120000, p25: 142000, p50: 160000, p75: 180000, p90: 200000 },
            yearsExperience: "5-8",
            nextRoles: ["fpa-director"],
            nextStepRequirements: [
              "Build and lead an FP&A team of 3+ analysts",
              "Drive a major cost savings or revenue initiative",
              "Own the relationship with the CFO or VP Finance",
              "Lead a transformation project (systems, processes)",
            ],
          },
          {
            id: "fpa-director",
            title: "Director of FP&A",
            level: "Director",
            description: "Lead enterprise financial planning. Partner with C-suite on strategic decisions.",
            requiredSkills: ["Executive Partnership", "M&A Analysis", "Org Strategy", "Capital Allocation"],
            skillClusters: {
              core: ["Executive Partnership", "M&A Financial Analysis", "Organizational Strategy", "Capital Allocation"],
              secondary: ["Investor Relations Support", "Tax Strategy Input", "International Finance", "Risk Management"],
              softSkills: ["C-Suite Communication", "Strategic Vision", "Organizational Leadership"],
            },
            salaryRange: { min: 180000, max: 280000, median: 230000, currency: "USD" },
            salaryPercentiles: { p10: 165000, p25: 200000, p50: 230000, p75: 260000, p90: 300000 },
            yearsExperience: "8+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Shape brands, drive growth, and connect products with people through creative strategy and data.",
    icon: "Megaphone",
    accentColor: "#f43f5e",
    accentColorClass: "text-rose-400",
    glowClass: "shadow-rose-500/20",
    bgGradient: "from-rose-500/10 via-transparent to-transparent",
    paths: [
      {
        id: "growth",
        title: "Growth Marketing",
        description: "Drive user acquisition, retention, and revenue through data-driven experiments.",
        roles: [
          {
            id: "gm-associate",
            title: "Growth Associate",
            level: "Junior",
            description: "Run experiments, analyze metrics, and support growth campaigns across channels.",
            requiredSkills: ["Google Analytics", "A/B Testing", "SQL Basics", "Paid Ads", "Email Marketing"],
            skillClusters: {
              core: ["Google Analytics (GA4)", "A/B Testing Frameworks", "Paid Ads (Google/Meta)", "Email Marketing & Automation"],
              secondary: ["SQL Basics", "Landing Page Optimization", "Referral Programs", "UTM Tracking"],
              softSkills: ["Data-Driven Mindset", "Experimentation Culture", "Fast Iteration"],
            },
            salaryRange: { min: 55000, max: 80000, median: 67000, currency: "USD" },
            salaryPercentiles: { p10: 50000, p25: 58000, p50: 67000, p75: 75000, p90: 85000 },
            yearsExperience: "0-2",
            nextRoles: ["gm-manager"],
            nextStepRequirements: [
              "Run 10+ experiments with documented results",
              "Manage a paid ads budget of $10K+/month profitably",
              "Build and optimize an email nurture sequence",
              "Demonstrate measurable impact on a core growth metric (CAC, LTV)",
            ],
          },
          {
            id: "gm-manager",
            title: "Growth Marketing Manager",
            level: "Mid",
            description: "Own growth metrics and experiment roadmaps. Manage channels and optimize funnels.",
            requiredSkills: ["Funnel Optimization", "Attribution Modeling", "Budget Management", "CRO", "Marketing Automation"],
            skillClusters: {
              core: ["Funnel Optimization", "Attribution Modeling (MTA/MMM)", "CRO (Conversion Rate Optimization)", "Marketing Automation (HubSpot/Marketo)"],
              secondary: ["Budget Management", "SEO Fundamentals", "Retention Campaigns", "Product Analytics (Amplitude/Mixpanel)"],
              softSkills: ["Channel Strategy", "Cross-functional Partnership", "Storytelling with Data"],
            },
            salaryRange: { min: 85000, max: 130000, median: 107000, currency: "USD" },
            salaryPercentiles: { p10: 78000, p25: 92000, p50: 107000, p75: 122000, p90: 138000 },
            yearsExperience: "2-5",
            nextRoles: ["gm-senior"],
            nextStepRequirements: [
              "Own a core acquisition channel end-to-end",
              "Build and lead an experiment roadmap generating 20% growth",
              "Implement a multi-touch attribution model",
              "Hire and manage a direct report",
              "Present growth results to executive leadership",
            ],
          },
          {
            id: "gm-senior",
            title: "Senior Growth Manager",
            level: "Senior",
            description: "Lead growth strategy and team. Drive cross-functional initiatives and large-scale campaigns.",
            requiredSkills: ["Growth Strategy", "Team Leadership", "Product-Led Growth", "Data Science Basics", "P&L Management"],
            skillClusters: {
              core: ["Growth Strategy & Planning", "Product-Led Growth (PLG)", "P&L Management", "Data Science Collaboration"],
              secondary: ["International Expansion", "Pricing Strategy", "Lifecycle Marketing", "Partnerships & BD"],
              softSkills: ["Team Leadership", "Executive Influence", "Strategic Prioritization"],
            },
            salaryRange: { min: 130000, max: 190000, median: 160000, currency: "USD" },
            salaryPercentiles: { p10: 120000, p25: 142000, p50: 160000, p75: 182000, p90: 200000 },
            yearsExperience: "5-8",
            nextRoles: ["gm-head"],
            nextStepRequirements: [
              "Define and execute a growth strategy across multiple channels",
              "Build and manage a team of 3+ growth professionals",
              "Drive a 2x improvement in a key growth metric",
              "Partner with Product to ship growth-focused features",
              "Establish growth experimentation culture within the org",
            ],
          },
          {
            id: "gm-head",
            title: "Head of Growth",
            level: "Director",
            description: "Define and execute the company's growth vision. Report to C-suite and drive revenue targets.",
            requiredSkills: ["Company Strategy", "Board Reporting", "Multi-channel Mastery", "Talent Development"],
            skillClusters: {
              core: ["Company Growth Strategy", "Board / Investor Reporting", "Multi-channel Mastery", "Revenue Targets"],
              secondary: ["Talent Development Pipeline", "MarTech Stack Architecture", "Brand-Performance Balance"],
              softSkills: ["C-Suite Partnership", "Vision Communication", "Organizational Design"],
            },
            salaryRange: { min: 180000, max: 300000, median: 240000, currency: "USD" },
            salaryPercentiles: { p10: 165000, p25: 205000, p50: 240000, p75: 280000, p90: 320000 },
            yearsExperience: "8+",
            nextRoles: ["gm-cmo"],
            nextStepRequirements: [
              "Own company-level revenue or growth targets",
              "Build a growth org of 10+ people across disciplines",
              "Report growth metrics to the board regularly",
              "Navigate a major pivot or market expansion",
            ],
          },
          {
            id: "gm-cmo",
            title: "Chief Marketing Officer",
            level: "C-Suite",
            description: "Lead all marketing functions. Define brand, drive revenue, and shape company direction.",
            requiredSkills: ["Executive Leadership", "Brand Vision", "Revenue Strategy", "Board Management", "Industry Influence"],
            skillClusters: {
              core: ["Executive Leadership", "Brand & Revenue Strategy", "Board Management", "Company Direction"],
              secondary: ["IPO / Public Company Marketing", "Global Brand Management", "Crisis Communications"],
              softSkills: ["Industry Influence", "Visionary Leadership", "Public Speaking", "Media Savvy"],
            },
            salaryRange: { min: 250000, max: 600000, median: 400000, currency: "USD" },
            salaryPercentiles: { p10: 220000, p25: 300000, p50: 400000, p75: 520000, p90: 650000 },
            yearsExperience: "12+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
      {
        id: "product-marketing",
        title: "Product Marketing",
        description: "Bridge products and markets through positioning, messaging, and go-to-market strategy.",
        roles: [
          {
            id: "pmm-associate",
            title: "Product Marketing Associate",
            level: "Junior",
            description: "Support product launches, create collateral, and conduct competitive analysis.",
            requiredSkills: ["Copywriting", "Market Research", "Competitive Analysis", "Sales Enablement", "Presentation Skills"],
            skillClusters: {
              core: ["Copywriting & Messaging", "Market Research", "Competitive Intelligence", "Sales Enablement"],
              secondary: ["Product Demo Skills", "Analyst Briefings", "Customer Interview Techniques", "CRM Tools"],
              softSkills: ["Presentation Skills", "Cross-team Agility", "Customer Empathy"],
            },
            salaryRange: { min: 58000, max: 82000, median: 70000, currency: "USD" },
            salaryPercentiles: { p10: 52000, p25: 62000, p50: 70000, p75: 78000, p90: 88000 },
            yearsExperience: "0-2",
            nextRoles: ["pmm-manager"],
            nextStepRequirements: [
              "Support 3+ product launches end-to-end",
              "Create a competitive battlecard used by the sales team",
              "Conduct 10+ customer interviews for persona development",
              "Write positioning that gets adopted in marketing campaigns",
            ],
          },
          {
            id: "pmm-manager",
            title: "Product Marketing Manager",
            level: "Mid",
            description: "Own product positioning and GTM strategy. Lead launches and drive adoption.",
            requiredSkills: ["Go-to-Market Strategy", "Positioning & Messaging", "Customer Research", "Cross-functional Leadership", "Metrics & Analytics"],
            skillClusters: {
              core: ["Go-to-Market Strategy", "Positioning & Messaging Frameworks", "Customer Research & Personas", "Launch Management"],
              secondary: ["Metrics & Analytics", "Pricing Input", "Analyst Relations", "Sales Training"],
              softSkills: ["Cross-functional Leadership", "Storytelling", "Influence Without Authority"],
            },
            salaryRange: { min: 90000, max: 140000, median: 115000, currency: "USD" },
            salaryPercentiles: { p10: 82000, p25: 98000, p50: 115000, p75: 132000, p90: 148000 },
            yearsExperience: "2-5",
            nextRoles: ["pmm-senior"],
            nextStepRequirements: [
              "Own the GTM strategy for a major product launch",
              "Build positioning that demonstrably improves win rates",
              "Establish a repeatable launch framework for the team",
              "Partner with Product to influence the roadmap",
            ],
          },
          {
            id: "pmm-senior",
            title: "Senior Product Marketing Manager",
            level: "Senior",
            description: "Lead PMM for major product lines. Define strategy and mentor the team.",
            requiredSkills: ["Strategic Planning", "Executive Communication", "Market Strategy", "Team Development", "Revenue Impact"],
            skillClusters: {
              core: ["Strategic Market Planning", "Executive Communication", "Revenue Impact Analysis", "Portfolio GTM Strategy"],
              secondary: ["Market Segmentation", "Pricing Strategy", "Competitive Moats", "Partner Marketing"],
              softSkills: ["Team Development", "Thought Leadership", "Strategic Vision"],
            },
            salaryRange: { min: 140000, max: 200000, median: 170000, currency: "USD" },
            salaryPercentiles: { p10: 128000, p25: 152000, p50: 170000, p75: 190000, p90: 212000 },
            yearsExperience: "5-8",
            nextRoles: ["pmm-director"],
            nextStepRequirements: [
              "Define PMM strategy for a product line generating $10M+ ARR",
              "Build and mentor a team of 2+ PMMs",
              "Drive measurable revenue impact through positioning changes",
              "Establish the company as a category leader in analyst reports",
            ],
          },
          {
            id: "pmm-director",
            title: "Director of Product Marketing",
            level: "Director",
            description: "Lead the PMM function. Shape company narrative and drive market leadership.",
            requiredSkills: ["Org Leadership", "Brand Strategy", "Market Vision", "C-Suite Partnership"],
            skillClusters: {
              core: ["PMM Org Leadership", "Brand & Narrative Strategy", "Market Vision", "Revenue Strategy"],
              secondary: ["Analyst Relations Program", "Customer Advisory Boards", "Category Creation"],
              softSkills: ["C-Suite Partnership", "Organizational Influence", "Industry Presence"],
            },
            salaryRange: { min: 190000, max: 300000, median: 245000, currency: "USD" },
            salaryPercentiles: { p10: 175000, p25: 210000, p50: 245000, p75: 280000, p90: 320000 },
            yearsExperience: "8+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
      {
        id: "content",
        title: "Content Marketing",
        description: "Create compelling narratives that educate, engage, and convert audiences.",
        roles: [
          {
            id: "cm-writer",
            title: "Content Writer",
            level: "Junior",
            description: "Write blog posts, social content, and marketing copy. Learn SEO and content strategy basics.",
            requiredSkills: ["Writing", "SEO Basics", "Social Media", "CMS Platforms", "Research"],
            skillClusters: {
              core: ["Long-form & Short-form Writing", "SEO Fundamentals", "CMS Platforms (WordPress/Webflow)", "Research & Fact-checking"],
              secondary: ["Social Media Content", "Basic Graphic Design (Canva)", "Email Newsletter Writing", "Content Calendar Management"],
              softSkills: ["Creativity", "Consistency", "Receptiveness to Feedback"],
            },
            salaryRange: { min: 45000, max: 68000, median: 56000, currency: "USD" },
            salaryPercentiles: { p10: 40000, p25: 48000, p50: 56000, p75: 64000, p90: 72000 },
            yearsExperience: "0-2",
            nextRoles: ["cm-strategist"],
            nextStepRequirements: [
              "Publish 30+ pieces of content across formats",
              "Achieve measurable organic traffic growth for 3+ articles",
              "Develop a consistent brand voice in writing",
              "Learn intermediate SEO (keyword research, on-page optimization)",
            ],
          },
          {
            id: "cm-strategist",
            title: "Content Strategist",
            level: "Mid",
            description: "Define content strategy, manage editorial calendars, and drive organic growth.",
            requiredSkills: ["Content Strategy", "SEO Advanced", "Editorial Planning", "Analytics", "Brand Voice"],
            skillClusters: {
              core: ["Content Strategy & Pillars", "Advanced SEO (Technical + Content)", "Editorial Calendar Management", "Analytics & Attribution"],
              secondary: ["Brand Voice Development", "Content Distribution", "Video Content Strategy", "Influencer Partnerships"],
              softSkills: ["Strategic Planning", "Stakeholder Alignment", "Creative Direction"],
            },
            salaryRange: { min: 75000, max: 115000, median: 95000, currency: "USD" },
            salaryPercentiles: { p10: 68000, p25: 82000, p50: 95000, p75: 108000, p90: 122000 },
            yearsExperience: "2-5",
            nextRoles: ["cm-senior"],
            nextStepRequirements: [
              "Build a content strategy that drives measurable pipeline",
              "Manage freelancers or a small content team",
              "Launch a new content channel (podcast, video, newsletter)",
              "Develop a thought leadership program for executives",
            ],
          },
          {
            id: "cm-senior",
            title: "Senior Content Manager",
            level: "Senior",
            description: "Lead content teams and multi-channel content strategy. Drive thought leadership.",
            requiredSkills: ["Team Management", "Multi-channel Strategy", "Thought Leadership", "Budget Management", "Performance Marketing"],
            skillClusters: {
              core: ["Content Team Management", "Multi-channel Strategy", "Thought Leadership Programs", "Budget & Vendor Management"],
              secondary: ["Performance Content Marketing", "Content Operations", "Content Technology Stack", "Localization Strategy"],
              softSkills: ["People Leadership", "Creative Vision", "Executive Reporting"],
            },
            salaryRange: { min: 110000, max: 165000, median: 138000, currency: "USD" },
            salaryPercentiles: { p10: 100000, p25: 120000, p50: 138000, p75: 155000, p90: 175000 },
            yearsExperience: "5-8",
            nextRoles: ["cm-head"],
            nextStepRequirements: [
              "Build and manage a content team of 3+ people",
              "Drive content-attributed revenue of $1M+",
              "Establish content operations and governance processes",
              "Launch a flagship content property (blog, podcast, community)",
            ],
          },
          {
            id: "cm-head",
            title: "Head of Content",
            level: "Director",
            description: "Own the entire content function. Define brand narrative and content-driven growth.",
            requiredSkills: ["Content Vision", "Brand Architecture", "Revenue Attribution", "Executive Presence"],
            skillClusters: {
              core: ["Content Vision & Strategy", "Brand Architecture", "Revenue Attribution Models", "Content-Driven Growth"],
              secondary: ["PR & Comms Integration", "Community Strategy", "Content M&A (Acquisitions)"],
              softSkills: ["Executive Presence", "Industry Networking", "Organizational Storytelling"],
            },
            salaryRange: { min: 150000, max: 240000, median: 195000, currency: "USD" },
            salaryPercentiles: { p10: 138000, p25: 168000, p50: 195000, p75: 225000, p90: 255000 },
            yearsExperience: "8+",
            nextRoles: [],
            nextStepRequirements: [],
          },
        ],
      },
    ],
  },
];

// ─── Helper Functions ───────────────────────────────────────────────

export function getAllRoles(): (Role & { industryId: string; pathId: string; industryName: string; pathTitle: string })[] {
  const allRoles: (Role & { industryId: string; pathId: string; industryName: string; pathTitle: string })[] = [];
  for (const industry of industries) {
    for (const path of industry.paths) {
      for (const role of path.roles) {
        allRoles.push({
          ...role,
          industryId: industry.id,
          pathId: path.id,
          industryName: industry.name,
          pathTitle: path.title,
        });
      }
    }
  }
  return allRoles;
}

export function getIndustry(id: string): Industry | undefined {
  return industries.find((i) => i.id === id);
}

export function getPath(industryId: string, pathId: string): CareerPath | undefined {
  const industry = getIndustry(industryId);
  return industry?.paths.find((p) => p.id === pathId);
}

/**
 * getPathData – Fetch roadmap data from URL params.
 * Usage: getPathData("tech", "frontend") → { industry, path, roles }
 */
export function getPathData(industryId: string, pathId: string) {
  const industry = getIndustry(industryId);
  if (!industry) return null;
  const path = industry.paths.find((p) => p.id === pathId);
  if (!path) return null;
  return { industry, path, roles: path.roles };
}

export function formatSalary(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${(amount / 1000).toFixed(0)}K`;
}

export function formatSalaryFull(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get all ancestors (predecessors) of a given role in a path.
 * Useful for determining "completed" roles.
 */
export function getAncestorRoleIds(roles: Role[], targetId: string): Set<string> {
  const ancestors = new Set<string>();
  const findAncestors = (id: string) => {
    for (const role of roles) {
      if (role.nextRoles.includes(id) && !ancestors.has(role.id)) {
        ancestors.add(role.id);
        findAncestors(role.id);
      }
    }
  };
  findAncestors(targetId);
  return ancestors;
}

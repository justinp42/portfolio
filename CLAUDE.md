# CLAUDE.md - Portfolio Project Instructions

## Project Owner
**Justin Pham** — Computer Science & Engineering student at the University of Louisville (Expected May 2027). GPA: 3.5/4.0, Trustees' Scholar. Based in Louisville, KY.

### Contact & Links
- Email: jhpham05@gmail.com
- GitHub: github.com/justinp42
- LinkedIn: linkedin.com/in/justinpham5/
- Live Site: https://justinp42.github.io/portfolio/

### Technical Profile
- **Languages:** Python, JavaScript, TypeScript, C, C++, Java, SQL, HTML/CSS, Assembly
- **Frontend:** React, Next.js, Tailwind CSS, Framer Motion
- **Backend/Data:** PostgreSQL, Supabase, pgvector, pandas, NumPy, Zod
- **AI/ML:** OpenAI API, Anthropic API, Gemini API, RAG Pipelines, Vector Embeddings, LLM Integration, Multi-Model Routing
- **Tools:** Git, GitHub, Linux, Vercel, Vitest, Playwright, Valgrind
- **Certifications:** Google Analytics, Microsoft Excel Essential Training, Project Management Simplified
- **Other:** Technical Writing, Agile Methodology, Bilingual (Vietnamese), Public Speaking

### Key Projects (for portfolio content)
1. **Mnemo: AI-Powered SaaS Platform for Marketing Agencies** (Dec 2025 - Present)
   - Solo Full-Stack Developer | Next.js, TypeScript, PostgreSQL, React, Supabase
   - Multi-tenant SaaS: 49 DB tables, 68+ REST endpoints, 150+ React components, 31 migrations
   - Multi-model AI orchestrator: 10 intent types, 4 LLM providers, streaming, retry + circuit breaker
   - RAG pipeline: pgvector, 1536-dim embeddings, cosine similarity, 7-source parallel context builder
   - Ad scoring engine: observable metrics + Gemini Vision AI concept analysis
   - Testing: 5,082 unit/integration tests (180 suites), 40+ E2E (Playwright), RLS on all tables, rate limiting on 26+ routes

2. **Genetic Algorithm with Wisdom of Crowds for Vertex Cover** (Fall 2025)
   - Python, NetworkX, Tkinter, Matplotlib
   - 7% vertex cover reduction vs standard GA
   - 150+ trials, 15 controlled experiments, 8-page IEEE paper, 16 peer-reviewed sources

3. **ext2 File System Analysis Tool** (Fall 2025)
   - C, Linux, ext2fs, Valgrind
   - CLI tool parsing raw binary disk images up to 100MB
   - 4 core commands, recursive traversal, zero memory leaks (Valgrind-validated)
   - Team of 3, Agile methodology

---

## Tech Stack
- **Framework:** React 18 (Create React App)
- **Styling:** Tailwind CSS 3.3 with custom config
- **Animation:** Framer Motion 10
- **Icons:** React Icons
- **Deployment:** GitHub Pages via `gh-pages`
- **Fonts:** Inter & Poppins (Google Fonts)
- **Color Palette:** Sage (#A8BBA4), Soft White (#FAFAF7), Warm Cream (#F2E8CF)

## Project Structure
```
portfolio/
├── public/              # Static assets, index.html
├── src/
│   ├── components/      # React components (Navbar, Hero, About, Projects, Contact, Footer)
│   ├── data/            # Content data (projects.js, experience.js)
│   ├── App.js           # Root component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles + Tailwind directives
├── tailwind.config.js   # Custom colors, fonts, animations
├── package.json         # Dependencies and scripts
└── CLAUDE.md            # This file
```

## Commands
- `npm start` — Run development server
- `npm run build` — Production build
- `npm run deploy` — Deploy to GitHub Pages (runs build automatically)
- `npm test` — Run tests

---

## Workflow: MANDATORY Agent Teams for ALL Work

**CRITICAL: Every task in this project MUST use the agent teams feature.** Do not perform work inline. Always spawn a team, create tasks, assign teammates, and coordinate through the task system.

### Team Spawning Protocol

For **every** user request, follow this exact workflow:

1. **Spawn a team** using `Teammate` tool with `spawnTeam` operation
2. **Create tasks** using `TaskCreate` for each unit of work
3. **Spawn teammates** using `Task` tool with `team_name` parameter — choose the right `subagent_type` for each task:
   - `general-purpose` for implementation work (editing, writing, building)
   - `Explore` for codebase research and file discovery
   - `Plan` for architecture and design decisions
   - `Bash` for running commands (build, deploy, git operations)
4. **Assign tasks** using `TaskUpdate` with `owner`
5. **Coordinate** until all tasks are complete
6. **Clean up** the team when done

### Minimum Team Composition by Task Type

| Task Type | Min Teammates | Roles |
|-----------|--------------|-------|
| New feature/component | 3 | Planner, Implementer, Reviewer |
| Bug fix | 2 | Investigator, Fixer |
| Content update | 2 | Content Writer, Implementer |
| Styling/design change | 2 | Designer, Implementer |
| Refactoring | 3 | Analyst, Implementer, Reviewer |
| Deployment | 2 | Builder, Deployer |

### Example Team Workflow (New Feature)
```
1. spawnTeam("portfolio-feature-x")
2. TaskCreate: "Research existing patterns" → assign to Explore agent
3. TaskCreate: "Plan implementation" → assign to Plan agent (blocked by #1)
4. TaskCreate: "Implement feature" → assign to general-purpose agent (blocked by #2)
5. TaskCreate: "Verify and test" → assign to Bash agent (blocked by #3)
6. Coordinate, review results, cleanup
```

---

## Workflow: MANDATORY Skills for All Applicable Work

**CRITICAL: Always check the available skills list and invoke the matching skill BEFORE doing any work.** Skills provide specialized workflows that produce higher-quality results.

### Skill Matching Rules

Always use these skills when the context matches:

| Context | Skill to Use |
|---------|-------------|
| **Starting ANY creative/feature work** | `brainstorming` — MUST use before creating features, components, or modifying behavior |
| **Planning multi-step tasks** | `planning-with-files` — For any task requiring >5 tool calls |
| **Writing implementation plans** | `writing-plans` — Before touching code when you have specs |
| **Executing plans** | `executing-plans` — When you have a written plan to execute |
| **Parallel independent tasks** | `dispatching-parallel-agents` — For 2+ independent tasks |
| **Subagent-driven work** | `subagent-driven-development` — For executing plans with independent tasks |
| **Building UI/frontend** | `frontend-design` — For web components, pages, layouts |
| **Testing web apps** | `webapp-testing` — For verifying frontend with Playwright |
| **Test-driven development** | `test-driven-development` — Before writing implementation code |
| **Debugging** | `systematic-debugging` — Before proposing any fixes |
| **Code review (requesting)** | `requesting-code-review` — When completing tasks or major features |
| **Code review (receiving)** | `receiving-code-review` — When feedback is received |
| **Git worktrees** | `using-git-worktrees` — When starting isolated feature work |
| **Finishing branches** | `finishing-a-development-branch` — When implementation is complete |
| **Verification** | `verification-before-completion` — Before claiming work is done |
| **Creating skills** | `writing-skills` or `skill-creator` — When creating new skills |
| **Creating documents** | `doc-coauthoring` — For documentation, proposals, specs |
| **Making PDFs** | `pdf` — For PDF creation or manipulation |
| **Making slides** | `pptx` — For presentations |
| **Making spreadsheets** | `xlsx` — For spreadsheet work |
| **Algorithmic art** | `algorithmic-art` — For generative art with p5.js |
| **Design/posters** | `canvas-design` — For static visual designs |
| **Theming artifacts** | `theme-factory` — For applying themes to artifacts |
| **Web artifacts** | `web-artifacts-builder` — For complex multi-component artifacts |
| **Animated GIFs** | `slack-gif-creator` — For Slack GIFs |
| **Copywriting** | `copywriting` — For marketing copy |
| **Copy editing** | `copy-editing` — For reviewing/improving copy |
| **SEO audit** | `seo-audit` — For SEO diagnostics |
| **Schema markup** | `schema-markup` — For structured data |
| **Content strategy** | `content-strategy` — For planning what content to create |
| **MCP servers** | `mcp-builder` — For building MCP integrations |

### Skill Chaining for Common Workflows

**Adding a new portfolio section:**
1. `brainstorming` → explore intent and requirements
2. `planning-with-files` → create task plan
3. `frontend-design` → design the component
4. `test-driven-development` → write tests first
5. `subagent-driven-development` → implement with agents
6. `verification-before-completion` → verify everything works
7. `requesting-code-review` → review the work

**Fixing a bug:**
1. `systematic-debugging` → investigate root cause
2. `planning-with-files` → plan the fix
3. `test-driven-development` → write regression test
4. `verification-before-completion` → verify fix works

**Deploying changes:**
1. `verification-before-completion` → verify build passes
2. `finishing-a-development-branch` → prepare for merge
3. Use Bash agent for `npm run deploy`

---

## Code Style & Conventions

- **Components:** Functional React components with hooks, one per file in `src/components/`
- **Data:** Content data lives in `src/data/` as exported arrays/objects
- **Styling:** Tailwind utility classes; custom values defined in `tailwind.config.js`
- **Animation:** Framer Motion `motion` components with `variants`, `useInView` for scroll triggers
- **Naming:** PascalCase for components, camelCase for variables/functions, kebab-case for CSS classes
- **Colors:** Use the custom palette (`sage`, `soft-white`, `warm-cream`) — never hardcode hex values outside tailwind config
- **Fonts:** `font-sans` (Inter) for body, `font-heading` (Poppins) for headings

## Design Principles
- Clean, modern, minimal aesthetic
- Smooth scroll-triggered animations (Framer Motion)
- Responsive design (mobile-first with Tailwind breakpoints)
- Consistent sage-green accent color
- Warm, approachable color palette
- Glassmorphism effects for overlays (backdrop-blur)

## Known Issues / TODOs
- Mobile hamburger menu is non-functional
- Contact form has no backend (currently console.log)
- Only 2 of 3 projects are displayed (Mnemo is missing)
- No TypeScript (consider migrating)
- No automated tests
- Project images use external Unsplash URLs (should use local/custom images)

## Important Notes
- This is a single-page app — navigation is scroll-based, not routed
- Deployment is to GitHub Pages at `https://justinp42.github.io/portfolio/`
- Always run `npm run build` to verify before deploying
- The `homepage` field in `package.json` must match the GitHub Pages URL

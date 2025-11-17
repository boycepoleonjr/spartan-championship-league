# Cursor IDE Productivity Guide for Spartan Championship League

This guide will help you maximize productivity in Cursor IDE with Claude Code, MCP servers, and AI-powered workflows.

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [.cursorrules Configuration](#cursorrules-configuration)
3. [Claude Code Integration](#claude-code-integration)
4. [MCP Servers for Supabase](#mcp-servers-for-supabase)
5. [Cursor Composer Workflows](#cursor-composer-workflows)
6. [Keyboard Shortcuts](#keyboard-shortcuts)
7. [Best Practices](#best-practices)

---

## 1. Initial Setup

### ✅ Already Completed
- [x] Next.js project initialized
- [x] Dependencies installed (yarn)
- [x] Claude CLI initialized in project
- [x] .cursorrules file created
- [x] .env.example file created

### 🔧 Next Steps

#### A. Create .env.local
```bash
cp .env.example .env.local
# Then edit .env.local with your actual Supabase credentials
```

#### B. Set up Supabase Client Files

Create the Supabase client utilities:

```bash
# Create lib directory structure
mkdir -p src/lib/supabase
```

**src/lib/supabase/server.ts** (Server Components):
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

**src/lib/supabase/client.ts** (Client Components):
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### C. Install Additional Recommended Dependencies

```bash
# Supabase SSR helpers (required for the client files above)
yarn add @supabase/ssr

# Recommended: shadcn/ui for components
npx shadcn@latest init

# Recommended: React Query for data fetching
yarn add @tanstack/react-query

# Recommended: Date utilities
yarn add date-fns

# Recommended: Form handling
yarn add react-hook-form @hookform/resolvers zod
```

---

## 2. .cursorrules Configuration

The `.cursorrules` file has been created and includes:

✅ **Project Context** - What the app does and its architecture  
✅ **Tech Stack** - All frameworks and tools  
✅ **Code Style** - TypeScript, React, and file naming conventions  
✅ **Supabase Patterns** - Server vs client usage  
✅ **Database Schema** - Table structures and relationships  
✅ **Common Tasks** - Quick reference for typical operations  
✅ **AI Guidelines** - How Claude should help with this codebase  

**How to Use:**
- Cursor automatically reads this file
- Reference it when asking Claude for help: "Following the .cursorrules, create a standings page"
- Update it as your patterns evolve

---

## 3. Claude Code Integration

### What is Claude Code?
Claude Code is a command-line tool that lets Claude work directly with your codebase, run commands, and make changes.

### Setup (Already Done!)
✅ You've already initialized Claude CLI in your project

### Key Commands

```bash
# Start an interactive session
claude code

# Run a specific task
claude code "Create a Supabase client for server components"

# Work on multiple files
claude code "Update the standings page to fetch data from Supabase"
```

### Best Practices with Claude Code

1. **Be Specific with Context**
   ```bash
   # ✅ Good
   claude code "Create a Server Component at src/app/standings/page.tsx that fetches standings from Supabase for the active season"
   
   # ❌ Too vague
   claude code "Make a standings page"
   ```

2. **Reference the Schema**
   ```bash
   claude code "Create types for the organizations and competitors tables based on the database schema in database/001_initial_schema.sql"
   ```

3. **Iterative Development**
   ```bash
   # First iteration
   claude code "Create a basic standings table component"
   
   # Second iteration
   claude code "Add sorting and filtering to the standings table"
   ```

---

## 4. MCP Servers for Supabase

MCP (Model Context Protocol) servers give Claude direct access to your tools and data.

### Recommended MCP Servers for This Project

#### A. Supabase MCP Server

This gives Claude direct access to your Supabase database for queries and schema inspection.

**Setup:**

1. Install the Supabase MCP server:
```bash
# Using npm
npm install -g @modelcontextprotocol/server-supabase

# Or clone and build from source
git clone https://github.com/modelcontextprotocol/servers.git
cd servers/src/supabase
npm install
npm run build
```

2. Configure in Cursor Settings:

Go to **Cursor Settings → Features → MCP Servers** and add:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase",
        "env"
      ],
      "env": {
        "SUPABASE_URL": "your-project-url",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
      }
    }
  }
}
```

**What This Enables:**
- Claude can query your database directly
- Schema inspection and table information
- Data exploration for context
- Query optimization suggestions

**Example Usage:**
```
"Claude, using the Supabase MCP server, show me all teams in the active season"

"Check the current standings structure in the database"
```

#### B. Filesystem MCP Server (Built-in)

Already available in Cursor - gives Claude access to read/write files.

**What This Enables:**
- Create new files and components
- Refactor existing code
- Update configurations

#### C. Git MCP Server (Optional)

For advanced git operations.

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

---

## 5. Cursor Composer Workflows

Cursor Composer (Cmd/Ctrl + I) is the multi-file editing feature. Here's how to use it effectively:

### Workflow 1: Feature Development

**Prompt Template:**
```
Create a standings page with the following requirements:
1. Fetch standings from Supabase for the active season
2. Display in a responsive table with columns: Rank, Team, W, L, Games Won, Games Lost
3. Use Server Components for data fetching
4. Apply Tailwind CSS styling
5. Handle loading and error states

Files to modify/create:
- src/app/standings/page.tsx (create)
- src/components/standings/StandingsTable.tsx (create)
```

### Workflow 2: Component Creation

**Prompt Template:**
```
Create a TeamCard component that:
- Accepts team data (organization with roster)
- Displays team logo, name, and current roster
- Shows each competitor's gamertag and ESR rating
- Is responsive and uses Tailwind CSS
- Includes hover states

File: src/components/teams/TeamCard.tsx
```

### Workflow 3: Type Generation

**Prompt Template:**
```
Based on the database schema in database/001_initial_schema.sql, generate TypeScript types for:
- Organization
- Competitor
- Season
- Match
- Standing

Include proper relationships and optional fields.

File: src/types/database.ts
```

### Workflow 4: Refactoring

```
Refactor the standings page to:
1. Extract data fetching into a separate Server Action
2. Add error boundaries
3. Improve TypeScript types
4. Add JSDoc comments

Review these files:
- src/app/standings/page.tsx
- src/lib/actions/standings.ts (create)
```

---

## 6. Keyboard Shortcuts

### Essential Cursor Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| **Cursor Chat** | Cmd + L | Ctrl + L |
| **Composer** (Multi-file) | Cmd + I | Ctrl + I |
| **Quick Fix** | Cmd + . | Ctrl + . |
| **Command Palette** | Cmd + Shift + P | Ctrl + Shift + P |
| **Go to File** | Cmd + P | Ctrl + P |
| **Toggle Terminal** | Cmd + J | Ctrl + J |
| **Format Document** | Shift + Option + F | Shift + Alt + F |
| **Accept AI Suggestion** | Tab | Tab |
| **Reject AI Suggestion** | Esc | Esc |

### Custom Workflows

Set up custom commands in **Cursor Settings → Keyboard Shortcuts**:

**Suggested Custom Commands:**
```
"Create New Component" → Cmd + Shift + N
"Generate Types from Schema" → Cmd + Shift + T
"Run Dev Server" → Cmd + Shift + D
```

---

## 7. Best Practices

### A. Working with Cursor AI

#### Do's ✅
- **Be specific about file paths**: "Update src/app/standings/page.tsx"
- **Reference the schema**: "Based on the organizations table..."
- **Use composer for multi-file changes**: Create page + component + types together
- **Iterate in small steps**: Build incrementally rather than asking for everything at once
- **Review AI suggestions**: Always check generated code before accepting

#### Don'ts ❌
- **Don't use vague prompts**: "Make it better" → What specifically?
- **Don't accept without reading**: Always review generated code
- **Don't skip type safety**: Ensure TypeScript is properly used
- **Don't ignore errors**: Fix TypeScript/ESLint issues immediately

### B. Supabase-Specific Patterns

```typescript
// ✅ DO: Use proper server/client separation
// Server Component
import { createClient } from '@/lib/supabase/server'

// Client Component
import { createClient } from '@/lib/supabase/client'

// ✅ DO: Handle errors properly
const { data, error } = await supabase.from('standings').select('*')
if (error) throw error // Or handle gracefully

// ✅ DO: Use TypeScript generics
const { data } = await supabase
  .from('organizations')
  .select<'*, rosters(*, competitors(*))'>()

// ❌ DON'T: Mix server and client
'use client'
import { createClient } from '@/lib/supabase/server' // Wrong!
```

### C. Component Organization

```typescript
// ✅ DO: Clear, typed component structure
type StandingsTableProps = {
  seasonId: string
  initialData?: Standing[]
}

export default function StandingsTable({ 
  seasonId, 
  initialData 
}: StandingsTableProps) {
  // Implementation
}

// ✅ DO: Separate concerns
// - Fetch data in Server Component (page.tsx)
// - Display data in presentational component (StandingsTable.tsx)
// - Keep business logic in lib/utils or lib/actions
```

### D. File Creation Pattern

When creating new features, use this order:

1. **Types first** - Define data structures
2. **Server Actions** - Create data fetching/mutation functions
3. **Components** - Build UI with proper types
4. **Pages** - Compose components together

**Example with Composer:**
```
Create a teams feature:
1. src/types/team.ts - Team and Roster types
2. src/lib/actions/teams.ts - getTeams, getTeamById
3. src/components/teams/TeamCard.tsx - Display single team
4. src/components/teams/TeamGrid.tsx - Display team grid
5. src/app/teams/page.tsx - Main teams page
```

---

## 8. Quick Reference Commands

### Development Commands
```bash
# Start dev server
yarn dev

# Type check
npx tsc --noEmit

# Lint
yarn lint

# Format (if prettier added)
npx prettier --write .

# Build
yarn build
```

### Claude Code Commands
```bash
# Interactive session
claude code

# Specific tasks
claude code "Create Supabase types from schema"
claude code "Add error handling to standings page"
claude code "Set up React Query for data fetching"

# Multi-step tasks
claude code "Create a complete teams page with routing, data fetching, and responsive design"
```

### Cursor Chat Examples

**Quick fixes:**
```
"Add TypeScript types to this function"
"Fix this ESLint error"
"Make this component responsive"
```

**Feature requests:**
```
"Add sorting to this table"
"Create a loading skeleton for this component"
"Add error boundaries to this page"
```

**Refactoring:**
```
"Extract this logic into a custom hook"
"Split this component into smaller pieces"
"Convert this to a Server Component"
```

---

## 9. Recommended Extensions

Install these VS Code/Cursor extensions:

- **Tailwind CSS IntelliSense** - Auto-complete for Tailwind classes
- **ES7+ React/Redux/React-Native snippets** - Quick React snippets
- **Pretty TypeScript Errors** - Better TS error messages
- **Error Lens** - Inline error highlighting
- **GitLens** - Advanced git features

---

## 10. Next Steps Checklist

Before starting development:

- [ ] Copy `.env.example` to `.env.local` and fill in Supabase credentials
- [ ] Create `src/lib/supabase/server.ts` and `client.ts` files
- [ ] Install Supabase SSR package: `yarn add @supabase/ssr`
- [ ] Set up MCP Supabase server in Cursor settings
- [ ] Initialize shadcn/ui: `npx shadcn@latest init`
- [ ] Create initial types: `src/types/database.ts`
- [ ] Test Supabase connection with a simple query
- [ ] Start building your first page (standings recommended)

---

## Support Resources

- **Cursor Docs:** https://cursor.sh/docs
- **Claude Code:** https://docs.claude.ai/claude-code
- **MCP Servers:** https://github.com/modelcontextprotocol/servers
- **Supabase + Next.js:** https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

---

**Pro Tip:** Use Cursor Composer (Cmd+I) to create multiple related files at once. For example: "Create a standings page with data fetching, types, and components" will generate everything together with proper imports and connections.

Happy coding! 🚀

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application called "Spartan Championship League" using the App Router architecture. The project uses TypeScript, React 19, Tailwind CSS v4, and Supabase for backend services.

## Development Commands

### Running the Application
- `yarn dev` - Start the development server (http://localhost:3000)
- `yarn build` - Create production build
- `yarn start` - Run production build locally

### Code Quality
- `yarn lint` - Run ESLint (uses Next.js ESLint config with TypeScript support)

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **React**: Version 19.2.0
- **TypeScript**: Version 5 with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Backend**: Supabase (@supabase/supabase-js, @supabase/ssr)
- **Data Fetching**: @tanstack/react-query (React Query v5)
- **Fonts**: Geist Sans and Geist Mono (via next/font/google)
- **Package Manager**: Yarn

### Custom Hooks Library

The project includes a set of reusable custom hooks located in `src/hooks/`:

- **useSupabaseQuery**: Wrapper for React Query + Supabase integration
- **useLocalStorage**: Persistent state management with localStorage
- **useMediaQuery**: Responsive breakpoint detection (includes preset breakpoint hooks)
- **useDebounce**: Value and callback debouncing utilities

**Usage:**
```typescript
import { useSupabaseQuery, useLocalStorage, useIsMobile, useDebounce } from '@/hooks'
```

**Documentation:** See `docs/features/custom-hooks.md` for complete API reference, examples, and troubleshooting.

## Project Structure

```
src/
  app/                    # App Router directory
    layout.tsx           # Root layout with font configuration
    page.tsx             # Homepage component
    globals.css          # Global styles with Tailwind and CSS variables
  hooks/                  # Custom React hooks library
    useSupabaseQuery.ts  # React Query + Supabase wrapper
    useLocalStorage.ts   # Persistent state management
    useMediaQuery.ts     # Responsive breakpoints
    useDebounce.ts       # Input debouncing utilities
    index.ts             # Central export point
  lib/                    # Utility libraries
    supabase/            # Supabase client configuration
      client.ts          # Browser client
      server.ts          # Server client

docs/                     # Comprehensive project documentation
  architecture/          # High-level design decisions
  features/              # Feature-specific documentation
    custom-hooks.md      # Custom hooks API reference and guide
  development/           # Developer guides
  api/                   # API documentation
  templates/             # Documentation templates
    feature-template.md  # Standard template for feature docs

.claude/                  # Claude Code configuration
  workflows/             # Development workflow guides
    document-feature.md  # Pre-PR documentation workflow

AGENT_TASKS.md           # Structured task list for development
```

## Key Configuration Details

### TypeScript Configuration
- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- JSX mode: react-jsx
- Strict mode enabled

### ESLint Configuration
- Uses Next.js core-web-vitals and TypeScript configs
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Styling Approach
- Tailwind CSS v4 with PostCSS plugin
- CSS variables for theming (--background, --foreground)
- Dark mode support via `prefers-color-scheme`
- Custom theme configuration in globals.css using `@theme inline`

## Important Notes

### Package Manager
**IMPORTANT**: This project uses **Yarn** as the package manager. Always use `yarn` commands, never `npm`.

### Supabase Integration
The project includes `@supabase/supabase-js` as a dependency. When working with Supabase:
- Look for environment variables (likely in `.env.local`) for Supabase URL and anon key
- Follow Next.js patterns for Supabase client initialization (typically separate files for server/client components)

### Next.js 16 Features
- Uses App Router (not Pages Router)
- Server Components by default
- Client Components require 'use client' directive

### Font Loading
- Custom fonts (Geist Sans and Geist Mono) are configured in layout.tsx
- Font variables are applied globally via className on body element
- Theme configuration in globals.css references these font variables

## Documentation System

This project maintains comprehensive documentation to support both human developers and Claude Code agents.

### Documentation Structure

- **`docs/features/`**: Feature-specific documentation with API references, examples, and troubleshooting
- **`docs/architecture/`**: High-level design decisions and architectural patterns
- **`docs/development/`**: Developer guides and best practices
- **`docs/api/`**: API endpoint documentation
- **`docs/templates/`**: Standardized templates for consistent documentation

### Documentation Workflow

When completing tasks from `AGENT_TASKS.md`:

1. Implement the feature
2. Run tests and linting to ensure quality
3. **Create comprehensive documentation** using `docs/templates/feature-template.md`
4. Commit code and documentation together
5. Create Pull Request

**Reference:** See `.claude/workflows/document-feature.md` for the complete documentation workflow.

### Finding Documentation

- **Custom Hooks**: `docs/features/custom-hooks.md` - Complete guide to all custom React hooks
- **Task Planning**: `AGENT_TASKS.md` - Organized list of all development tasks with dependencies
- **Project Setup**: This file (`CLAUDE.md`) - Overview and quick reference

## Development Workflow

### GitHub CLI Usage

**IMPORTANT**: Always check for and use the GitHub CLI (`gh`) for GitHub-related operations when available.

The GitHub CLI provides a more efficient and integrated way to work with GitHub directly from the command line.

**Common GitHub CLI commands:**
```bash
# Check if gh is installed
gh --version

# View repository status and info
gh repo view

# Create a pull request
gh pr create --title "Title" --body "Description"

# List pull requests
gh pr list

# View PR details
gh pr view [number]

# Check PR status and checks
gh pr checks

# Merge a pull request
gh pr merge [number]

# View issues
gh issue list

# Create an issue
gh issue create --title "Title" --body "Description"

# View GitHub Actions runs
gh run list

# View workflow run details
gh run view [run-id]
```

**When to use GitHub CLI:**
- Creating pull requests (instead of using GitHub web UI)
- Checking PR status and CI/CD results
- Viewing and managing issues
- Checking GitHub Actions workflow status
- Reviewing repository information

**Fallback:** If `gh` is not available, use `git` commands and GitHub web UI as alternatives.

### Standard Branch Workflow

**IMPORTANT**: Never commit directly to the `main` branch. Always create feature branches.

**Branch naming convention:**
- Features: `feature/task-[id]-[short-description]`
- Bug fixes: `fix/[issue-description]`
- Documentation: `docs/[description]`

**Example workflow:**
```bash
# Start new task
git checkout -b feature/task-f1-ui-components

# Make changes, test, and document
yarn lint
npx tsc --noEmit

# Commit with descriptive message
git add .
git commit -m "Add UI component library (TASK-F1)

[Detailed description of changes]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to remote
git push -u origin feature/task-f1-ui-components

# Create PR using GitHub CLI (preferred)
gh pr create --title "Add UI component library (TASK-F1)" --body "Implements TASK-F1 with complete documentation"

# Or create PR via GitHub web UI if gh is not available
```

### Task Development Process

1. **Select Task**: Choose from `AGENT_TASKS.md` based on dependencies
2. **Create Branch**: Use proper naming convention
3. **Implement**: Write code following TypeScript strict mode
4. **Test**: Run `yarn lint` and `npx tsc --noEmit`
5. **Document**: Create feature documentation using template
6. **Commit**: Write descriptive commit messages
7. **Push**: Push branch to remote
8. **PR**: Create Pull Request using `gh pr create` (preferred) or GitHub web UI

### Code Quality Standards

- **TypeScript**: Strict mode enabled, no `any` types without eslint-disable comment
- **Linting**: All code must pass `yarn lint` with zero errors
- **Client Components**: Mark with `'use client'` directive when using hooks or browser APIs
- **Server Components**: Default for all components in app directory
- **Documentation**: All exported functions/hooks must have JSDoc comments

## Quick Reference

### Common Patterns

**Client Component with Supabase:**
```typescript
'use client'

import { useSupabaseQuery } from '@/hooks'

export function MyComponent() {
  const { data, isLoading, error } = useSupabaseQuery(
    ['resource-name'],
    async (supabase) => {
      const { data, error } = await supabase.from('table').select('*')
      if (error) throw error
      return data
    }
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{/* render data */}</div>
}
```

**Server Component with Supabase:**
```typescript
import { createClient } from '@/lib/supabase/server'

export default async function MyPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('table').select('*')

  return <div>{/* render data */}</div>
}
```

**Responsive Design:**
```typescript
'use client'

import { useIsMobile, useIsDesktop } from '@/hooks'

export function ResponsiveComponent() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileView /> : <DesktopView />
}
```

### Helpful Commands

```bash
# Development
yarn dev                    # Start dev server
yarn build                  # Production build
yarn lint                   # Run ESLint
npx tsc --noEmit           # TypeScript type checking

# Git workflow
git checkout -b feature/task-x-name   # Create feature branch
git status                             # Check status
git add .                              # Stage changes
git commit -m "message"                # Commit
git push -u origin branch-name         # Push to remote

# GitHub CLI (use when available)
gh --version                           # Check if gh is installed
gh pr create                           # Create pull request
gh pr list                             # List pull requests
gh pr checks                           # Check PR status
gh issue list                          # List issues
gh repo view                           # View repository info

# Documentation
cat docs/features/custom-hooks.md     # View custom hooks guide
cat AGENT_TASKS.md                    # View task list
cat .claude/workflows/document-feature.md  # View doc workflow
```

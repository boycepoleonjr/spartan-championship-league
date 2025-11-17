# Quick Start Checklist

Copy this checklist to your project root and check off items as you complete them.

## 🚀 Immediate Setup (5 minutes)

- [x] Copy `.env.example` to `.env.local`
- [x] Fill in Supabase credentials in `.env.local`
  - Get from: Supabase Dashboard → Settings → API
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] Copy `.cursorrules` to your project root
- [x] Copy `README.md` to your project root (replace existing)

## 📦 Install Dependencies (2 minutes)

```bash
# Required: Supabase SSR helpers
yarn add @supabase/ssr

# Recommended: UI components
npx shadcn@latest init
# Choose: TypeScript, src/ directory, Tailwind CSS v4

# Recommended: Additional tools
yarn add @tanstack/react-query date-fns
yarn add react-hook-form @hookform/resolvers zod
```

## 🗄️ Create Supabase Client Files (3 minutes)

- [x] Create `src/lib/supabase/server.ts` (see CURSOR_PRODUCTIVITY_GUIDE.md section 1B)
- [x] Create `src/lib/supabase/client.ts` (see CURSOR_PRODUCTIVITY_GUIDE.md section 1B)
- [x] Test connection: Create a test page that fetches from Supabase

## 🎨 Initial Component Structure (5 minutes)

```bash
# Create directory structure
mkdir -p src/components/{ui,layout,standings,teams,schedule}
mkdir -p src/lib/{actions,utils}
mkdir -p src/types
mkdir -p src/hooks
```

## 🔧 Cursor IDE Setup (5 minutes)

- [x] Install recommended VS Code/Cursor extensions:
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux snippets
  - Pretty TypeScript Errors
  - Error Lens
  - GitLens

- [ ] Set up MCP Supabase server (optional but recommended):
  - Go to Cursor Settings → Features → MCP Servers
  - Add Supabase MCP configuration (see CURSOR_PRODUCTIVITY_GUIDE.md section 4A)

## 🎯 First Feature: Standings Page (30 minutes)

Use Cursor Composer (Cmd+I) with this prompt:

```
Create a standings page for the Spartan Championship League:

1. src/types/database.ts - TypeScript types for:
   - Standing (from standings table)
   - Organization (from organizations table)
   - Season (from seasons table)

2. src/app/standings/page.tsx - Server Component that:
   - Fetches standings for the active season
   - Includes organization data (team names, logos)
   - Handles loading and error states
   - Uses proper TypeScript types

3. src/components/standings/StandingsTable.tsx - Display component:
   - Responsive table with columns: Rank, Team Logo, Team Name, W, L, Games Won, Games Lost
   - Tailwind CSS styling with hover effects
   - Mobile-responsive design
   - Team logos using Next.js Image component

Reference the database schema in database/001_initial_schema.sql
Follow patterns in .cursorrules
```

## ✅ Test Your Setup (2 minutes)

- [ ] Run `yarn dev` - Server starts without errors
- [ ] Visit http://localhost:3000 - Home page loads
- [ ] Visit http://localhost:3000/standings - Standings page displays data
- [ ] Check browser console - No errors
- [ ] Run `npx tsc --noEmit` - No TypeScript errors

## 📊 Create Additional Pages

After standings works, create these pages in order:

### 2. Schedule Page (20 minutes)
```bash
claude code "Create a schedule page showing all matches grouped by week, with filters for regular season, pool play, and championship phases"
```

### 3. Teams Page (30 minutes)
```bash
claude code "Create a teams listing page with cards showing team logos, names, regions, and current rosters"
```

### 4. Team Detail Page (30 minutes)
```bash
claude code "Create a dynamic team detail page at /teams/[id] showing full roster, recent matches, and team stats"
```

### 5. Player/Competitor Page (30 minutes)
```bash
claude code "Create a competitors listing page with search and filtering by region and role"
```

## 🎨 Styling & Polish (1-2 hours)

- [ ] Set up consistent color scheme in `tailwind.config`
- [ ] Add a navigation header component
- [ ] Add a footer component
- [ ] Create a consistent page layout
- [ ] Add loading skeletons for all pages
- [ ] Add empty states for "no data" scenarios
- [ ] Ensure mobile responsiveness across all pages

## 🔐 Future: Admin Dashboard (Later)

Don't start this yet - get the public site working first!

- [ ] Run `003_admin_auth_policies.sql`
- [ ] Set up Supabase Auth
- [ ] Create admin users
- [ ] Build admin dashboard pages

## 📝 Git & GitHub (10 minutes)

Before pushing to GitHub:

- [ ] Create a `.gitignore` file (should already exist from Next.js)
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Create initial commit:
  ```bash
  git add .
  git commit -m "Initial project setup with Supabase integration"
  ```
- [ ] Create GitHub repository
- [ ] Push to GitHub:
  ```bash
  git remote add origin https://github.com/yourusername/spartan-championship-league.git
  git branch -M main
  git push -u origin main
  ```

## 🚢 Deployment (Later - After MVP is complete)

- [ ] Sign up for Vercel
- [ ] Connect GitHub repository
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy!

---

## Time Estimate

- **Immediate Setup**: 20 minutes
- **First Feature (Standings)**: 30 minutes
- **Additional Core Pages**: 2-3 hours
- **Styling & Polish**: 1-2 hours
- **Total to MVP**: ~4-5 hours

---

## Pro Tips

1. **Use Cursor Composer** for multi-file creation - much faster than building file by file
2. **Reference .cursorrules** in your prompts to Claude
3. **Test frequently** - Don't build too much before testing
4. **Commit often** - Small, frequent commits are better than large ones
5. **Start with Server Components** - Only use Client Components when you need interactivity

---

## Need Help?

Refer to:
- `CURSOR_PRODUCTIVITY_GUIDE.md` - Detailed Cursor IDE workflows
- `README.md` - Project overview and structure
- `.cursorrules` - Code patterns and conventions
- `docs/SETUP_GUIDE.md` - Database setup
- `docs/AUTH_SETUP_GUIDE.md` - Authentication setup (for later)

Happy building! 🏆

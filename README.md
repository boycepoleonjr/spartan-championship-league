# Spartan Championship League

A competitive Halo Infinite league management system for the 2026 season. Built with Next.js 16, TypeScript, Supabase, and Tailwind CSS.

## 🏆 Overview

The Spartan Championship League is a three-phase competitive tournament system:

1. **Regular Season** (4 weeks) - Swiss System, Best-of-3 matches
2. **Pool Play Playoffs** (2 weeks) - 4 pools of 4 teams, Best-of-7 series
3. **Championship** - Double Elimination bracket, Best-of-7 with winner's advantage

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v4
- **Authentication:** Supabase Auth (future)
- **Package Manager:** Yarn

## 📋 Prerequisites

- Node.js 18+ 
- Yarn
- Supabase account and project

## 🛠️ Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd spartan-championship-league
yarn install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project:
- Go to Settings → API
- Copy "Project URL" and "Project API keys (anon public)"

### 3. Database Setup

The database schema and seed data are in the `/database` directory:

```bash
# Already completed:
# 1. Run 001_initial_schema.sql in Supabase SQL Editor
# 2. Run 002_sample_seed_data.sql for test data
# 3. Configure storage buckets (team-logos, competitor-avatars)
```

### 4. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
spartan-championship-league/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components (to be created)
│   ├── lib/                    # Utilities (to be created)
│   │   └── supabase.ts         # Supabase client
│   ├── types/                  # TypeScript types (to be created)
│   └── hooks/                  # Custom React hooks (to be created)
├── public/                     # Static assets
├── database/                   # SQL migrations and seed data
│   ├── 001_initial_schema.sql
│   ├── 002_sample_seed_data.sql
│   └── 003_admin_auth_policies.sql
├── docs/                       # Documentation
│   ├── SETUP_GUIDE.md
│   └── AUTH_SETUP_GUIDE.md
└── README.md
```

## 🗄️ Database Schema

### Core Tables
- **organizations** - Team organizations
- **competitors** - Players, coaches, captains
- **seasons** - League seasons
- **rosters** - Team membership by season

### Competition Tables
- **matches** - Match records (Swiss/Pool Play/Championship)
- **games** - Individual games within matches
- **standings** - Real-time league standings

### Content Tables
- **format_faqs** - FAQ content
- **events** - Calendar events

## 🎯 Planned Features

### Phase 1 (MVP - Public Site)
- [ ] Home page with current season info
- [ ] Event schedule with calendar view
- [ ] Live standings leaderboard
- [ ] Team profiles with rosters
- [ ] Player/competitor profiles
- [ ] Match results and history
- [ ] Format FAQs page

### Phase 2 (Admin Dashboard)
- [ ] Admin authentication
- [ ] Match score entry
- [ ] Roster management
- [ ] Schedule generator
- [ ] FAQ content editor

### Phase 3 (Advanced Features)
- [ ] Real-time score updates
- [ ] Playoff bracket visualization
- [ ] Team registration system
- [ ] API for external integrations

## 🔧 Development Scripts

```bash
# Development
yarn dev              # Start dev server

# Building
yarn build            # Build for production
yarn start            # Start production server

# Code Quality
yarn lint             # Run ESLint
```

## 📊 API Routes (Planned)

```
GET  /api/standings/:seasonId     # Get standings
GET  /api/matches/:seasonId       # Get matches
GET  /api/teams/:id               # Get team details
GET  /api/players/:id             # Get player details
POST /api/matches/:id/score       # Update match score (admin)
```

## 🎨 Design System (To Be Implemented)

- **Colors:** Tournament-themed palette
- **Typography:** Clean, competitive aesthetic
- **Components:** shadcn/ui (to be added)
- **Responsive:** Mobile-first design

## 🔐 Authentication (Future)

Admin authentication will be implemented using Supabase Auth:
- Email/password for admin users
- Row Level Security (RLS) policies
- Admin role via JWT metadata

See `docs/AUTH_SETUP_GUIDE.md` for implementation details.

## 🚢 Deployment

### Recommended: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Alternative: Other Platforms
- Netlify
- Railway
- Self-hosted with PM2

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key | Yes |

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📚 Documentation

- [Database Setup Guide](./docs/SETUP_GUIDE.md)
- [Authentication Setup](./docs/AUTH_SETUP_GUIDE.md)
- [Schema Reference](./database/spartan-championship-league-schema.json)

## 🐛 Known Issues

None yet! 🎉

## 📄 License

Private - All rights reserved

## 👥 Team

Built for the competitive Halo Infinite community by Luminon Gaming.

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- Next.js team for the amazing framework
- Halo Infinite competitive community

---

**Status:** 🚧 In Development - v0.1.0

**Season:** 2026 Spring Season (Feb 1 - May 31, 2026)

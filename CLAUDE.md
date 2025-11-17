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
- **Backend**: Supabase (@supabase/supabase-js)
- **Fonts**: Geist Sans and Geist Mono (via next/font/google)
- **Package Manager**: Yarn

## Project Structure

```
src/
  app/                    # App Router directory
    layout.tsx           # Root layout with font configuration
    page.tsx             # Homepage component
    globals.css          # Global styles with Tailwind and CSS variables
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

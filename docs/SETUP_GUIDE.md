# Spartan Championship League - Database Setup Guide

## Overview
This guide will help you set up your Supabase database for the Spartan Championship League.

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- A new Supabase project created

## Step 1: Create a New Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `spartan-championship-league` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Click "Create new project" and wait for it to initialize

## Step 2: Run the Migration

### Option A: Using the SQL Editor (Recommended)

1. In your Supabase project dashboard, go to **SQL Editor** (left sidebar)
2. Click **"+ New query"**
3. Copy and paste the entire contents of `001_initial_schema.sql`
4. Click **"Run"** or press `Ctrl/Cmd + Enter`
5. You should see "Success. No rows returned" if everything worked correctly

### Option B: Using Supabase CLI

If you prefer using the CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

## Step 3: Verify the Schema

1. Go to **Table Editor** in your Supabase dashboard
2. You should see all 9 tables:
   - organizations
   - competitors
   - seasons
   - rosters
   - matches
   - games
   - standings
   - format_faqs
   - events

3. Click on each table to verify the columns are correct

## Step 4: Configure Authentication (Optional for MVP)

For now, the database is set up with public read access. When you're ready to add admin functionality:

1. Go to **Authentication** → **Policies**
2. Update the admin write policies for each table
3. Example policy for admin-only writes:

```sql
CREATE POLICY "Admin write access" ON organizations 
FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);
```

## Step 5: Get Your Database Credentials

1. Go to **Settings** → **API**
2. Copy these values for your Next.js app:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `Project API keys` → `anon public` (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Step 6: Set Up Storage Buckets (for logos & avatars)

1. Go to **Storage** in the sidebar
2. Create two buckets:
   - `team-logos` (public)
   - `competitor-avatars` (public)

3. For each bucket, set the following policies:
   - **Public read access**: Allow anyone to view files
   - **Authenticated upload**: Only authenticated users can upload

## What's Included in the Schema

### Core Tables
- **organizations**: Team data (name, logo, social links)
- **competitors**: Player/coach/captain profiles
- **seasons**: Season information and dates
- **rosters**: Links competitors to teams by season

### Competition Tables
- **matches**: Match records (Swiss, Pool Play, Championship)
- **games**: Individual games within matches
- **standings**: Real-time standings calculations

### Content Tables
- **format_faqs**: FAQ content for each season
- **events**: Calendar events and match schedules

### Built-in Features
- ✅ UUID primary keys
- ✅ Automatic timestamps (created_at, updated_at)
- ✅ Foreign key constraints
- ✅ Check constraints for data validation
- ✅ Indexes for optimal query performance
- ✅ Row Level Security (RLS) enabled
- ✅ Public read access policies

## Next Steps

1. **Seed some test data** to verify everything works
2. **Set up your Next.js project** and connect to Supabase
3. **Build out the public pages** (standings, schedules, rosters)
4. **Add real-time subscriptions** for live score updates

## Pool Play Configuration

The schema supports 4 pools of 4 teams (16 teams total) for the playoff phase:
- Pool A, Pool B, Pool C, Pool D
- Store pool name in `matches.pool_name` column
- Top teams from each pool advance to championship bracket

## Troubleshooting

**Error: "relation already exists"**
- The table already exists. Drop tables first or start with a fresh project.

**Error: "permission denied"**
- Check your RLS policies. Make sure public read access is enabled.

**Can't see data in Table Editor**
- Verify RLS policies are correct
- Check that you're using the correct API key

## Support

For Supabase-specific issues:
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com

For schema questions or modifications, refer to `spartan-championship-league-schema.json`

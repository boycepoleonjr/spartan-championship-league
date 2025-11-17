// Database types for Spartan Championship League
// Generated from database schema

export type Organization = {
  id: string
  name: string
  logo_url: string | null
  primary_color: string | null
  founded_date: string | null
  social_links: Record<string, string>
  region: string | null
  created_at: string
  updated_at: string
}

export type Competitor = {
  id: string
  gamertag: string
  real_name: string | null
  esr_rating: number | null
  avatar_url: string | null
  region: string | null
  role: 'Player' | 'Coach' | 'Captain' | null
  created_at: string
  updated_at: string
}

export type Season = {
  id: string
  name: string
  year: number
  start_date: string
  end_date: string
  status: 'upcoming' | 'active' | 'completed'
  description: string | null
  created_at: string
  updated_at: string
}

export type Match = {
  id: string
  season_id: string
  week_number: number | null
  home_team_id: string
  away_team_id: string
  scheduled_time: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  phase: 'regular_season' | 'pool_play' | 'championship'
  best_of: 3 | 5 | 7
  winning_team_id: string | null
  home_score: number
  away_score: number
  bracket_position: string | null
  pool_name: string | null
  created_at: string
  updated_at: string
}

export type Standing = {
  id: string
  season_id: string
  organization_id: string
  wins: number
  losses: number
  games_won: number
  games_lost: number
  rank: number | null
  points: number
  created_at: string
  updated_at: string
}

// Relations
export type StandingWithOrganization = Standing & {
  organization: Organization
}

export type MatchWithTeams = Match & {
  home_team: Organization
  away_team: Organization
}

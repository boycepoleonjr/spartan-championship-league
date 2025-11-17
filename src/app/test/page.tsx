import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = await createClient()

  // Test fetching organizations (simple table)
  const { data: organizations, error: orgError } = await supabase
    .from('organizations')
    .select('id, name, region, logo_url')
    .limit(5)

  // Test fetching seasons
  const { data: seasons, error: seasonError } = await supabase
    .from('seasons')
    .select('id, name, year, status')
    .limit(5)


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">
          Supabase Connection Test
        </h1>

        {/* Connection Status */}
        <div className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Connection Status
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  !orgError && !seasonError
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                {!orgError && !seasonError
                  ? '✅ Connected to Supabase'
                  : '❌ Connection Error'}
              </span>
            </div>
            {orgError && (
              <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded text-red-700 dark:text-red-400 text-sm">
                <strong>Organizations Error:</strong> {orgError.message}
              </div>
            )}
            {seasonError && (
              <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded text-red-700 dark:text-red-400 text-sm">
                <strong>Seasons Error:</strong> {seasonError.message}
              </div>
            )}
          </div>
        </div>

        {/* Organizations Data */}
        <div className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Organizations ({organizations?.length ?? 0} found)
          </h2>
          {organizations && organizations.length > 0 ? (
            <div className="space-y-2">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700"
                >
                  <div className="font-medium text-black dark:text-zinc-50">
                    {org.name}
                  </div>
                  {org.region && (
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Region: {org.region}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              No organizations found. Make sure you&apos;ve run the seed data script.
            </p>
          )}
        </div>

        {/* Seasons Data */}
        <div className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Seasons ({seasons?.length ?? 0} found)
          </h2>
          {seasons && seasons.length > 0 ? (
            <div className="space-y-2">
              {seasons.map((season) => (
                <div
                  key={season.id}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700"
                >
                  <div className="font-medium text-black dark:text-zinc-50">
                    {season.name} ({season.year})
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Status: {season.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              No seasons found. Make sure you&apos;ve run the seed data script.
            </p>
          )}
        </div>

        {/* Environment Check */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Environment Variables
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 dark:text-zinc-400">
                NEXT_PUBLIC_SUPABASE_URL:
              </span>
              <span className="text-black dark:text-zinc-50 font-mono">
                {process.env.NEXT_PUBLIC_SUPABASE_URL
                  ? '✅ Set'
                  : '❌ Missing'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 dark:text-zinc-400">
                NEXT_PUBLIC_SUPABASE_ANON_KEY:
              </span>
              <span className="text-black dark:text-zinc-50 font-mono">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  ? '✅ Set'
                  : '❌ Missing'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


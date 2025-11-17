# Authentication Setup - Quick Reference

## Current State (Testing Mode)
✅ **Public Read Access** - Anyone can view all data  
✅ **No Write Restrictions** - You can insert/update/delete data freely for testing  
✅ **Storage Policies Set** - Team logos and competitor avatars configured  

This is perfect for development and testing!

## When You're Ready for Production

### Step 1: Enable Supabase Authentication

1. Go to **Authentication** in your Supabase dashboard
2. Configure your authentication providers:
   - Email/Password (simplest for admins)
   - OAuth providers (Google, GitHub, etc.) if needed

### Step 2: Create an Admin User

**Option A: Via Dashboard**
1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter email and password
4. Click **"Create user"**

**Option B: Via Sign-up**
1. Implement a sign-up form in your Next.js app
2. Have the first user sign up normally

### Step 3: Grant Admin Role

After creating a user, grant them admin privileges:

**Via SQL Editor:**
```sql
UPDATE auth.users 
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'your-admin@email.com';
```

**Via Dashboard:**
1. Go to **Authentication** → **Users**
2. Click on the user
3. Find "User Metadata" or "Raw User Meta Data"
4. Add: `{"role": "admin"}`
5. Save

### Step 4: Run the Admin Policies Script

1. Go to **SQL Editor** in Supabase
2. Open `003_admin_auth_policies.sql`
3. Click **"Run"**
4. All tables now have admin-only write protection!

### Step 5: Test Authentication in Your App

**Next.js Example:**

```typescript
// utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Admin login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@yourdomain.com',
  password: 'your-secure-password'
})

// Check if user is admin
const { data: { user } } = await supabase.auth.getUser()
const isAdmin = user?.app_metadata?.role === 'admin'

// Admin-only data mutation
if (isAdmin) {
  const { data, error } = await supabase
    .from('organizations')
    .insert({ name: 'New Team', region: 'NA' })
}
```

## Testing the Policies

After running the admin policies script:

**As Anonymous User (not logged in):**
```javascript
// ✅ Can read
const { data } = await supabase.from('organizations').select('*')

// ❌ Cannot write
const { error } = await supabase
  .from('organizations')
  .insert({ name: 'Test' })
// Error: new row violates row-level security policy
```

**As Admin User (logged in):**
```javascript
// ✅ Can read
const { data } = await supabase.from('organizations').select('*')

// ✅ Can write
const { data } = await supabase
  .from('organizations')
  .insert({ name: 'New Team', region: 'NA' })
```

## Verification Queries

Run these in SQL Editor to check your setup:

```sql
-- Check all policies on a table
SELECT * FROM pg_policies WHERE tablename = 'organizations';

-- Test if current user has admin role
SELECT auth.jwt() -> 'app_metadata' ->> 'role' as role;

-- List all RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## Rollback (Remove Admin Policies)

If you need to go back to testing mode, run the rollback section at the bottom of `003_admin_auth_policies.sql` (uncomment it first).

## Best Practices

1. **Use app_metadata for production** - Not visible to client
2. **Use environment variables** - Never commit credentials
3. **Implement proper session management** - Handle token refresh
4. **Add logout functionality** - Clear sessions properly
5. **Consider role-based access** - You could add more roles like 'moderator', 'team_manager', etc.

## Future Enhancements

Once basic admin auth is working, consider:
- **Team Manager Role** - Let team captains update their own rosters
- **Editor Role** - For content managers who can edit FAQs but not matches
- **API Keys** - For automated systems to update scores
- **Audit Logs** - Track who made what changes

## Need Help?

- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- RLS Docs: https://supabase.com/docs/guides/auth/row-level-security
- Next.js + Supabase: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

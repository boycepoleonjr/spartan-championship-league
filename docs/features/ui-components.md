# UI Components Library - TASK-F1

**Status:** ✅ Complete
**Branch:** `feature/task-f1-ui-components`
**Related Tasks:** TASK-F1 (Foundation - Blocking)
**Created:** 2025-11-17
**Last Updated:** 2025-11-17

---

## Overview

A complete UI component library built with [shadcn/ui](https://ui.shadcn.com/) using the "New York" style variant. These components provide a consistent, accessible, and themeable foundation for the entire application.

**Key Benefits:**
- **Accessibility**: Built on Radix UI primitives (WCAG 2.1 AA compliant)
- **Type Safety**: Full TypeScript support with exported types
- **Customizable**: Theme-aware using CSS variables
- **Composition**: Components work together seamlessly
- **Tree-shakeable**: Import only what you need

---

## Architecture

### File Structure
```
src/components/ui/
├── button.tsx          # Button with multiple variants
├── card.tsx            # Card container with header/footer/content
├── badge.tsx           # Status badges
├── table.tsx           # Data tables
├── dialog.tsx          # Modal dialogs
├── sonner.tsx          # Toast notifications (via Sonner)
├── skeleton.tsx        # Loading skeletons
└── index.ts            # Central export point
```

### Dependencies
- **@radix-ui/react-dialog** (v1.1.15) - Accessible dialog primitives
- **@radix-ui/react-slot** (v1.2.4) - Component composition utility
- **sonner** (v2.0.7) - Toast notification system
- **next-themes** (v0.4.6) - Theme switching support
- **class-variance-authority** (v0.7.1) - Variant styling utility
- **lucide-react** (v0.553.0) - Icon library

### Design System
- **Style**: New York variant (modern, clean aesthetic)
- **Base Color**: Zinc
- **CSS Variables**: Enabled for theming
- **Icons**: Lucide React
- **Responsive**: Mobile-first approach

---

## Components Reference

### Button

Versatile button component with multiple variants, sizes, and states.

**Import:**
```typescript
import { Button, buttonVariants } from '@/components/ui'
```

**Variants:**
- `default` - Primary action button (zinc background)
- `destructive` - Dangerous/delete actions (red)
- `outline` - Secondary actions (bordered)
- `secondary` - Tertiary actions (muted)
- `ghost` - Minimal styling
- `link` - Text link styling

**Sizes:**
- `default` - Standard size (h-9, px-4 py-2)
- `sm` - Small (h-8, px-3)
- `lg` - Large (h-10, px-8)
- `icon` - Icon-only (h-9 w-9)

**Examples:**
```typescript
// Basic button
<Button>Click me</Button>

// Variant and size
<Button variant="destructive" size="lg">Delete Account</Button>

// With icon (using lucide-react)
import { Trash2 } from 'lucide-react'
<Button variant="outline" size="icon">
  <Trash2 className="h-4 w-4" />
</Button>

// As a link
<Button variant="link" asChild>
  <Link href="/about">Learn More</Link>
</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>
```

---

### Card

Container component for grouping related content with optional header and footer.

**Import:**
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'
```

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Top section
- `CardTitle` - Primary heading
- `CardDescription` - Subtitle/description text
- `CardContent` - Main content area
- `CardFooter` - Bottom section (typically for actions)

**Examples:**
```typescript
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Team Statistics</CardTitle>
    <CardDescription>Season 2025 performance metrics</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Wins: 12 | Losses: 3</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>

// Simple content card
<Card>
  <CardContent className="pt-6">
    <p>Match starts in 30 minutes</p>
  </CardContent>
</Card>
```

---

### Badge

Small status indicators for labels, counts, or tags.

**Import:**
```typescript
import { Badge, badgeVariants } from '@/components/ui'
```

**Variants:**
- `default` - Primary badge (zinc)
- `secondary` - Muted badge
- `destructive` - Error/warning badge (red)
- `outline` - Bordered badge

**Examples:**
```typescript
// Match status
<Badge>Live</Badge>
<Badge variant="secondary">Scheduled</Badge>
<Badge variant="destructive">Cancelled</Badge>

// Team role
<Badge variant="outline">Captain</Badge>

// Count badge
<Badge className="ml-auto">{unreadCount}</Badge>
```

---

### Table

Responsive data table with semantic HTML structure.

**Import:**
```typescript
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui'
```

**Examples:**
```typescript
// Standings table
<Table>
  <TableCaption>League Standings - Regular Season</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Rank</TableHead>
      <TableHead>Team</TableHead>
      <TableHead className="text-right">W</TableHead>
      <TableHead className="text-right">L</TableHead>
      <TableHead className="text-right">Points</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {standings.map((team) => (
      <TableRow key={team.id}>
        <TableCell className="font-medium">{team.rank}</TableCell>
        <TableCell>{team.name}</TableCell>
        <TableCell className="text-right">{team.wins}</TableCell>
        <TableCell className="text-right">{team.losses}</TableCell>
        <TableCell className="text-right">{team.points}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={4}>Total Teams</TableCell>
      <TableCell className="text-right">{standings.length}</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

---

### Dialog

Modal dialog for focused interactions, confirmations, or forms.

**Import:**
```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui'
```

**Features:**
- Focus trap (keyboard navigation)
- Escape key to close
- Click outside to close
- Accessible (ARIA labels)

**Examples:**
```typescript
// Confirmation dialog
<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Team</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete the team
        and remove all associated data.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Form dialog (controlled)
const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Add Player</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Player</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

---

### Toaster (Sonner)

Toast notification system for user feedback.

**Import:**
```typescript
import { Toaster } from '@/components/ui'
import { toast } from 'sonner' // Import toast function from sonner
```

**Setup (required):**
Add `<Toaster />` to your root layout:
```typescript
// src/app/layout.tsx
import { Toaster } from '@/components/ui'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

**Examples:**
```typescript
import { toast } from 'sonner'

// Success toast
toast.success('Match score updated successfully')

// Error toast
toast.error('Failed to save roster changes')

// Info toast
toast.info('Game starting in 5 minutes')

// Loading toast
toast.loading('Submitting form...')

// Promise toast (auto resolves)
toast.promise(
  saveToDatabase(),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Failed to save'
  }
)

// With action button
toast('Team invitation sent', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  }
})

// Custom duration
toast('This will disappear in 10 seconds', {
  duration: 10000
})
```

---

### Skeleton

Loading placeholders that match your content shape.

**Import:**
```typescript
import { Skeleton } from '@/components/ui'
```

**Examples:**
```typescript
// Text loading
<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>

// Card loading
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-[200px]" />
    <Skeleton className="h-4 w-[300px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-[200px] w-full" />
  </CardContent>
</Card>

// Table loading
<TableRow>
  <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
</TableRow>

// Avatar loading
<Skeleton className="h-12 w-12 rounded-full" />
```

---

## Common Patterns

### Loading States

```typescript
'use client'

import { useSupabaseQuery } from '@/hooks'
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from '@/components/ui'

export function TeamsList() {
  const { data: teams, isLoading } = useSupabaseQuery(['teams'], fetchTeams)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {teams?.map((team) => (
        <Card key={team.id}>
          <CardHeader>
            <CardTitle>{team.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{team.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### Confirmation Dialogs

```typescript
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui'

export function DeleteTeamButton({ teamId }: { teamId: string }) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTeam(teamId)
      toast.success('Team deleted successfully')
      setOpen(false)
    } catch (error) {
      toast.error('Failed to delete team')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Team</DialogTitle>
          <DialogDescription>
            Are you sure? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Status Badges

```typescript
import { Badge } from '@/components/ui'

type MatchStatus = 'scheduled' | 'live' | 'completed' | 'cancelled'

export function MatchStatusBadge({ status }: { status: MatchStatus }) {
  const variants = {
    scheduled: 'secondary',
    live: 'default',
    completed: 'outline',
    cancelled: 'destructive',
  } as const

  const labels = {
    scheduled: 'Scheduled',
    live: 'Live Now',
    completed: 'Final',
    cancelled: 'Cancelled',
  }

  return (
    <Badge variant={variants[status]}>
      {labels[status]}
    </Badge>
  )
}
```

---

## Theming

### CSS Variables

Components use CSS variables defined in `src/app/globals.css`:

```css
@theme inline {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;

  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;

  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;

  /* ...more variables */
}

@media (prefers-color-scheme: dark) {
  @theme inline {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ...dark mode overrides */
  }
}
```

### Customizing Components

Use Tailwind classes to customize components:

```typescript
// Override background color
<Button className="bg-blue-600 hover:bg-blue-700">
  Custom Color
</Button>

// Add spacing
<Card className="my-8 p-6">
  <CardContent>Content</CardContent>
</Card>

// Responsive sizing
<Button className="w-full md:w-auto">
  Responsive Button
</Button>
```

---

## Testing

### Unit Tests
**Location:** `src/__tests__/components/ui/` (to be created in TASK-QA-1)

**Key test cases:**
- Button renders all variants correctly
- Card sub-components render in correct order
- Dialog traps focus and closes on escape
- Toast notifications appear and auto-dismiss
- Skeleton matches content dimensions

### Accessibility Tests
- Keyboard navigation works for all interactive components
- Screen readers announce content correctly
- Focus indicators are visible
- Color contrast meets WCAG AA standards

---

## Performance Considerations

### Bundle Size
Individual component sizes (gzipped):
- Button: ~1.5kb
- Card: ~0.8kb
- Badge: ~0.6kb
- Table: ~1.2kb
- Dialog: ~3.5kb (includes Radix Portal)
- Sonner: ~4.2kb
- Skeleton: ~0.4kb

Total if all imported: ~12.2kb (gzipped)

### Optimization Tips
- Import only needed components: `import { Button } from '@/components/ui'`
- Use dynamic imports for Dialog if not used on initial page load
- Skeleton components prevent layout shift during loading

---

## Known Limitations

### Dialog
- **Limitation:** Cannot nest Dialogs (one at a time)
- **Workaround:** Use controlled state to sequence dialogs or use alert-dialog for nested confirmations

### Toast
- **Limitation:** Maximum 20 toasts visible at once
- **Workaround:** Use `toast.dismiss()` to clear old toasts programmatically

### Table
- **Limitation:** No built-in sorting or pagination
- **Workaround:** Use with data table libraries like TanStack Table (to be implemented in future tasks)

---

## Future Enhancements

- [ ] Add Input component (TASK-P2-3)
- [ ] Add Select/Dropdown component (TASK-P2-4)
- [ ] Add Checkbox and Radio components (TASK-P2-4)
- [ ] Add DataTable with sorting/filtering (TASK-P1-3)
- [ ] Add Popover component (TASK-P2-5)
- [ ] Add Tooltip component (TASK-P1-4)

---

## Troubleshooting

### Issue 1: Styles not applying

**Cause:** Tailwind CSS not processing component classes
**Solution:** Ensure `src/components/**/*.{js,ts,jsx,tsx}` is in `content` array of tailwind.config.js

### Issue 2: Dialog not closing

**Cause:** Missing `DialogClose` component or `onOpenChange` handler
**Solution:**
```typescript
<Dialog open={open} onOpenChange={setOpen}>
  {/* Use DialogClose or control with setOpen(false) */}
</Dialog>
```

### Issue 3: Toast not appearing

**Cause:** Missing `<Toaster />` in root layout
**Solution:** Add `<Toaster />` component to `src/app/layout.tsx`

### Issue 4: TypeScript errors with `asChild`

**Cause:** Not importing from correct package
**Solution:** Ensure you're importing from `@/components/ui`, not directly from `@radix-ui`

---

## Related Documentation

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Sonner Toast Library](https://sonner.emilkowal.ski/)
- [Custom Hooks](./custom-hooks.md) - Use with UI components
- TASK-F2: Layout Components (upcoming, will use these UI components)
- TASK-P1-*: Public pages (will use these UI components extensively)

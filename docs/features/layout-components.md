# Layout Components - TASK-F2

**Status:** ✅ Complete
**Branch:** `feature/task-f2-layout-components`
**Related Tasks:** TASK-F2 (Foundation)
**Dependencies:** TASK-F1 (UI Components) ✅
**Created:** 2025-11-17
**Last Updated:** 2025-11-17

---

## Overview

Layout components provide consistent page structure, navigation, and spacing across the entire application. These components form the foundation of the user interface and are automatically included in the root layout.

**Key Benefits:**
- **Consistency**: Uniform spacing and structure on all pages
- **Responsive**: Mobile-first design with adaptive navigation
- **Accessible**: Semantic HTML and keyboard navigation support
- **Maintainable**: Centralized layout logic, easy to update

---

## Architecture

### File Structure
```
src/components/layout/
├── PageContainer.tsx   # Page width and spacing wrapper
├── Header.tsx          # Main navigation header
├── Footer.tsx          # Site footer
└── index.ts            # Central export point

src/app/
└── layout.tsx          # Root layout integration
```

### Dependencies
- **UI Components** (TASK-F1): Button component for mobile menu
- **Custom Hooks** (TASK-F3): useIsMobile for responsive behavior
- **lucide-react** (v0.553.0): Menu and X icons
- **Next.js Link**: Client-side navigation

### Design Decisions
- **Sticky Header**: Remains visible while scrolling for easy navigation access
- **Backdrop Blur**: Modern glassmorphism effect on header
- **Flexbox Layout**: Ensures footer sticks to bottom even with minimal content
- **Mobile-First**: Designed for small screens, enhanced for larger viewports

---

## Components Reference

### PageContainer

Wrapper component that provides consistent page width and horizontal spacing.

**Import:**
```typescript
import { PageContainer } from '@/components/layout'
```

**Props:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Page content to wrap |
| className | string | undefined | Additional Tailwind classes |
| maxWidth | '4xl' \| '5xl' \| '6xl' \| '7xl' \| 'full' | '7xl' | Maximum content width |
| padded | boolean | true | Whether to add horizontal padding |

**Max Width Values:**
- `4xl`: 896px (56rem)
- `5xl`: 1024px (64rem)
- `6xl`: 1152px (72rem)
- `7xl`: 1280px (80rem) - Default
- `full`: No max width constraint

**Examples:**
```typescript
// Standard page layout (default)
<PageContainer>
  <h1>Welcome</h1>
  <p>Content with consistent spacing</p>
</PageContainer>

// Narrow content (blog posts, forms)
<PageContainer maxWidth="4xl">
  <article>Blog post content</article>
</PageContainer>

// Full width with custom padding
<PageContainer maxWidth="full" padded={false}>
  <div className="px-2">Custom padding</div>
</PageContainer>

// Additional styling
<PageContainer className="py-12 space-y-8">
  <section>Section 1</section>
  <section>Section 2</section>
</PageContainer>
```

---

### Header

Main navigation header with responsive mobile menu.

**Import:**
```typescript
import { Header } from '@/components/layout'
```

**Features:**
- **Sticky Positioning**: Stays visible while scrolling
- **Responsive Navigation**: Horizontal menu on desktop, hamburger on mobile
- **Active Link Styling**: Visual feedback for current page (to be implemented)
- **Logo Link**: Click logo to return home
- **Backdrop Blur**: Semi-transparent background with blur effect

**Navigation Links:**
The header includes these default navigation items:
- Home
- Schedule
- Standings
- Teams
- Players

**Mobile Behavior:**
- On screens < 768px, shows hamburger menu icon
- Menu slides in when opened
- Links automatically close menu when clicked
- Uses `useIsMobile()` hook for responsive detection

**Customization:**
To update navigation links, edit the `navigationLinks` array in `Header.tsx`:
```typescript
const navigationLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/schedule', label: 'Schedule' },
  // Add more links here
]
```

**Examples:**
```typescript
// Automatic inclusion in root layout
// src/app/layout.tsx
import { Header } from '@/components/layout'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

---

### Footer

Site footer with multi-column link organization and copyright.

**Import:**
```typescript
import { Footer } from '@/components/layout'
```

**Features:**
- **Multi-Column Layout**: Organized link sections (League, Resources, About)
- **Responsive Grid**: 2 columns on mobile, 4 on desktop
- **Dynamic Copyright**: Automatically updates year
- **Branding**: Logo and tagline

**Footer Sections:**
1. **Logo & Description**: Branding and tagline
2. **League Links**: Schedule, Standings, Teams, Players
3. **Resources**: Rules, Statistics, History
4. **About**: About Us, Contact, Privacy Policy

**Customization:**
To update footer links, edit `footerSections` in `Footer.tsx`:
```typescript
const footerSections = {
  league: {
    title: 'League',
    links: [
      { href: '/schedule', label: 'Schedule' },
      // Add more links
    ],
  },
  // Add more sections
}
```

**Examples:**
```typescript
// Automatic inclusion in root layout
// src/app/layout.tsx
import { Footer } from '@/components/layout'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## Root Layout Integration

The layout components are integrated into the root layout to provide consistent structure across all pages.

**File:** `src/app/layout.tsx`

```typescript
import { Header, Footer } from "@/components/layout"
import { Toaster } from "@/components/ui"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
```

**Layout Structure:**
```
┌─────────────────────────────┐
│         Header              │ ← Sticky, always visible
├─────────────────────────────┤
│                             │
│         Main Content        │ ← flex-1 (grows to fill)
│         (children)          │
│                             │
├─────────────────────────────┤
│         Footer              │ ← Sticks to bottom
└─────────────────────────────┘
```

**Key CSS Classes:**
- `flex min-h-screen flex-col`: Creates full-height flex container
- `flex-1` on main: Makes content area grow to push footer down
- This ensures footer is always at bottom, even with minimal content

---

## Usage Patterns

### Standard Page Layout

```typescript
// src/app/teams/page.tsx
import { PageContainer } from '@/components/layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

export default function TeamsPage() {
  return (
    <PageContainer className="py-12">
      <h1 className="text-4xl font-bold mb-8">Teams</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Team cards */}
      </div>
    </PageContainer>
  )
}
```

### Full-Width Hero with Contained Content

```typescript
// src/app/page.tsx
import { PageContainer } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      {/* Full-width hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600">
        <PageContainer className="py-24">
          <h1 className="text-6xl font-bold text-white">
            Welcome to SCL
          </h1>
        </PageContainer>
      </section>

      {/* Contained content section */}
      <PageContainer className="py-12">
        <div className="space-y-8">
          <section>Regular content</section>
        </div>
      </PageContainer>
    </>
  )
}
```

### Narrow Content Page (Forms, Articles)

```typescript
// src/app/contact/page.tsx
import { PageContainer } from '@/components/layout'
import { Card, CardContent } from '@/components/ui'

export default function ContactPage() {
  return (
    <PageContainer maxWidth="4xl" className="py-12">
      <Card>
        <CardContent className="pt-6">
          <form>
            {/* Form fields */}
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
```

---

## Responsive Behavior

### Breakpoints

The layout components use Tailwind's default breakpoints:
- **Mobile**: < 640px
- **sm**: ≥ 640px
- **md**: ≥ 768px
- **lg**: ≥ 1024px
- **xl**: ≥ 1280px

### Header Responsiveness

**Desktop (≥ 768px):**
- Full logo text: "Spartan Championship League"
- Horizontal navigation menu
- No hamburger icon

**Mobile (< 768px):**
- Abbreviated logo: "SCL"
- Hamburger menu icon
- Slide-down navigation menu when opened

### Footer Responsiveness

**Desktop (≥ 768px):**
- 4-column grid (Logo + 3 link sections)
- Wider spacing

**Mobile (< 768px):**
- 2-column grid
- Logo section spans both columns
- Link sections stack

### PageContainer Padding

**Mobile:**
- px-4 (1rem / 16px)

**Tablet (sm):**
- px-6 (1.5rem / 24px)

**Desktop (lg):**
- px-8 (2rem / 32px)

---

## Styling and Theming

### CSS Variables Used

Layout components use these CSS variables from `globals.css`:

```css
--background: Background color for header/footer
--foreground: Text color
--muted-foreground: Secondary text color (footer links)
--primary: Logo background color
--primary-foreground: Logo text color
--border: Border colors (header bottom, footer top)
```

### Customizing Styles

**Change header height:**
```typescript
// Header.tsx
<div className="flex h-20 items-center"> {/* Changed from h-16 */}
```

**Change max widths:**
```typescript
// PageContainer.tsx
const maxWidthClasses = {
  '8xl': 'max-w-[1408px]', // Add custom size
}
```

**Update logo:**
```typescript
// Header.tsx and Footer.tsx
<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
  {/* Replace with your logo */}
  <Image src="/logo.svg" alt="Logo" width={32} height={32} />
</div>
```

---

## Accessibility

### Semantic HTML

- `<header>` for Header component
- `<nav>` for navigation sections
- `<main>` for page content
- `<footer>` for Footer component

### Keyboard Navigation

- All navigation links are keyboard accessible
- Mobile menu button has proper `aria-label`
- Tab order flows naturally through header → main → footer

### Screen Readers

- Landmark regions (header, nav, main, footer) announced
- Menu button state announced (expanded/collapsed)
- Logo link has descriptive text

### Focus Management

- Visible focus indicators on all interactive elements
- Mobile menu maintains focus within menu when open
- Focus returns to menu button when menu closes

---

## Performance

### Bundle Size

- PageContainer: ~0.3kb (gzipped)
- Header: ~1.8kb (gzipped, includes mobile menu logic)
- Footer: ~1.2kb (gzipped)
- Total: ~3.3kb (gzipped)

### Optimization Techniques

- **Code Splitting**: Header is client component, Footer is server component
- **Minimal Re-renders**: Mobile menu state isolated to Header
- **CSS-only Animations**: No JavaScript animations for smooth performance

### Layout Shift Prevention

- Fixed header height (`h-16`) prevents layout shift
- Footer structure defined upfront, no dynamic loading
- PageContainer uses stable max-width values

---

## Testing

### Manual Testing Checklist

- [ ] Header appears on all pages
- [ ] Footer appears on all pages
- [ ] Logo link navigates to homepage
- [ ] All navigation links work correctly
- [ ] Mobile menu opens/closes correctly
- [ ] Mobile menu closes when link is clicked
- [ ] Header stays sticky while scrolling
- [ ] Footer sticks to bottom on short pages
- [ ] Responsive layout works at all breakpoints
- [ ] Keyboard navigation works correctly

### Automated Tests
**Location:** `src/__tests__/components/layout/` (to be created in TASK-QA-1)

**Test cases:**
- PageContainer renders children correctly
- PageContainer applies correct max-width class
- Header renders all navigation links
- Header mobile menu toggles correctly
- Footer renders all sections
- Footer displays current year in copyright

---

## Known Limitations

### Header
- **Limitation:** No active link highlighting yet
- **Workaround:** Will be implemented with routing awareness in Phase 2

### Mobile Menu
- **Limitation:** No animation when opening/closing
- **Workaround:** Can add Tailwind transitions or Framer Motion in future

### Footer
- **Limitation:** Links are currently static placeholders
- **Workaround:** Pages will be created in subsequent tasks

---

## Future Enhancements

- [ ] Add active link highlighting based on current route (TASK-P2-5)
- [ ] Add smooth animations to mobile menu (TASK-P3-X)
- [ ] Add search bar in header (TASK-P2-6)
- [ ] Add user account menu in header (TASK-P2-7)
- [ ] Add theme toggle (light/dark mode) (TASK-P3-X)
- [ ] Add breadcrumb navigation (TASK-P2-8)

---

## Troubleshooting

### Issue 1: Footer not sticking to bottom

**Cause:** Missing flex layout on root container
**Solution:** Ensure root layout has proper flex setup:
```typescript
<div className="flex min-h-screen flex-col">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
</div>
```

### Issue 2: Mobile menu not closing when link clicked

**Cause:** Missing `onClick` handler on mobile links
**Solution:** Already implemented in Header.tsx with `onClick={() => setMobileMenuOpen(false)}`

### Issue 3: Header covering content

**Cause:** Sticky header overlays content at top of page
**Solution:** Add top padding to page content:
```typescript
<PageContainer className="pt-8"> {/* Add top padding */}
  <h1>Content</h1>
</PageContainer>
```

### Issue 4: Horizontal scroll on mobile

**Cause:** Content wider than viewport
**Solution:** Ensure all content uses responsive containers:
```typescript
<PageContainer> {/* This prevents overflow */}
  <div className="w-full"> {/* Not w-screen */}
    Content
  </div>
</PageContainer>
```

---

## Related Documentation

- [UI Components](./ui-components.md) - Button component used in Header
- [Custom Hooks](./custom-hooks.md) - useIsMobile hook used for responsiveness
- [Next.js Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- TASK-F1: UI Components (dependency)
- TASK-F3: Custom Hooks (dependency)
- TASK-P1-*: Public pages (will use these layout components)

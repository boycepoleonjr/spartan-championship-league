/**
 * UI Components Library - Spartan Championship League
 *
 * Built with shadcn/ui (New York style) - A collection of beautifully
 * designed, accessible, and customizable React components.
 *
 * All components are:
 * - Fully typed with TypeScript
 * - Accessible (WCAG compliant via Radix UI primitives)
 * - Themeable with CSS variables
 * - Responsive and mobile-friendly
 *
 * @see docs/features/ui-components.md for complete documentation
 */

// Core components
export { Button, buttonVariants } from './button'
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card'
export { Badge, badgeVariants } from './badge'
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table'

// Overlay components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'

// Feedback components
export { Toaster } from './sonner'
export { Skeleton } from './skeleton'

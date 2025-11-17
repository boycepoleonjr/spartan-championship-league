import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  /**
   * Maximum width variant
   * @default '7xl'
   */
  maxWidth?: '4xl' | '5xl' | '6xl' | '7xl' | 'full'
  /**
   * Whether to add padding
   * @default true
   */
  padded?: boolean
}

const maxWidthClasses = {
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

/**
 * PageContainer component provides consistent page width and spacing
 *
 * @example
 * <PageContainer>
 *   <h1>Page Title</h1>
 *   <p>Content</p>
 * </PageContainer>
 *
 * @example
 * // Custom max width and no padding
 * <PageContainer maxWidth="5xl" padded={false}>
 *   <div>Full bleed content</div>
 * </PageContainer>
 */
export function PageContainer({
  children,
  className,
  maxWidth = '7xl',
  padded = true,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        padded && 'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  )
}

import Link from 'next/link'
import { PageContainer } from './PageContainer'

interface FooterLink {
  href: string
  label: string
}

const footerSections = {
  league: {
    title: 'League',
    links: [
      { href: '/schedule', label: 'Schedule' },
      { href: '/standings', label: 'Standings' },
      { href: '/teams', label: 'Teams' },
      { href: '/players', label: 'Players' },
    ] as FooterLink[],
  },
  resources: {
    title: 'Resources',
    links: [
      { href: '/rules', label: 'Rules' },
      { href: '/stats', label: 'Statistics' },
      { href: '/history', label: 'History' },
    ] as FooterLink[],
  },
  about: {
    title: 'About',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
    ] as FooterLink[],
  },
}

/**
 * Footer component with links and copyright information
 *
 * Features:
 * - Multi-column link organization
 * - Responsive grid layout
 * - Copyright and branding
 *
 * @example
 * <Footer />
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <PageContainer className="py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-lg font-bold">S</span>
              </div>
              <span className="font-bold">SCL</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Competitive gaming at its finest. Join the battle.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="mb-4 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Spartan Championship League. All rights reserved.
          </p>
        </div>
      </PageContainer>
    </footer>
  )
}

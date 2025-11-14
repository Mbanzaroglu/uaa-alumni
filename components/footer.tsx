import Link from 'next/link';
import content from '@/lib/constants/content.json';

export function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      href: content.footer.social.facebook,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: content.footer.social.instagram,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: content.footer.social.linkedin,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  const allPages = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/haberler', label: 'Haberler' },
    { href: '/uyelik', label: 'Üyelik' },
    { href: '/uyelik/neden-uyelik', label: 'Neden Üye Olmalıyım' },
    { href: '/uyelik/uye-ol', label: 'Üye Ol' },
    { href: '/dernek-hakkinda', label: 'Dernek Hakkında' },
    { href: '/dernek-hakkinda/hakkimizda', label: 'Hakkımızda' },
    { href: '/dernek-hakkinda/misyon-vizyon', label: 'Misyon & Vizyon' },
    { href: '/dernek-hakkinda/mezunlar-evi', label: 'Mezunlar Evi' },
    { href: '/dernek-hakkinda/yonetim', label: 'Yönetim Kurulu' }
  ];

  // Split pages into two columns
  const leftColumnPages = allPages.slice(0, Math.ceil(allPages.length / 2));
  const rightColumnPages = allPages.slice(Math.ceil(allPages.length / 2));

  return (
    <footer className="glass-strong border-t border-white/10 mt-auto bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Left Section: Pages Column 1 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Sayfalar</h4>
            <div className="space-y-2">
              {leftColumnPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block text-sm font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Section: Pages Column 2 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground opacity-0 pointer-events-none">Sayfalar</h4>
            <div className="space-y-2">
              {rightColumnPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block text-sm font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: Contact */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">İletişim</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {content.alumniHouse.address}
              </p>
              <p className="text-sm text-foreground/70">
                <a href={`tel:${content.alumniHouse.phone.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">
                  {content.alumniHouse.phone}
                </a>
              </p>
              <p className="text-sm text-foreground/70">
                <a href={`mailto:${content.alumniHouse.email}`} className="hover:text-foreground transition-colors">
                  {content.alumniHouse.email}
                </a>
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold text-foreground">Sosyal Medya</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass h-12 w-12 rounded-full border border-white/20 p-3 text-foreground/70 transition-all duration-300 hover:scale-110 hover:border-white/40 hover:text-foreground hover:bg-white/10 active:scale-95"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="my-8 border-t border-white/10" />

        {/* Privacy Policy Link */}
        <div className="mb-6 text-center">
          <Link
            href="/dernek-hakkinda/gizlilik-politikasi"
            className="text-sm font-medium text-foreground/70 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-foreground/70"
          >
            Gizlilik Politikası
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-foreground/60">
          {content.footer.copyright}
        </div>
      </div>
    </footer>
  );
}

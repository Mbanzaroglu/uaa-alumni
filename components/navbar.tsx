'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import content from '@/lib/constants/content.json';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'about' | 'membership' | null>(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileMembershipOpen, setMobileMembershipOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aboutContainerRef = useRef<HTMLDivElement | null>(null);
  const membershipContainerRef = useRef<HTMLDivElement | null>(null);

  // Use useLayoutEffect to avoid cascading renders warning
  useEffect(() => {
    // Set mounted after initial render to trigger animations
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const navItems = [
    { href: '/', label: content.navigation.home },
    { href: '/haberler', label: content.navigation.news },
  ];

  // Dernek Hakkında alt menü
  const aboutSubmenu = [
    { href: '/dernek-hakkinda/hakkimizda', label: 'Hakkımızda' },
    { href: '/dernek-hakkinda/misyon-vizyon', label: 'Misyon & Vizyon' },
    { href: '/dernek-hakkinda/mezunlar-evi', label: 'Mezunlar Evi' },
    { href: '/dernek-hakkinda/yonetim', label: 'Yönetim Kurulu' },
    { href: '/dernek-hakkinda/gizlilik-politikasi', label: 'Gizlilik Politikası' },
  ];

  // Üyelik alt menü
  const membershipSubmenu = [
    { href: '/uyelik/neden-uyelik', label: 'Neden Üye Olmalıyım' },
    { href: '/uyelik/uye-ol', label: 'Üye Ol' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href);
  };

  const isSubmenuActive = (href: string) => {
    return pathname === href;
  };

  // Unified handler to open a dropdown (closes any other open dropdown)
  const openDropdown = (type: 'about' | 'membership') => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // Close any other open dropdown immediately and open the new one
    setActiveDropdown(type);
  };

  // Handler to schedule dropdown close with delay
  const scheduleCloseDropdown = () => {
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    
    // Schedule close after delay
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, 200);
  };

  // Handler for when mouse enters a dropdown button/container
  const handleDropdownMouseEnter = (type: 'about' | 'membership') => {
    // If switching from another dropdown, close it immediately and open new one
    if (activeDropdown && activeDropdown !== type) {
      openDropdown(type);
    } else if (activeDropdown !== type) {
      openDropdown(type);
    } else {
      // Already open, just clear any pending close
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }
  };

  // Handler for when mouse leaves a dropdown button area
  const handleDropdownButtonMouseLeave = (e: React.MouseEvent, type: 'about' | 'membership') => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    
    // Check if mouse is moving to the dropdown menu
    if (relatedTarget?.closest(`[data-dropdown-menu="${type}"]`)) {
      return; // Don't close if moving to menu
    }
    
    // Check if moving to another dropdown button/container
    const otherType = type === 'about' ? 'membership' : 'about';
    if (relatedTarget?.closest(`[data-dropdown-container="${otherType}"]`)) {
      // Switching to another dropdown - will be handled by that dropdown's mouse enter
      return;
    }
    
    // Not moving to dropdown menu or another dropdown, schedule close
    if (activeDropdown === type) {
      scheduleCloseDropdown();
    }
  };

  // Handler for when mouse enters the dropdown menu
  const handleDropdownMenuMouseEnter = (type: 'about' | 'membership') => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // Ensure this dropdown is open
    if (activeDropdown !== type) {
      setActiveDropdown(type);
    }
  };

  // Handler for when mouse leaves the dropdown menu
  const handleDropdownMenuMouseLeave = (e: React.MouseEvent, type: 'about' | 'membership') => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    
    // Check if moving back to the button or container
    if (relatedTarget?.closest(`[data-dropdown-container="${type}"]`)) {
      return; // Don't close if moving back to button
    }
    
    // Check if moving to another dropdown
    const otherType = type === 'about' ? 'membership' : 'about';
    if (relatedTarget?.closest(`[data-dropdown-container="${otherType}"]`)) {
      // Switching to another dropdown - close current immediately
      setActiveDropdown(null);
      return;
    }
    
    // Not moving to button or another dropdown, schedule close
    if (activeDropdown === type) {
      scheduleCloseDropdown();
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 glass-strong border-b border-[var(--glass-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`group flex items-center space-x-3 transition-all duration-500 ${
              mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            {/* Logo Image */}
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg transition-all duration-300 group-hover:brightness-110 group-hover:saturate-110 md:h-12 md:w-12">
              <Image
                src="/images/uaa-logo.png"
                alt="UAA Alumni Logo"
                fill
                className="object-contain object-center"
                priority
                quality={90}
              />
            </div>
            {/* Logo Text */}
            <span className="text-2xl font-bold drop-shadow-lg tracking-wider uppercase transition-colors duration-300 group-hover:text-[rgb(33,82,133)] dark:group-hover:text-[rgb(33,82,133)] group-hover:drop-shadow-xl" style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, sans-serif', letterSpacing: '0.15em', fontWeight: 700, textRendering: 'geometricPrecision', color: 'var(--logo-color, #ffffff)' }}>
              {content.site.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-2 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium ${
                  mounted
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0 transition-transform duration-150'
                } ${
                  isActive(item.href)
                    ? 'text-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                } hover:bg-white/15 rounded-lg hover:shadow-md`}
                style={{
                  transitionDelay: mounted ? `${(index + 1) * 100}ms` : '0ms',
                  transition: mounted ? 'none' : 'transform 150ms ease-out',
                }}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[rgb(33,82,133)] transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            ))}

            {/* Dernek Hakkında Dropdown */}
            <div
              ref={aboutContainerRef}
              data-dropdown-container="about"
              className="relative"
              onMouseEnter={() => handleDropdownMouseEnter('about')}
              onMouseLeave={(e) => handleDropdownButtonMouseLeave(e, 'about')}
            >
              <button
                type="button"
                className={`relative px-4 py-2 text-sm font-medium cursor-pointer ${
                  mounted
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0 transition-transform duration-150'
                } ${
                  pathname.startsWith('/dernek-hakkinda')
                    ? 'text-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                } hover:bg-white/15 rounded-lg hover:shadow-md flex items-center space-x-1`}
                style={{
                  transitionDelay: mounted ? `${(navItems.length + 1) * 100}ms` : '0ms',
                  transition: mounted ? 'none' : 'transform 150ms ease-out',
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>{content.navigation.about}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu - Bridge gap with padding */}
              {activeDropdown === 'about' && (
                <div
                  className="absolute left-0 top-full pt-2"
                  data-dropdown-menu="about"
                  onMouseEnter={() => handleDropdownMenuMouseEnter('about')}
                  onMouseLeave={(e) => handleDropdownMenuMouseLeave(e, 'about')}
                >
                  <div className="glass-strong min-w-[200px] rounded-xl p-2 shadow-xl opacity-0 animate-[fade-in_0.2s_ease-out_forwards,slide-in-from-top_0.2s_ease-out_forwards] flex flex-col gap-1">
                    {aboutSubmenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-lg px-4 py-2.5 text-sm transition-all duration-200 ease-out hover:bg-white/20 hover:scale-[1.02] active:scale-95 hover:shadow-sm ${
                          isSubmenuActive(item.href)
                            ? 'bg-white/15 text-foreground font-semibold'
                            : 'text-foreground/80'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Üyelik Dropdown */}
            <div
              ref={membershipContainerRef}
              data-dropdown-container="membership"
              className="relative"
              onMouseEnter={() => handleDropdownMouseEnter('membership')}
              onMouseLeave={(e) => handleDropdownButtonMouseLeave(e, 'membership')}
            >
              <button
                type="button"
                className={`relative px-4 py-2 text-sm font-medium cursor-pointer ${
                  mounted
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0 transition-transform duration-150'
                } ${
                  pathname.startsWith('/uyelik')
                    ? 'text-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                } hover:bg-white/15 rounded-lg hover:shadow-md flex items-center space-x-1`}
                style={{
                  transitionDelay: mounted
                    ? `${(navItems.length + 2) * 100}ms`
                    : '0ms',
                  transition: mounted ? 'none' : 'transform 150ms ease-out',
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>{content.navigation.membership}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'membership' ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu - Bridge gap with padding */}
              {activeDropdown === 'membership' && (
                <div
                  className="absolute left-0 top-full pt-2"
                  data-dropdown-menu="membership"
                  onMouseEnter={() => handleDropdownMenuMouseEnter('membership')}
                  onMouseLeave={(e) => handleDropdownMenuMouseLeave(e, 'membership')}
                >
                  <div className="glass-strong min-w-[200px] rounded-xl p-2 shadow-xl opacity-0 animate-[fade-in_0.2s_ease-out_forwards,slide-in-from-top_0.2s_ease-out_forwards] flex flex-col gap-1">
                    {membershipSubmenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-lg px-4 py-2.5 text-sm transition-all duration-200 ease-out hover:bg-white/20 hover:scale-[1.02] active:scale-95 hover:shadow-sm ${
                          isSubmenuActive(item.href)
                            ? 'bg-white/15 text-foreground font-semibold'
                            : 'text-foreground/80'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ustore Link */}
            <a
              href={content.site.ustoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-sm font-medium ${
                mounted
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-8 opacity-0 transition-transform duration-150'
              } text-foreground/70 hover:text-foreground hover:bg-white/15 rounded-lg hover:shadow-md`}
              style={{
                transitionDelay: mounted
                  ? `${(navItems.length + 3) * 100}ms`
                  : '0ms',
                transition: mounted ? 'none' : 'transform 150ms ease-out',
              }}
            >
              Ustore
            </a>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 rounded-lg p-2 text-foreground transition-all duration-200 hover:bg-white/5 hover:scale-110 active:scale-95"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="glass-strong border-t border-white/10 py-4 md:hidden animate-[slide-in-from-top_0.2s_ease-out]">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-all duration-100 active:scale-95 ${
                    isActive(item.href)
                      ? 'bg-white/10 text-foreground'
                      : 'text-foreground/80 hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile: Dernek Hakkında */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className={`w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-all duration-200 active:scale-95 ${
                    pathname.startsWith('/dernek-hakkinda')
                      ? 'bg-white/10 text-foreground'
                      : 'text-foreground/80 hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{content.navigation.about}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileAboutOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {mobileAboutOpen && (
                  <div className="ml-4 space-y-1 border-l-2 border-white/10 pl-4">
                    {aboutSubmenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMobileAboutOpen(false);
                        }}
                        className={`block rounded-lg px-4 py-2 text-sm transition-all duration-200 active:scale-95 ${
                          isSubmenuActive(item.href)
                            ? 'bg-white/10 text-foreground font-semibold'
                            : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile: Üyelik */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileMembershipOpen(!mobileMembershipOpen)}
                  className={`w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-all duration-200 active:scale-95 ${
                    pathname.startsWith('/uyelik')
                      ? 'bg-white/10 text-foreground'
                      : 'text-foreground/80 hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{content.navigation.membership}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileMembershipOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {mobileMembershipOpen && (
                  <div className="ml-4 space-y-1 border-l-2 border-white/10 pl-4">
                    {membershipSubmenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMobileMembershipOpen(false);
                        }}
                        className={`block rounded-lg px-4 py-2 text-sm transition-all duration-200 active:scale-95 ${
                          isSubmenuActive(item.href)
                            ? 'bg-white/10 text-foreground font-semibold'
                            : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={content.site.ustoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-foreground/80 transition-all duration-200 active:scale-95 hover:bg-white/5 hover:text-foreground"
              >
                Ustore
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

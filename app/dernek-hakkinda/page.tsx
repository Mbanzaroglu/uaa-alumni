'use client';

import Link from 'next/link';
import content from '@/lib/constants/content.json';
import { useEffect, useState } from 'react';

export default function DernekHakkinda() {
  const [isVisible, setIsVisible] = useState(false);
  
  const pages = [
    { href: '/dernek-hakkinda/hakkimizda', title: 'Hakkımızda', description: 'Derneğimizin hikayesi ve misyonu' },
    { href: '/dernek-hakkinda/misyon-vizyon', title: 'Misyon & Vizyon', description: 'Hedeflerimiz ve gelecek planlarımız' },
    { href: '/dernek-hakkinda/mezunlar-evi', title: 'Mezunlar Evi', description: 'Mezunlar evimiz hakkında bilgiler' },
    { href: '/dernek-hakkinda/yonetim', title: 'Yönetim Kurulu', description: 'Derneğimizi yöneten değerli üyelerimiz' },
    { href: '/dernek-hakkinda/gizlilik-politikasi', title: 'Gizlilik Politikası', description: 'Kişisel verilerin korunması' },
  ];

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gray-950">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(33,82,133,0.15) 0%, transparent 50%)',
          opacity: isVisible ? 0.3 : 0
        }}
      />
      
      <div className="relative mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-12">
        {/* Header Minimal - Center Aligned */}
        <div 
          className="text-center mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transitionDelay: '100ms'
          }}
        >
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
            {content.about.title}
          </h1>
        </div>

        {/* Section Block - Intro */}
        <div 
          className="mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transitionDelay: '300ms'
          }}
        >
          <div className="text-xs text-white/40 mb-6 text-center uppercase tracking-widest font-mono" style={{ letterSpacing: '0.3em' }}>
            Tanıtım
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-white/70 text-center font-light max-w-3xl mx-auto" style={{ lineHeight: '2.2' }}>
            {content.about.description}
          </p>
        </div>

        {/* Cards Minimal - Center Aligned */}
        <div className="space-y-0">
          {pages.map((page, index) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block py-10 border-t border-white/10 text-center transition-all duration-300 hover:bg-white/5 hover:border-[rgb(33,82,133)]/30"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 600ms ease-out ${500 + index * 100}ms, transform 600ms ease-out ${500 + index * 100}ms, background-color 300ms, border-color 300ms`
              }}
            >
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4 group-hover:text-[rgb(60,120,180)] transition-colors duration-300">
                {page.title}
              </h3>
              <p className="text-base md:text-lg text-white/60 group-hover:text-white/80 transition-colors duration-300">
                {page.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


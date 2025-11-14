'use client';

import { useState, useEffect } from 'react';
import content from '@/lib/constants/content.json';
import pastPeriodsData from '@/lib/constants/past-periods.json';
import currentManagementData from '@/lib/constants/current-management.json';

// Geçmiş dönem verileri
const pastPeriods = pastPeriodsData.periods;

// Mezuniyet yılını formatla: "1984" -> "'84"
const formatGraduationYear = (year: string): string => {
  if (year.length === 4) {
    return `'${year.slice(-2)}`;
  }
  return year;
};

export default function Yonetim() {
  const [showPast, setShowPast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Mobil için expanded state'ler - key: "management-{index}" veya "audit-{index}"
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (showPast) {
      // Reset and restart animation when switching to past
      const timer = setTimeout(() => {
        setIsVisible(false);
        setSelectedIndex(0);
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [showPast]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gray-950">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(33,82,133,0.15) 0%, transparent 50%)'
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-white">
              {content.management.title}
          </h1>
          <p className="text-xl text-white/60">{content.management.subtitle}</p>
        </div>

        {/* Switch Button - Animated */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1.5 shadow-lg">
            {/* Animated Slider Background */}
            <div
              className={`absolute h-[calc(100%-12px)] rounded-lg bg-gradient-to-r from-[rgb(33,82,133)] to-[rgb(60,120,180)] transition-all duration-500 ease shadow-lg`}
              style={{
                width: 'calc(50% - 6px)',
                left: showPast ? 'calc(50% + 3px)' : '6px',
                boxShadow: '0 4px 12px rgba(33,82,133,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset'
              }}
            />
            <button
              onClick={() => setShowPast(false)}
              className={`relative z-10 px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-500 ease cursor-pointer ${
                !showPast
                  ? 'text-white drop-shadow-md'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              Mevcut Yönetim
            </button>
            <button
              onClick={() => setShowPast(true)}
              className={`relative z-10 px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-500 ease cursor-pointer ${
                showPast
                  ? 'text-white drop-shadow-md'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              Geçmiş Dönemler
            </button>
          </div>
        </div>

        {/* Content - Switch between Current and Past */}
        <div className="relative min-h-[400px]">
          {!showPast ? (
            <>
              {/* Current Management - Split Reveal Design */}
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-light text-white mb-2">{currentManagementData.yönetim_dönemi} Dönemi</h2>
                <p className="text-white/60">Yönetim Kurulu</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
                {currentManagementData.yönetim_kurulu.map((member, index) => {
                  const cardKey = `management-${index}`;
                  const isExpanded = expandedCards[cardKey];
                  const toggleCard = () => {
                    setExpandedCards(prev => ({
                      ...prev,
                      [cardKey]: !prev[cardKey]
                    }));
                  };
                  
                  return (
                  <div
                    key={index}
                      onClick={toggleCard}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10"
                    style={{
                      minHeight: '400px'
                    }}
                  >
                    {/* Member Photo/Icon */}
                    <div 
                        className={`w-full h-full min-h-[400px] bg-gradient-to-br from-[rgb(33,82,133)]/40 to-[rgb(60,120,180)]/40 flex items-center justify-center transition-all duration-500 ease-out group-hover:brightness-[0.6] group-hover:saturate-[1.3] md:group-hover:brightness-[0.6] md:group-hover:saturate-[1.3] ${
                          isExpanded ? 'brightness-[0.6] saturate-[1.3]' : ''
                        }`}
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                        className="h-32 w-32 text-white/30 transition-all duration-500 group-hover:scale-110"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>

                      {/* Overlay Container - Minimalist Layout */}
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Top Center - Name */}
                      <div 
                          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 transition-all duration-500 ease ${
                            isExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                          }`}
                        style={{
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '80ms'
                        }}
                      >
                          <h3 className="text-2xl md:text-3xl font-light text-white text-center tracking-tight">
                          {member.isim}
                        </h3>
                      </div>

                        {/* Top Right - Graduation Year */}
                      <div 
                          className={`absolute top-4 right-4 transition-all duration-500 ease ${
                            isExpanded 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                          }`}
                          style={{
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '120ms'
                          }}
                        >
                          <div className="bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                            <p className="text-sm font-medium text-white tabular-nums tracking-tight">
                              {formatGraduationYear(member.mezun_yılı)}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Left - Role */}
                        <div 
                          className={`absolute bottom-4 left-4 transition-all duration-500 ease ${
                            isExpanded 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                          }`}
                        style={{
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '160ms'
                        }}
                      >
                          <div className="bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                            <p className="text-xs font-normal text-white/90 uppercase tracking-wider">
                              {member.görev}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Denetim Kurulu Section */}
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-light text-white mb-2">Denetim Kurulu</h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentManagementData.denetim_kurulu.map((member, index) => {
                  const cardKey = `audit-${index}`;
                  const isExpanded = expandedCards[cardKey];
                  const toggleCard = () => {
                    setExpandedCards(prev => ({
                      ...prev,
                      [cardKey]: !prev[cardKey]
                    }));
                  };
                  
                  return (
                  <div
                    key={index}
                      onClick={toggleCard}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10"
                    style={{
                      minHeight: '400px'
                    }}
                  >
                    {/* Member Photo/Icon */}
                    <div 
                        className={`w-full h-full min-h-[400px] bg-gradient-to-br from-[rgb(33,82,133)]/40 to-[rgb(60,120,180)]/40 flex items-center justify-center transition-all duration-500 ease-out group-hover:brightness-[0.6] group-hover:saturate-[1.3] md:group-hover:brightness-[0.6] md:group-hover:saturate-[1.3] ${
                          isExpanded ? 'brightness-[0.6] saturate-[1.3]' : ''
                        }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-32 w-32 text-white/30 transition-all duration-500 group-hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                          strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    </div>

                      {/* Overlay Container - Minimalist Layout */}
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Top Center - Name */}
                      <div 
                          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 transition-all duration-500 ease ${
                            isExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                          }`}
                        style={{
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '80ms'
                        }}
                      >
                          <h3 className="text-2xl md:text-3xl font-light text-white text-center tracking-tight">
                          {member.isim}
                        </h3>
                      </div>

                        {/* Top Right - Graduation Year */}
                      <div 
                          className={`absolute top-4 right-4 transition-all duration-500 ease ${
                            isExpanded 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                          }`}
                          style={{
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '120ms'
                          }}
                        >
                          <div className="bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                            <p className="text-sm font-medium text-white tabular-nums tracking-tight">
                              {formatGraduationYear(member.mezun_yılı)}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Left - Role */}
                        <div 
                          className={`absolute bottom-4 left-4 transition-all duration-500 ease ${
                            isExpanded 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                          }`}
                        style={{
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '160ms'
                        }}
                      >
                          <div className="bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                            <p className="text-xs font-normal text-white/90 uppercase tracking-wider">
                              {member.görev}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div 
              className="w-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease-out 200ms, transform 700ms ease-out 200ms'
              }}
            >
              {/* Elegant Period Selector */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white cursor-pointer focus:outline-none focus:border-[rgb(33,82,133)] transition-all duration-300 hover:bg-white/10 flex items-center gap-3 min-w-[280px]"
                  >
                    <span className="flex-1 text-left">{pastPeriods[selectedIndex]?.period}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl max-h-[400px] overflow-y-auto">
                      {pastPeriods.map((period, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedIndex(index);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-6 py-3 text-left text-white transition-all duration-200 hover:bg-white/10 border-b border-white/5 last:border-0 ${
                            selectedIndex === index ? 'bg-[rgb(33,82,133)]/30' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{period.period}</span>
                            {selectedIndex === index && (
                              <svg className="w-5 h-5 text-[rgb(33,82,133)]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Timeline Display - Split or Single Column */}
              {pastPeriods[selectedIndex] && (
                <div 
                  className="w-full"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 700ms ease-out 200ms, transform 700ms ease-out 200ms'
                  }}
                >
                  {/* Period Title */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
                      {pastPeriods[selectedIndex].period}
                    </h2>
                  </div>

                  {/* Timeline Container - Split on Desktop, Single on Mobile */}
                  <div className="relative max-w-7xl mx-auto">
                    {/* Mobile: Continuous Vertical Timeline */}
                    <div className="md:hidden relative">
                      {/* Vertical Timeline Line with Gradient */}
                      <div className="absolute left-8 top-0 bottom-0 w-px">
                        <div 
                          className="w-full h-full transition-all duration-700 ease-out origin-top"
                          style={{
                            height: isVisible ? '100%' : '0%',
                            background: 'linear-gradient(to bottom, rgba(33,82,133,0.8) 0%, rgba(33,82,133,0.4) 50%, rgba(255,255,255,0.1) 100%)',
                            boxShadow: '0 0 8px rgba(33,82,133,0.4)'
                          }}
                        />
                      </div>

                      {/* Bright Dot at Top */}
                      <div 
                        className="absolute left-6 top-0 w-4 h-4 rounded-full bg-[rgb(33,82,133)] border-2 border-gray-950 transition-all duration-500"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          boxShadow: '0 0 16px rgba(33,82,133,0.8)',
                          transform: 'translateY(-8px)'
                        }}
                      />

                      {/* Content */}
                      <div className="pl-16 space-y-8">
                        {Object.entries(pastPeriods[selectedIndex].members).map(([role, names]) => (
                          <div key={role} className="space-y-4">
                            <div className="text-xs text-white/40 uppercase tracking-widest font-mono" style={{ letterSpacing: '0.1em' }}>
                              {role}
                            </div>
                            <div className="space-y-3">
                              {(names as string[]).map((name: string, nameIndex: number) => (
                                <div
                                  key={nameIndex}
                                  className="text-base text-white/80 leading-relaxed border-b border-white/5 pb-3 last:border-0"
                                >
                                  {name}
                                </div>
                              ))}
                            </div>
            </div>
          ))}
        </div>
                    </div>

                    {/* Desktop: Single Column for md, Two Columns for lg+ */}
                    
                    {/* Single Column Timeline for md screens */}
                    <div className="hidden md:block lg:hidden relative">
                      {/* Vertical Timeline Line with Gradient */}
                      <div className="absolute left-0 top-0 bottom-0 w-px">
                        <div 
                          className="w-full h-full transition-all duration-700 ease-out origin-top"
                          style={{
                            height: isVisible ? '100%' : '0%',
                            background: 'linear-gradient(to bottom, rgba(33,82,133,0.8) 0%, rgba(33,82,133,0.4) 50%, rgba(255,255,255,0.1) 100%)',
                            boxShadow: '0 0 8px rgba(33,82,133,0.4)'
                          }}
                        />
                      </div>

                      {/* Bright Dot at Top */}
                      <div 
                        className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[rgb(33,82,133)] border-2 border-gray-950 transition-all duration-500"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          boxShadow: '0 0 16px rgba(33,82,133,0.8)',
                          transform: 'translateY(-8px)'
                        }}
                      />

                      {/* Content - All entries in single column */}
                      <div className="pl-8 space-y-8">
                        {Object.entries(pastPeriods[selectedIndex].members).map(([role, names]) => (
                          <div key={role} className="space-y-4">
                            <div className="text-xs text-white/40 uppercase tracking-widest font-mono" style={{ letterSpacing: '0.1em' }}>
                              {role}
                            </div>
                            <div className="space-y-3">
                              {(names as string[]).map((name: string, nameIndex: number) => (
                                <div
                                  key={nameIndex}
                                  className="text-base text-white/80 leading-relaxed border-b border-white/5 pb-3 last:border-0"
                                >
                                  {name}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Two Columns Timeline for lg+ screens */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12">
                      {/* Left Column Timeline */}
                      <div className="relative">
                        {/* Vertical Timeline Line with Gradient */}
                        <div className="absolute left-0 top-0 bottom-0 w-px">
                          <div 
                            className="w-full h-full transition-all duration-700 ease-out origin-top"
                            style={{
                              height: isVisible ? '100%' : '0%',
                              background: 'linear-gradient(to bottom, rgba(33,82,133,0.8) 0%, rgba(33,82,133,0.4) 50%, rgba(255,255,255,0.1) 100%)',
                              boxShadow: '0 0 8px rgba(33,82,133,0.4)'
                            }}
                          />
                        </div>

                        {/* Bright Dot at Top */}
                        <div 
                          className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[rgb(33,82,133)] border-2 border-gray-950 transition-all duration-500"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            boxShadow: '0 0 16px rgba(33,82,133,0.8)',
                            transform: 'translateY(-8px)'
                          }}
                        />

                        {/* Content - First Column (Before Denetim Kurulu) */}
                        <div className="pl-8 space-y-8">
                          {Object.entries(pastPeriods[selectedIndex].members)
                            .filter(([role]) => !role.toLowerCase().includes('denetim') && !role.toLowerCase().includes('denetleme'))
                            .map(([role, names]) => (
                            <div key={role} className="space-y-4">
                              <div className="text-xs text-white/40 uppercase tracking-widest font-mono" style={{ letterSpacing: '0.1em' }}>
                                {role}
                              </div>
                              <div className="space-y-3">
                                {(names as string[]).map((name: string, nameIndex: number) => (
                                  <div
                                    key={nameIndex}
                                    className="text-base text-white/80 leading-relaxed border-b border-white/5 pb-3 last:border-0"
                                  >
                                    {name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column Timeline */}
                      <div className="relative">
                        {/* Vertical Timeline Line with Gradient */}
                        <div className="absolute left-0 top-0 bottom-0 w-px">
                          <div 
                            className="w-full h-full transition-all duration-700 ease-out origin-top"
                            style={{
                              height: isVisible ? '100%' : '0%',
                              background: 'linear-gradient(to bottom, rgba(33,82,133,0.8) 0%, rgba(33,82,133,0.4) 50%, rgba(255,255,255,0.1) 100%)',
                              boxShadow: '0 0 8px rgba(33,82,133,0.4)'
                            }}
                          />
                        </div>

                        {/* Bright Dot at Top */}
                        <div 
                          className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[rgb(33,82,133)] border-2 border-gray-950 transition-all duration-500"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            boxShadow: '0 0 16px rgba(33,82,133,0.8)',
                            transform: 'translateY(-8px)'
                          }}
                        />

                        {/* Content - Second Column (Denetim Kurulu and after) */}
                        <div className="pl-8 space-y-8">
                          {Object.entries(pastPeriods[selectedIndex].members)
                            .filter(([role]) => role.toLowerCase().includes('denetim') || role.toLowerCase().includes('denetleme'))
                            .map(([role, names]) => (
                            <div key={role} className="space-y-4">
                              <div className="text-xs text-white/40 uppercase tracking-widest font-mono" style={{ letterSpacing: '0.1em' }}>
                                {role}
                              </div>
                              <div className="space-y-3">
                                {(names as string[]).map((name: string, nameIndex: number) => (
                                  <div
                                    key={nameIndex}
                                    className="text-base text-white/80 leading-relaxed border-b border-white/5 pb-3 last:border-0"
                                  >
                                    {name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Close dropdown when clicking outside */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect, useMemo } from 'react';
import content from '@/lib/constants/content.json';
import newsData from '@/lib/constants/news.json';

const ITEMS_PER_PAGE = 6;

export default function Haberler() {
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeSidePanel = () => {
    setIsPanelOpen(false);
    setSelectedNews(null);
  };

  const openSidePanel = (itemIndex: number) => {
    setSelectedNews(itemIndex);
    setIsPanelOpen(true);
  };

  // Body overflow kontrolü
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPanelOpen]);

  // ESC tuşu ile paneli kapat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        closeSidePanel();
      }
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, isDropdownOpen]);

  // Dropdown dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Filtrelenmiş ve sıralanmış haberler
  const filteredAndSortedNews = useMemo(() => {
    let filtered = [...newsData.news];

    // Tarih filtresi
    if (dateFilter) {
      filtered = filtered.filter(item => {
        const itemYear = new Date(item.date).getFullYear().toString();
        return itemYear === dateFilter;
      });
    }

    // Arama filtresi (title'a göre)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query)
      );
    }

    // Tarihe göre sıralama (yeni -> eski)
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return filtered;
  }, [searchQuery, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedNews.length / ITEMS_PER_PAGE);
  const validPage = useMemo(() => {
    if (totalPages === 0) return 1;
    return currentPage > totalPages ? 1 : currentPage;
  }, [currentPage, totalPages]);
  
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNews = filteredAndSortedNews.slice(startIndex, endIndex);

  // Animation key: filtre veya sayfa değiştiğinde component'leri remount ederek animasyonu tetikler
  const animationKey = useMemo(() => {
    return `${searchQuery}-${dateFilter}-${validPage}`;
  }, [searchQuery, dateFilter, validPage]);

  // Sayfa değiştiğinde scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [validPage]);

  // ValidPage ile currentPage'i senkronize et (sadece gerekirse)
  useEffect(() => {
    if (validPage !== currentPage) {
      const timer = setTimeout(() => {
        setCurrentPage(validPage);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [validPage, currentPage]);


  // Handler functions
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  // Tarih yılları (unique years)
  const availableYears = useMemo(() => {
    const years = new Set(
      newsData.news.map(item => new Date(item.date).getFullYear().toString())
    );
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  // Original index bulma (panel için)
  const getOriginalIndex = (filteredIndex: number) => {
    const item = paginatedNews[filteredIndex];
    return newsData.news.findIndex(n => n.title === item.title && n.date === item.date);
  };

  const selectedItem = selectedNews !== null ? newsData.news[selectedNews] : null;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gray-950">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(33,82,133,0.15) 0%, transparent 50%)'
        }}
      />
      
      <div className="relative mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="mb-3 text-5xl font-bold text-white tracking-tight">
              {content.news.title}
          </h1>
          <p className="text-lg text-white/60">{content.news.subtitle}</p>
          {newsData.total_count && (
            <p className="text-sm text-white/40 mt-3">{newsData.total_count} haber</p>
          )}
        </div>

        {/* Search and Filter - Minimalist & Elegant */}
        <div className="mb-16 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Search Input */}
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Ara..."
                className="w-full px-0 py-4 bg-transparent border-0 text-white placeholder:text-white/40 focus:outline-none transition-colors duration-200"
              />
              {/* Underline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-[rgb(33,82,133)] transition-all duration-200 ${searchQuery ? 'w-full' : 'w-0'}`}></div>
            </div>

            {/* Date Filter - Custom Dropdown */}
            <div className="relative" data-dropdown>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-0 py-4 pr-8 bg-transparent border-0 text-left text-white/60 focus:outline-none transition-colors duration-200 cursor-pointer flex items-center justify-between"
              >
                <span>{dateFilter || 'Tüm Yıllar'}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Underline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-[rgb(33,82,133)] transition-all duration-200 ${isDropdownOpen || dateFilter ? 'w-full' : 'w-0'}`}></div>

              {/* Dropdown Menu - Opens below */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-950 border border-white/10 shadow-lg z-50 max-h-60 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => handleDateFilterChange('')}
                    className={`w-full px-4 py-3 text-left text-white hover:bg-white/5 transition-colors duration-150 ${
                      !dateFilter ? 'bg-white/5' : ''
                    }`}
                  >
                    Tüm Yıllar
                  </button>
                  {availableYears.map(year => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => handleDateFilterChange(year)}
                      className={`w-full px-4 py-3 text-left text-white hover:bg-white/5 transition-colors duration-150 ${
                        dateFilter === year ? 'bg-white/5' : ''
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          {filteredAndSortedNews.length > 0 && (
            <p className="text-sm text-white/40">
              {filteredAndSortedNews.length} sonuç
            </p>
          )}
        </div>

        {/* Timeline News List - Minimalist */}
        {paginatedNews.length > 0 ? (
          <>
            <div key={animationKey} className="space-y-16">
              {paginatedNews.map((item, index) => {
                const originalIndex = getOriginalIndex(index);
                const itemDate = new Date(item.date);
                const formattedDate = itemDate.toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }).toUpperCase();
                
                return (
                  <div
                    key={`${item.title}-${item.date}-${animationKey}`}
                    className="relative border-l border-white/20 pl-8 cursor-pointer group news-card-animate"
                    onClick={() => openSidePanel(originalIndex)}
                    style={{
                      animation: `fadeInSlide 600ms ease-out ${index * 100}ms both`
                    }}
                  >
                    {/* Dot at top-left corner */}
                    <div className="absolute -left-1.5 top-0">
                      <div className="w-3 h-3 rounded-full bg-[rgb(33,82,133)] group-hover:bg-[rgb(60,120,180)] transition-colors duration-200"></div>
                    </div>
                    
                    {/* Date */}
                    <div 
                      className="text-xs text-white/40 mb-3 font-mono uppercase"
                      style={{ letterSpacing: '0.2em' }}
                    >
                      {formattedDate}
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[rgb(60,120,180)] transition-colors duration-200">
                      {item.title}
                    </h2>
                    
                    {/* Summary */}
                    {item.summary && (
                      <p className="text-white/60 leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    )}
                  </div>
                );
                })}
              </div>
              
            {/* Pagination - Minimalist */}
            {totalPages > 1 && (() => {
              const getPageNumbers = () => {
                const pages: (number | string)[] = [];
                const current = validPage;
                const total = totalPages;

                if (total <= 7) {
                  for (let i = 1; i <= total; i++) {
                    pages.push(i);
                  }
                } else {
                  if (current <= 3) {
                    pages.push(1);
                    pages.push(2);
                    pages.push(3);
                    pages.push('...');
                    pages.push(total - 1);
                    pages.push(total);
                  } else if (current >= total - 2) {
                    pages.push(1);
                    pages.push('...');
                    pages.push(total - 2);
                    pages.push(total - 1);
                    pages.push(total);
                  } else {
                    pages.push(1);
                    pages.push('...');
                    pages.push(current - 1);
                    pages.push(current);
                    pages.push(current + 1);
                    pages.push('...');
                    pages.push(total);
                  }
                }

                return pages;
              };

              const pageNumbers = getPageNumbers();

              return (
                <div className="mt-20 flex flex-wrap items-center justify-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={validPage === 1}
                    className="px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Önceki
                  </button>

                  {pageNumbers.map((page, index) => {
                    if (page === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 py-2 text-white/40"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`px-4 py-2 transition-colors duration-200 ${
                          validPage === page
                            ? 'text-[rgb(33,82,133)] font-semibold'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={validPage === totalPages}
                    className="px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Sonraki
                  </button>
                </div>
              );
            })()}
          </>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-xl text-white/70">Aradığınız kriterlere uygun haber bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[998] ${
          isPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'opacity 300ms ease',
          WebkitTransition: 'opacity 300ms ease',
          MozTransition: 'opacity 300ms ease',
          OTransition: 'opacity 300ms ease'
        }}
        onClick={closeSidePanel}
      />

      {/* Side Panel - Minimalist */}
      <div
        className={`fixed bottom-0 md:bottom-auto md:right-0 md:top-0 w-full md:w-[600px] max-w-[100vw] h-full bg-gray-950 z-[999] overflow-y-auto ${
          isPanelOpen 
            ? 'translate-y-0 md:translate-x-0' 
            : 'translate-y-full md:translate-y-0 md:translate-x-full'
        }`}
        style={{
          willChange: 'transform',
          transitionProperty: 'transform',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease',
          WebkitTransitionProperty: 'transform',
          WebkitTransitionDuration: '300ms',
          WebkitTransitionTimingFunction: 'ease',
          MozTransitionProperty: 'transform',
          MozTransitionDuration: '300ms',
          MozTransitionTimingFunction: 'ease'
        }}
      >
        {/* Close Button - Minimalist */}
        {selectedItem && isPanelOpen && (
          <button
            onClick={closeSidePanel}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/60 hover:text-white transition-colors duration-200 z-20"
            aria-label="Paneli Kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Panel Content - Minimalist */}
        {selectedItem && isPanelOpen && (
          <div className="p-8 md:p-12 pt-16 md:pt-20">
            {/* Date */}
            <div className="text-xs text-white/40 mb-6 tracking-wider uppercase">
              {new Date(selectedItem.date).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }).toUpperCase()}
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
              {selectedItem.title}
              </h2>
              
            {/* Full Content */}
            {selectedItem.body && (
              <div className="text-white/70 leading-relaxed space-y-6 whitespace-pre-line">
                {selectedItem.body.split('\n').map((paragraph, idx) => 
                  paragraph.trim() ? (
                    <p key={idx} className="text-base md:text-lg">{paragraph}</p>
                  ) : null
                )}
              </div>
            )}
            
            {/* Detail URL Link */}
            {selectedItem.detail_url && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <a
                  href={selectedItem.detail_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[rgb(60,120,180)] hover:text-[rgb(90,150,220)] transition-colors duration-200"
                >
                  Haberin devamını oku
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
}

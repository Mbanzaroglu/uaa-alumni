'use client';

import Image from 'next/image';
import { useState, useLayoutEffect, useRef } from 'react';

export default function MezunlarEvi() {
  const [imageVisible, setImageVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleText, setSubtitleText] = useState('');
  const [infoSectionVisible, setInfoSectionVisible] = useState(false);
  const fullSubtitle = 'Mezunlar Evi - UAA Dostluk ve Buluşma Mekanı';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date: '',
    startTime: '',
    endTime: '',
    numberOfPeople: '',
    email: '',
    phone: '',
    purpose: '',
    captcha: ''
  });

  // Resim ve başlık animasyonları için
  const currentIndexRef = useRef(0);
  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    // Resim animasyonu - küçük bir gecikme ile başlat
    let imageTimer: NodeJS.Timeout;
    const rafId = requestAnimationFrame(() => {
      imageTimer = setTimeout(() => {
        setImageVisible(true);
      }, 150);
    });

    // Başlık animasyonu - resimden sonra
    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 500);

    // Typewriter efekti - başlıktan sonra
    currentIndexRef.current = 0;
    const typewriterTimer = setTimeout(() => {
      typeIntervalRef.current = setInterval(() => {
        if (currentIndexRef.current < fullSubtitle.length) {
          setSubtitleText(fullSubtitle.slice(0, currentIndexRef.current + 1));
          currentIndexRef.current++;
        } else {
          if (typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
            typeIntervalRef.current = null;
          }
        }
      }, 30); // Her karakter için 50ms
    }, 700);

    // Bilgi bölümü animasyonu - typewriter'dan sonra
    const infoSectionTimer = setTimeout(() => {
      setInfoSectionVisible(true);
    }, 750);

    return () => {
      cancelAnimationFrame(rafId);
      if (imageTimer) clearTimeout(imageTimer);
      clearTimeout(titleTimer);
      clearTimeout(typewriterTimer);
      clearTimeout(infoSectionTimer);
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }
    };
  }, [fullSubtitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0f1e]">
      {/* Hero Section with Image and Gradient Overlay */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0"
            style={{ 
              opacity: imageVisible ? 1 : 0,
              transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Image
              src="/images/mezunlar-evi.png"
              alt="Kinney Cottage - Mezunlar Evi"
              fill
              className="object-cover grayscale"
              priority
              quality={90}
            />
            {/* Gradient Overlay - bottom to top, 0 to opaque */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.7) 40%, transparent 70%)'
              }}
            />
        </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16 lg:p-20">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? 'translateX(0)' : 'translateX(-100px)',
                transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform, opacity'
              }}
            >
              Kinney Cottage
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-white/80 font-light"
              style={{ minHeight: '1.5em' }}
            >
              {subtitleText}
              {subtitleText.length < fullSubtitle.length && (
                <span className="animate-pulse">|</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Modern Info Section - Minimalist Design */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div 
          className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-6 md:gap-8 py-8 border-t border-white/5"
          style={{
            opacity: infoSectionVisible ? 1 : 0,
            transform: infoSectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Kullanım Saatleri */}
          <div className="flex items-center gap-4 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(33,82,133,0.1)] border border-[rgba(33,82,133,0.2)] group-hover:bg-[rgba(33,82,133,0.2)] transition-all duration-300">
              <svg className="w-5 h-5 text-[rgb(60,120,180)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-white/40 font-medium mb-1">Kullanım Saatleri</span>
              <span className="text-base text-white font-light">10:00 - 24:00</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-white/5" />

          {/* Mekan Ücreti */}
          <div className="flex items-center gap-4 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(33,82,133,0.1)] border border-[rgba(33,82,133,0.2)] group-hover:bg-[rgba(33,82,133,0.2)] transition-all duration-300">
              <svg className="w-5 h-5 text-[rgb(60,120,180)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-white/40 font-medium mb-1">Mekan Ücreti</span>
              <span className="text-base text-white font-light">350 TL / gün</span>
                </div>
              </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-white/5" />

          {/* Telefon */}
          <div className="flex items-center gap-4 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(33,82,133,0.1)] border border-[rgba(33,82,133,0.2)] group-hover:bg-[rgba(33,82,133,0.2)] transition-all duration-300">
              <svg className="w-5 h-5 text-[rgb(60,120,180)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-white/40 font-medium mb-1">Telefon</span>
              <a href="tel:+902163349221" className="text-base text-white font-light hover:text-[rgb(60,120,180)] transition-colors duration-200">
                (0216) 334 92 21
                  </a>
                </div>
              </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-white/5" />

          {/* E-posta */}
          <div className="flex items-center gap-4 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(33,82,133,0.1)] border border-[rgba(33,82,133,0.2)] group-hover:bg-[rgba(33,82,133,0.2)] transition-all duration-300">
              <svg className="w-5 h-5 text-[rgb(60,120,180)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-white/40 font-medium mb-1">E-posta</span>
              <a href="mailto:alumniuaa@uaa.k12.tr" className="text-base text-white font-light hover:text-[rgb(60,120,180)] transition-colors duration-200">
                alumniuaa@uaa.k12.tr
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(33,82,133,0.2)] rounded-2xl p-8 sm:p-12 md:p-16">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10 text-center">
            Rezervasyon Formu
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Adı */}
              <div className="flex flex-col">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Adı <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Adınız"
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-white/30"
                  required
                />
              </div>

              {/* Soyadı */}
              <div className="flex flex-col">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Soyadı <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Soyadınız"
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-white/30"
                  required
                />
              </div>

              {/* Tarih */}
              <div className="flex flex-col">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Tarih <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] [color-scheme:dark]"
                  required
                />
              </div>

              {/* Saat Başlangıç */}
              <div className="flex flex-col">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Saat Başlangıç <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] [color-scheme:dark]"
                  required
                />
              </div>

              {/* Saat Bitiş */}
              <div className="flex flex-col">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Saat Bitiş <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] [color-scheme:dark]"
                  required
                />
              </div>

              {/* Kişi Sayısı */}
              <div className="flex flex-col">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Kişi Sayısı <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                  placeholder="Kişi sayısı"
                  min="1"
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-white/30 [color-scheme:dark]"
                  required
                />
              </div>

              {/* E-Posta - spans 2 columns */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  E-Posta <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-posta adresiniz"
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-white/30"
                  required
                />
                </div>

              {/* Cep Telefon */}
              <div className="flex flex-col">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Cep Telefon <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Telefon numaranız"
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-white/30"
                  required
                />
              </div>

              {/* Kullanım Amacı - spans all columns */}
              <div className="flex flex-col md:col-span-3">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Kullanım Amacı
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Kullanım amacınızı belirtiniz"
                  rows={4}
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-white/30 resize-y min-h-[100px]"
                />
              </div>

              {/* Güvenlik Kodu */}
              <div className="flex flex-col md:col-span-3">
                <label className="text-sm text-white/70 mb-2 font-medium">
                  Güvenlik Kodu <span className="text-[rgb(60,120,180)]">*</span>
                </label>
                <div className="flex gap-3 items-stretch">
                  <div className="flex-1 bg-[rgba(255,255,255,0.08)] px-4 py-3 font-mono text-lg tracking-widest border border-white/10 rounded-lg text-[rgb(90,150,220)] text-center flex items-center justify-center">
                    13754
                  </div>
                  <input
                    type="text"
                    name="captcha"
                    value={formData.captcha}
                    onChange={handleInputChange}
                    placeholder="Kodu giriniz"
                    maxLength={5}
                    className="flex-1 px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-white/10 text-white text-base rounded-lg transition-all duration-300 focus:outline-none focus:border-[rgb(33,82,133)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-white/30"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[rgb(33,82,133)] text-white px-12 py-4 text-base font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-[rgb(60,120,180)] hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(33,82,133,0.4)]"
              >
                Rezervasyon Talebi Gönder
              </button>
            </div>
          </form>
                </div>
      </section>

      {/* Modern Information Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative">
          {/* Asymmetric Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
            {/* Left Column - Main Description */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                <div className="inline-block mb-6">
                  <div className="h-1 w-20 bg-gradient-to-r from-[rgb(33,82,133)] to-[rgb(60,120,180)] rounded-full mb-4"></div>
                </div>
                <p className="text-xl sm:text-2xl text-white/90 font-light leading-relaxed max-w-2xl">
                  <span className="text-white font-normal">KINNEY COTTAGE</span>, tüm üyelerimizin UAA&apos;li dostlarıyla birlikte, yılbaşı, doğum günü gibi özel günlerini düzenleyebileceği buluşma mekanımızdır.
                </p>
              </div>
            </div>

            {/* Right Column - Key Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Rezervasyon Info */}
              <div className="border-l-2 border-[rgb(33,82,133)]/30 pl-6 py-2">
                <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
                  Rezervasyon
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Talebiniz en az <span className="text-white font-medium">bir hafta</span> önceden form ile iletilmelidir.
                </p>
                <p className="text-white/80 text-sm leading-relaxed mt-2">
                  Durum, mekan müsaitliğine göre en geç <span className="text-white font-medium">ertesi iş günü</span> içinde bildirilir.
                </p>
          </div>

              {/* İletişim Saatleri */}
              <div className="border-l-2 border-[rgb(33,82,133)]/30 pl-6 py-2">
                <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
                  İletişim Saatleri
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Bilgi ve özel talepler için <span className="text-white font-medium">09:00-16:00</span> saatleri arasında derneğimiz ile iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

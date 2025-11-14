'use client';

import { useState } from 'react';
import content from '@/lib/constants/content.json';

export default function UyeOl() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    graduationYear: '',
    department: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Üyelik başvurunuz alınmıştır! (Demo - Backend entegrasyonu yapılmamıştır)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10" />
      
      <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-[rgb(33,82,133)] to-[rgb(60,120,180)] bg-clip-text text-transparent">
              Üyelik Başvurusu
            </span>
          </h1>
          <p className="text-xl text-foreground/70">
            Derneğimize katılmak için lütfen formu doldurun
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-strong rounded-xl p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                Ad Soyad *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="glass-light w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="Adınız ve soyadınız"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                E-posta *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="glass-light w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="glass-light w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="+90 555 123 45 67"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="graduationYear" className="mb-2 block text-sm font-medium text-foreground">
                  Mezuniyet Yılı
                </label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="glass-light w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="2020"
                  min="1950"
                  max={new Date().getFullYear()}
                />
              </div>

              <div>
                <label htmlFor="department" className="mb-2 block text-sm font-medium text-foreground">
                  Fakülte/Bölüm
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="glass-light w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Mühendislik Fakültesi"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="glass-light w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                placeholder="İletmek istediğiniz mesajınız..."
              />
            </div>

            <button
              type="submit"
              className="glass-strong w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 sm:w-auto sm:px-12"
            >
              Başvuruyu Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


# UAA Alumni - Uludağ Üniversitesi Mezunlar Derneği

Modern, glassmorphism tasarımlı, mobile-first yaklaşımla geliştirilmiş mezunlar derneği web sitesi.

## Özellikler

- 🎨 **Glassmorphism Tasarım**: Modern ve minimalist glassmorphism efektleri
- 🌙 **Light/Dark Mode**: Sistem tercihine göre otomatik tema yönetimi
- 📱 **Mobile-First**: Tüm cihazlarda mükemmel görünüm
- ⚡ **Next.js 16**: App Router ile yüksek performanslı React uygulaması
- 🎯 **TypeScript**: Tip güvenli kod yapısı
- 🎭 **Tailwind CSS**: Hızlı ve esnek stil yönetimi
- 📦 **JSON İçerik Yönetimi**: Kolay içerik güncellemeleri için JSON tabanlı sistem

## Teknolojiler

- **Next.js 16** - React framework
- **TypeScript** - Tip güvenli JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **next-themes** - Theme management
- **React 19** - UI kütüphanesi

## Proje Yapısı

```
uaa-alumni/
├── app/                          # Next.js App Router sayfaları
│   ├── page.tsx                  # Ana sayfa (/)
│   ├── haberler/                 # Haberler sayfası
│   ├── uyelik/                   # Üyelik sayfaları
│   │   ├── page.tsx
│   │   ├── neden-uyelik/
│   │   └── uye-ol/
│   └── dernek-hakkinda/          # Dernek hakkında sayfaları
│       ├── page.tsx
│       ├── hakkimizda/
│       ├── misyon-vizyon/
│       ├── mezunlar-evi/
│       ├── gizlilik-politikasi/
│       └── yonetim/
│           └── gecmis-yonetim-kurulu/
├── components/                   # React bileşenleri
│   ├── navbar.tsx               # Navigasyon menüsü
│   ├── footer.tsx               # Footer bileşeni
│   └── theme-toggle.tsx         # Tema değiştirici
├── lib/
│   ├── constants/
│   │   └── content.json         # Tüm içerik verileri
│   ├── providers/
│   │   └── theme-provider.tsx   # Tema provider
│   └── types/
│       └── content.ts           # TypeScript tip tanımları
└── app/
    ├── globals.css              # Global stiller ve glassmorphism utilities
    └── layout.tsx               # Root layout
```

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcıda açın: [http://localhost:3000](http://localhost:3000)

## İçerik Yönetimi

Tüm içerikler `lib/constants/content.json` dosyasında merkezi olarak yönetilmektedir. Bu dosyayı düzenleyerek:

- Site bilgileri
- Navigasyon menüleri
- Sayfa içerikleri
- Haberler
- Yönetim kurulu bilgileri
- Footer linkleri

gibi tüm içerikleri kolayca güncelleyebilirsiniz.

### İçerik Ekleme/Değiştirme

`content.json` dosyasını düzenleyerek içerikleri güncelleyebilirsiniz. JSON yapısı TypeScript tipleriyle korunmaktadır (`lib/types/content.ts`).

## Glassmorphism Stilleri

Projede kullanılan glassmorphism utility class'ları:

- `.glass` - Standart glassmorphism efekti
- `.glass-light` - Hafif blur efekti
- `.glass-strong` - Güçlü blur ve daha belirgin efekt

Bu class'lar `app/globals.css` dosyasında tanımlanmıştır ve light/dark mode'a göre otomatik olarak uyum sağlar.

## Tema Yönetimi

Tema yönetimi `next-themes` kütüphanesi ile yapılmaktadır. Kullanıcılar:

- Sistem tercihlerine göre otomatik tema seçimi
- Manuel light/dark mode değiştirme
- Tema tercihinin tarayıcıda saklanması

özelliklerini kullanabilirler.

## Responsive Tasarım

Proje mobile-first yaklaşımıyla geliştirilmiştir. Breakpoint'ler:

- `sm:` - 640px ve üzeri
- `md:` - 768px ve üzeri
- `lg:` - 1024px ve üzeri
- `xl:` - 1280px ve üzeri

## Sayfalar

- `/` - Ana sayfa
- `/haberler` - Haberler listesi
- `/uyelik` - Üyelik bilgileri
- `/uyelik/neden-uyelik` - Üyelik avantajları
- `/uyelik/uye-ol` - Üyelik başvuru formu
- `/dernek-hakkinda` - Dernek hakkında ana sayfa
- `/dernek-hakkinda/hakkimizda` - Hakkımızda
- `/dernek-hakkinda/misyon-vizyon` - Misyon ve vizyon
- `/dernek-hakkinda/mezunlar-evi` - Mezunlar evi bilgileri
- `/dernek-hakkinda/gizlilik-politikasi` - Gizlilik politikası
- `/dernek-hakkinda/yonetim` - Yönetim kurulu
- `/dernek-hakkinda/yonetim/gecmis-yonetim-kurulu` - Geçmiş yönetim kurulları

## Özelleştirme

### Renkler

Renkler `app/globals.css` dosyasındaki CSS değişkenleri ile yönetilmektedir:

```css
:root {
  --primary: #2563eb;
  --glass-bg: rgba(255, 255, 255, 0.7);
  /* ... */
}
```

### Fontlar

Fontlar `app/layout.tsx` dosyasında Geist font ailesi ile yapılandırılmıştır.

## Build

Production build için:

```bash
npm run build
npm start
```

## Notlar

- Bu proje frontend-only bir uygulamadır. Backend veya veritabanı kullanılmamaktadır.
- Form verileri şu anda demo amaçlıdır ve gerçek veri işleme yapılmamaktadır.
- Tüm içerikler JSON dosyasından yönetilmektedir.

## Lisans

Bu proje özel kullanım için geliştirilmiştir.

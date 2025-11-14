import Image from 'next/image';
import Link from 'next/link';
import content from '@/lib/constants/content.json';

const features = [
  {
    title: 'Haberler',
    description: 'Dernek haberleri ve duyurularını takip edin',
    href: '/haberler',
    image: '/images/news.svg',
  },
  {
    title: 'Üyelik',
    description: 'Derneğimize üye olun ve avantajlardan yararlanın',
    href: '/uyelik',
    image: '/images/uye-ol-banner.svg',
  },
  {
    title: 'Dernek Hakkında',
    description: 'Misyonumuz, vizyonumuz ve yönetim kurulumuz hakkında bilgi edinin',
    href: '/dernek-hakkinda',
    image: '/images/about-us.svg',
  },
];

export default function Home() {
  return (
    <div>
      {/* Banner Section - Navbar ile birlikte 100vh (Header h-20 = 80px) */}
      <section className="w-full h-[calc(100vh-5rem)] overflow-x-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/uaa-banner.jpg"
            alt="Üsküdar Amerikan Lisesi"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
        
        {/* Hero Content Over Banner */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="w-full px-4 text-center space-y-6 slide-in-from-bottom">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Üsküdar Amerikan Lisesi
              <br />
              Mezunlar Derneği
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Mezunlarımızı bir araya getiren, bağları güçlendiren ve topluma katkıda bulunan bir platform
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/uyelik/uye-ol"
                className="group relative px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold shadow-xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">{content.home.cta.primary}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[rgb(33,82,133)]/30 to-[rgb(60,120,180)]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                href="/dernek-hakkinda"
                className="group px-8 py-4 border-2 border-white/40 backdrop-blur-sm text-white rounded-xl font-semibold hover:border-white/60 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {content.home.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Glassmorphism - Scroll edilebilir */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1600px] mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group relative p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.02] min-h-[200px] lg:h-full flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-xl group-hover:shadow-2xl group-hover:border-white/40 dark:group-hover:border-blue-500/30 transition-all duration-700 ease-out"></div>
              
              {/* Background Image - Scale up ile tam doldur */}
              <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] group-hover:opacity-[0.12] dark:group-hover:opacity-[0.18] transition-opacity duration-700 ease-out overflow-hidden rounded-3xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="scale-150"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Light Mode Overlay - Light mode'da fotoğrafları hafifçe aydınlat */}
              <div className="absolute inset-0 bg-white/40 dark:bg-black/0 rounded-3xl transition-all duration-700 ease-out"></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-3xl transition-all duration-700 ease-out"></div>
              
              {/* Glow Effect on Hover - Opacity azaltıldı */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-60 dark:group-hover:opacity-100 transition-opacity duration-700 ease-out">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between flex-1">
                <div>
                  {/* İkon ve Başlık Yan Yana */}
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-out flex-shrink-0">
                      {feature.title === 'Haberler' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 md:h-7 md:w-7 text-foreground">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      ) : feature.title === 'Üyelik' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 md:h-7 md:w-7 text-foreground">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 md:h-7 md:w-7 text-foreground">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-700 ease-out flex-1 min-w-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                <div className="mt-4 md:mt-6 flex items-center text-blue-700 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-700 ease-out drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  Daha fazla
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

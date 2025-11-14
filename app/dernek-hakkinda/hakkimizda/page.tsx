'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import content from '@/lib/constants/content.json';

const founders = [
  { name: "Seniye Pakalın '36", role: "Avukat, Öğretmen", position: "BAŞKAN" },
  { name: "Mülhime Gökbudak '38", role: "Avukat", position: "BAŞKAN YARDIMCISI" },
  { name: "Beria Kızılağaç '41", role: "Gazeteci, Öğretmen", position: "BAŞKAN YARDIMCISI" },
  { name: "Aşken Mühendis Wiesenthal '28", role: "Mühendis", position: "MUHASİP ÜYE" },
  { name: "Vedia Zetenoğlu", role: "Öğretmen", position: "SEKRETER" },
  { name: "Süheyla Berker '38", role: "Öğretmen", position: "ASİL ÜYE" },
  { name: "Perihan Gencer '37", role: "Mezun", position: "ASİL ÜYE" },
];

export default function Hakkimizda() {
  const chaptersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Hero content animasyonu için useLayoutEffect kullan - DOM güncellemelerinden önce çalışır
  useLayoutEffect(() => {
    // requestAnimationFrame ile animasyonu tetikle - daha güvenilir
    let timer: NodeJS.Timeout;
    const rafId = requestAnimationFrame(() => {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
    });
    
    return () => {
      cancelAnimationFrame(rafId);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Chapters için intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    chaptersRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollClick = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      {/* Hero Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-16">
        {/* Background with primary color gradient - Navbar'ın altında kalacak */}
        <div 
          className="absolute inset-0 dark:hidden -z-10"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(33,82,133,0.2) 0%, rgba(33,82,133,0.05) 50%, transparent 100%)'
          }}
        ></div>
        <div 
          className="absolute inset-0 hidden dark:block -z-10"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(33,82,133,0.3) 0%, rgba(33,82,133,0.1) 50%, transparent 100%)'
          }}
        ></div>
        
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] -z-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgb(33,82,133) 2px,
              rgb(33,82,133) 4px
            )`,
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 leading-none">
            <span 
              className="bg-gradient-to-r from-[rgb(33,82,133)] via-[rgb(60,120,180)] to-[rgb(90,150,220)] bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-gray-400 inline-block"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-128px)',
                transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '100ms',
                willChange: 'transform, opacity'
              }}
            >
              1952
            </span>
          </h1>
          <p 
            className="text-xl md:text-2xl text-foreground/70 dark:text-white/70 font-light"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-128px)',
              transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
              willChange: 'transform, opacity'
            }}
          >
            Bir hikayenin başlangıcı
          </p>
        </div>

        {/* Scroll Indicator - Tıklanabilir */}
        <div 
          ref={scrollIndicatorRef}
          onClick={handleScrollClick}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-foreground/50 dark:text-white/50 tracking-widest uppercase animate-bounce cursor-pointer hover:text-foreground dark:hover:text-white transition-colors duration-300 select-none"
        >
          Scroll ↓
        </div>
      </section>

      {/* Narrative Sections */}
      <section className="relative bg-background dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          
          {/* Chapter 1 */}
          <div 
            ref={(el) => { chaptersRef.current[0] = el; }}
            className="mb-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-tight text-foreground dark:text-white">
              Öğrenci Birliği&apos;nden Derneğe
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80 dark:text-white/80">
              <p>
                1930&apos;lu yıllarda akademik dersler dışında, kültürel, sportif ve sosyal ilişkiler kurmanın da önemini benimseyen okulumuzda ilk Öğrenci Birliği kuruldu ve bu tip etkinlikler önem kazandı.
              </p>
              <p>
                Bu faaliyetlerini okuldan ayrıldıktan sonra da devam ettirmek isteyen bir grup mezun, zamanın okul müdürü Jessie Martin ve ilk Türk Müdür Bülent Yener&apos;in de desteği ile <strong className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] font-semibold">1952</strong> sonbaharında &quot;Scutari Alumnae Association&quot;ı kurdular.
              </p>
            </div>
          </div>

          {/* Highlight Box */}
          <div 
            ref={(el) => { chaptersRef.current[1] = el; }}
            className="mb-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out bg-[rgb(33,82,133)]/10 dark:bg-[rgb(33,82,133)]/20 border-l-4 border-[rgb(33,82,133)] dark:border-[rgb(60,120,180)] p-12 md:p-16"
          >
            <h3 className="text-2xl md:text-3xl font-light mb-6 text-foreground dark:text-white">
              Kuruluş Amacı
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 dark:text-white/80">
              Üsküdar Amerikan Kız Lisesinde eğitim görmüş tüm UAA&apos;liler arasında dayanışmayı sağlamak ve sosyal, kültürel, mesleki ilişkiler kurarak gerekli beraberliğin devamını ve yetişenlerin korunmasını sağlamak için ortak bilinç oluşturmak.
            </p>
          </div>

          {/* Chapter 2 */}
          <div 
            ref={(el) => { chaptersRef.current[2] = el; }}
            className="mb-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-tight text-foreground dark:text-white">
              Yetişenler Felsefesi
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80 dark:text-white/80">
              <p>
                Üsküdar Amerikan Lisesini bitirenler veya en az üç yıl okula devam etmiş olanlar Derneğe üye olabilir. Üye olmak için mezuniyet şartı aranmadığı için <strong className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] font-semibold">&quot;Yetişenler Derneği&quot;</strong> adı tercih edilmiştir.
              </p>
              <p>
                Bu isim seçimi, derneğimizin kapsayıcı ve geniş vizyonunu yansıtır. Sadece mezunları değil, okulda yetişen herkesi kucaklayan bir yaklaşım benimsenmiştir.
              </p>
            </div>
          </div>

          {/* Chapter 3 - Kurumsal Bilgiler */}
          <div 
            ref={(el) => { chaptersRef.current[3] = el; }}
            className="mb-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-tight text-foreground dark:text-white">
              Kurumsal Bilgiler
            </h2>
            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground/80 dark:text-white/80">
              <div>
                <h3 className="text-2xl font-light mb-4 text-foreground dark:text-white">Kuruluş Adı</h3>
                <p className="mb-4 dark:text-white/90">
                  Üsküdar Amerikan Kız Lisesinden Yetişenler Cemiyeti
                </p>
                <p className="text-sm text-foreground/60 dark:text-white/60 mb-3">
                  <strong className="dark:text-white/70">1990&apos;da karma eğitime geçilmesiyle yeni kurumsal adı:</strong>
                </p>
                <ul className="space-y-2 ml-6 list-disc dark:text-white/80">
                  <li>Üsküdar Amerikan Lisesinden Yetişenler Derneği</li>
                  <li>UAA Mezunlar Derneği</li>
                  <li>UAA Alumni Association</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chapter 4 - Kurucu Üyeler */}
          <div 
            ref={(el) => { chaptersRef.current[4] = el; }}
            className="mb-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-tight text-foreground dark:text-white">
              Kurucu Kadro
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {founders.map((founder, index) => (
                <div
                  key={index}
                  className="bg-background/50 dark:bg-gray-900/50 border border-[rgb(33,82,133)]/20 dark:border-[rgb(60,120,180)]/30 p-8 hover:border-[rgb(33,82,133)]/40 dark:hover:border-[rgb(60,120,180)]/50 transition-all duration-300 ease hover:-translate-y-1"
                >
                  <h3 className="text-xl font-light mb-2 text-foreground dark:text-white">{founder.name}</h3>
                  <p className="text-foreground/60 dark:text-white/70 mb-4 text-sm">{founder.role}</p>
                  <p className="text-xs text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] font-mono tracking-wider uppercase">
                    {founder.position}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter 5 - İktisadi İşletme */}
          <div 
            ref={(el) => { chaptersRef.current[5] = el; }}
            className="mb-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-tight text-foreground dark:text-white">
              UAA İktisadi İşletme
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80 dark:text-white/80">
              <p>
                Derneğimizin gelişmesi, dernek amacının gerçekleştirilebilmesi ve kaynak elde edilmesi için gerekli ve faydalı görüldüğünden; derneğimize bağlı <strong className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] font-semibold">&quot;Üsküdar Amerikan Lisesinden Yetişenler Derneği İktisadi İşletmesi&quot;</strong> adı altında iktisadi işletme kurulmasına ve iktisadi işletmenin derneğimiz yönetim kurulu üyeleri arasından seçilen yetkili temsilciler tarafından temsil edilmesine karar verilmiş ve <strong className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] font-semibold">23.09.2003</strong> yılında faaliyete geçmiştir.
              </p>
              <p>
                İşletme yönetimi, Dernek yönetim kurulu üyeleri arasından 2 yıllığına seçilen 5 kişiden oluşur ve en az 2 yetkilinin müşterek imzası ile işlemler yapılabilir.
              </p>
              <p>
                Hem Dernek hem İşletme mali tabloları ve resmi kayıtları, serbest bir mali müşavir tarafından sürekli denetlenmektedir.
              </p>

              {/* Lists Grid */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div>
                  <h3 className="text-xl font-light mb-6 text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)]">Çalışma Konuları</h3>
                  <ul className="space-y-3 text-base dark:text-white/80">
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Derneğin faaliyet konusuna giren işleri yapmak</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Lokal ve kantin işletmek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Spor okulu açmak</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Okul kıyafetleri, kırtasiye alıp satmak</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Sosyal ve gelir getirici etkinlikler düzenlemek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Öğretici ve mesleki konularda kurslar düzenlemek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Alım, satım, kiralama, kiraya verme ve pazarlama işleri yapmak</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-light mb-6 text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)]">İşletmenin Gelirleri</h3>
                  <ul className="space-y-3 text-base dark:text-white/80">
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>İşletme konusu hizmet ücretleri</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>İşletme konusu işlerden elde edilen gelirler</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>İşletmeye yapılacak bağış ve yardımlar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(33,82,133)] dark:text-[rgb(60,120,180)] mt-1">•</span>
                      <span>Diğer gelirler</span>
                    </li>
                  </ul>
                </div>
          </div>
        </div>
      </div>
    </div>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';

const benefits = [
  {
    number: '01',
    title: 'Web Site Kullanımı',
    description: 'Websitesinin dernek üyelerine özel sayfalarını görüntüleme ve kullanım hakkına otomatik olarak sahip olarak aşağıda belirtilen avantajlardan faydalanabilirsiniz:',
    items: [
      'UAL Network sayfasını kullanarak iş ve staj ilanlarından haberdar olabilir',
      'CV oluşturabilir',
      'İş başvurusunda bulunabilir',
      'İş ilanı verebilir',
      'Mentoring programlarına katılabilirsiniz'
    ]
  },
  {
    number: '02',
    title: 'Acil Sağlık Hattı',
    description: 'Acil Sağlık Hattını kullanarak; sağlık arayışlarında – acil kan ihtiyacı, doktor ihtiyacı, hastanede tanıdık bulmak, v.b. konularda uzman mezunlarımıza ulaşarak sorunlarınıza çözüm bulabilirsiniz.'
  },
  {
    number: '03',
    title: 'Spor Alanları',
    description: 'Hafta sonları 10:00 – 20:00 saatleri arasında websitesi üzerinden de rezervasyon yaparak, UAL kampüsündeki spor alanlarını kullanabilirsiniz:',
    items: [
      'Kapalı basketbol / voleybol sahası',
      'Açık basketbol sahası',
      'Açık tenis kortu'
    ],
    note: 'Detaylar ve rezervasyon için websitenin "Kampüs Kullanımı" kısmını inceleyebilirsiniz.'
  },
  {
    number: '04',
    title: 'Etkinlikler',
    description: 'Derneği okul arkadaşlarınızla toplantılarınız, ortak etkinlikleriniz için her gün 10:00 – 24:00 arası kullanabilirsiniz.',
    note: 'Detaylar ve rezervasyon için websitenin "Dernek / Kinney Cottage" kısmını inceleyebilirsiniz.'
  },
  {
    number: '05',
    title: 'Yönetim',
    description: 'Derneğin en yetkili organı olan Genel Kurula katılabilir ve Yönetim / Denetim Kuruluna aday olabilirsiniz.',
    extended: 'Dernek olarak en önemli amacımız, üyeler arasındaki bağları günden güne arttırarak güçlü kılmak, aramızdaki dayanışmayı sürekli kılmak, manevi değerlerimize sahip çıkmak, artan rekabet ve değişmekte olan şartlar karşısında tüm UAl&apos;lilere maddi ve manevi destek sağlayabilmektir.'
  },
  {
    number: '06',
    title: 'İndirim',
    description: 'Derneğimizin anlaşmalı olduğu firmalardan, kurumlardan üyelik kartınızı göstererek belirtilen oranlarda indirim alabilirsiniz.'
  }
];

export default function NedenUyelik() {
  return (
    <div className="relative min-h-screen bg-[#0a0f1e] overflow-hidden">
      {/* Diagonal Header Section */}
      <section className="relative bg-gradient-to-br from-[rgba(33,82,133,0.15)] to-[rgba(60,120,180,0.08)] pt-20 sm:pt-24 pb-40 sm:pb-48 px-4 sm:px-6 lg:px-8" 
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          marginBottom: '-80px'
        }}>
        {/* Pattern Overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,<svg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"50\" cy=\"50\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/></svg>")'
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
            Neden Üye Olmalıyım?
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Dernek üyeliği ile birlikte gelen tüm ayrıcalıkları ve imkanları keşfedin. UAA mezunları için özel olarak tasarlanmış bu avantajlardan yararlanın.
          </p>
        </div>
      </section>

      {/* Benefits Flow Section */}
      <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-20">
        <div className="space-y-16 sm:space-y-24">
          {benefits.map((benefit, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <div
                key={index}
                className={`grid grid-cols-1 gap-8 items-start ${
                  isEven ? 'lg:grid-cols-[1fr_250px] lg:gap-[50px]' : 'lg:grid-cols-[250px_1fr] lg:gap-[50px]'
                }`}
              >
                {/* Number Circle - Odd itemlarda en sola, Even itemlarda en sağa */}
                <div className={`relative flex items-center justify-center ${isEven ? 'lg:justify-end lg:order-2' : 'lg:justify-start'}`}>
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-[150px] lg:h-[150px] bg-gradient-to-br from-[rgb(33,82,133)] to-[rgb(60,120,180)] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(33,82,133,0.3)] mx-auto lg:mx-0">
                    <span className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white">{benefit.number}</span>
                    
                    {/* Connecting Line - Desktop Only - Çemberin kenarından çıkıyor - Her ikisi de aynı mesafe */}
                    {!isEven && (
                      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[-50px] w-[50px] h-0.5 bg-gradient-to-r from-[rgb(60,120,180)] to-transparent" />
                    )}
                    
                    {isEven && (
                      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[-50px] w-[50px] h-0.5 bg-gradient-to-l from-[rgb(60,120,180)] to-transparent" />
                    )}
                  </div>
                </div>

                {/* Content - Odd itemlarda sağda (text-left), Even itemlarda solda ama text-right - Her ikisi de aynı padding */}
                <div className={`lg:pt-5 lg:pl-0 lg:pr-0 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-semibold text-white mb-5 lg:mb-6">
                    {benefit.title}
                  </h2>
                  
                  <p className={`text-base sm:text-lg lg:text-[1.05rem] text-white/80 leading-relaxed mb-4 lg:mb-5 ${isEven ? 'lg:text-right' : ''}`}>
                    {benefit.description}
                  </p>

                  {/* Extended Description */}
                  {benefit.extended && (
                    <p className={`text-base sm:text-lg lg:text-[1.05rem] text-white/80 leading-relaxed mb-5 ${isEven ? 'lg:text-right' : ''}`}>
                      {benefit.extended}
                    </p>
                  )}

                  {/* Items List */}
                  {benefit.items && (
                    <ul className="mt-6 space-y-0">
                      {benefit.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={`text-base text-white/85 leading-relaxed py-3 border-b border-white/5 relative ${
                            isEven ? 'lg:text-right lg:pr-[30px]' : 'lg:text-left lg:pl-[30px]'
                          } flex items-start gap-3 lg:block`}
                        >
                          {/* Mobile: Normal flex flow, Desktop: Absolute positioned */}
                          <span className={`text-[rgb(23,162,184)] font-bold text-xl shrink-0 mt-0.5 lg:absolute lg:top-3 ${
                            isEven ? 'lg:right-0' : 'lg:left-0'
                          }`}>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Note */}
                  {benefit.note && (
                    <p className={`text-base sm:text-lg text-white/80 leading-relaxed mt-6 italic ${isEven ? 'lg:text-right' : ''}`}>
                      {benefit.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Diagonal CTA Section */}
      <section 
        className="relative bg-gradient-to-br from-[rgb(33,82,133)] to-[rgb(60,120,180)] px-4 sm:px-6 lg:px-8 py-20 sm:py-24 mt-20"
        style={{
          clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6">
            Hemen Üye Olun
          </h2>
          <p className="text-lg sm:text-xl text-white/95 mb-10 leading-relaxed">
            Hizmetlerimizin kalite ve etkinliğini arttırmamız ancak siz değerli<br className="hidden sm:block" /> UAl&apos;lilerin katkılımı ile ve hep birlikte gerçekleşir.
          </p>
          <Link
            href="/uyelik/uye-ol"
            className="inline-block px-12 sm:px-16 py-4 sm:py-5 bg-white text-[rgb(33,82,133)] text-lg sm:text-xl font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          >
            Üyelik Başvurusu
          </Link>
        </div>
      </section>
    </div>
  );
}

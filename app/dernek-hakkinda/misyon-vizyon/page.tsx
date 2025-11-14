'use client';

export default function MisyonVizyon() {
  return (
    <div>
      {/* Hero Section - Magazine Editorial Style */}
      <section className="relative h-[70vh] bg-[#1a1a1a] dark:bg-gray-950 flex items-center justify-center overflow-hidden transition-colors duration-300">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 opacity-50 dark:opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='50' font-size='80' fill='%23ffffff' opacity='0.03'>1952</text></svg>")`,
            backgroundSize: '400px',
          }}
        ></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-[900px] px-10">
          <div className="text-sm md:text-base font-mono tracking-[4px] text-[#888] dark:text-gray-400 mb-5 transition-colors duration-300">
            UAA ALUMNI
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-normal text-white dark:text-white leading-[1.1] mb-5 italic transition-colors duration-300">
            Misyon<br/>&<br/>Vizyon
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#ccc] dark:text-gray-300 font-light transition-colors duration-300">
            Üsküdar Amerikan Lisesi Mezunlar Derneği
          </p>
        </div>
      </section>

      {/* Content Section - Two Column Layout */}
      <section className="relative bg-[#f5f1e8] dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto px-10 py-24 md:py-32">
          
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
            {/* Left Column - Vizyon */}
            <div>
              <h2 className="text-[2.5rem] leading-tight mb-8 border-l-4 border-[#1a1a1a] dark:border-white pl-5 text-[#1a1a1a] dark:text-white transition-colors duration-300">
                Vizyonumuz
              </h2>
              <div className="text-[1.1rem] leading-[1.9] text-[#333] dark:text-white/90 space-y-6 transition-colors duration-300">
                <p>
                  Okulda edindiğimiz birikimle, Üsküdar Amerikan Liseli olmanın değerini koruyup arttırarak aramızda işbirliği ve dayanışmayı sağlamak; UAA&apos;lilere, topluma, okula değer katmak, katkı sağlamak.
                </p>
              </div>
            </div>

            {/* Right Column - Misyon Intro */}
            <div>
              <h2 className="text-[2.5rem] leading-tight mb-8 border-l-4 border-[#1a1a1a] dark:border-white pl-5 text-[#1a1a1a] dark:text-white transition-colors duration-300">
                Misyonumuz
              </h2>
              <div className="text-[1.1rem] leading-[1.9] text-[#333] dark:text-white/90 space-y-6 transition-colors duration-300">
                <p>
                  Bu vizyon doğrultusunda amacımız, Üsküdar Amerikan Lisesi&apos;nden yetişmiş bireyler arasında güçlü bağlar kurmak ve gelecek nesillere aktarılabilir değerler oluşturmaktır.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Points - Full Width with Border */}
          <div className="border-t border-[#ddd] dark:border-gray-700 pt-16 transition-colors duration-300">
            <h3 className="text-lg md:text-xl font-light mb-12 text-[#666] dark:text-gray-400 tracking-wide uppercase transition-colors duration-300">
              Hedeflerimiz
            </h3>
            
            <div className="space-y-8">
              <div className="flex gap-6 pb-8 border-b border-[#e5e5e5] dark:border-gray-700 transition-colors duration-300">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] dark:border-white rounded-full text-sm font-mono text-[#1a1a1a] dark:text-white transition-colors duration-300">
                  1
                </div>
                <p className="text-[1.05rem] leading-[1.9] text-[#333] dark:text-white/90 transition-colors duration-300">
                  Üsküdar Amerikan Lisesinden yetişmiş bireyler arasında dayanışma sağlamak, katılımı arttırmak
                </p>
              </div>

              <div className="flex gap-6 pb-8 border-b border-[#e5e5e5] dark:border-gray-700 transition-colors duration-300">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] dark:border-white rounded-full text-sm font-mono text-[#1a1a1a] dark:text-white transition-colors duration-300">
                  2
                </div>
                <p className="text-[1.05rem] leading-[1.9] text-[#333] dark:text-white/90 transition-colors duration-300">
                  Okuldan aldığımız değerleri sürdürülebilir hale getirerek takım ruhu ile geçmiş ve geleceği bütünleştirip &quot;yaşayan dernek&quot; olmak
                </p>
              </div>

              <div className="flex gap-6 pb-8 border-b border-[#e5e5e5] dark:border-gray-700 transition-colors duration-300">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] dark:border-white rounded-full text-sm font-mono text-[#1a1a1a] dark:text-white transition-colors duration-300">
                  3
                </div>
                <p className="text-[1.05rem] leading-[1.9] text-[#333] dark:text-white/90 transition-colors duration-300">
                  Demokratik düşünce ve pozitif yaklaşım ile topluma ve başkalarının hayatına katkı sağlamak
                </p>
              </div>

              <div className="flex gap-6 pb-8 border-b border-[#e5e5e5] dark:border-gray-700 transition-colors duration-300">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] dark:border-white rounded-full text-sm font-mono text-[#1a1a1a] dark:text-white transition-colors duration-300">
                  4
                </div>
                <p className="text-[1.05rem] leading-[1.9] text-[#333] dark:text-white/90 transition-colors duration-300">
                  Mezun, okul ve öğrenciler arasında köprü oluşturarak mesleki ve sosyal fayda sağlamak
                </p>
              </div>

              <div className="flex gap-6 pb-8 border-b border-[#e5e5e5] dark:border-gray-700 transition-colors duration-300">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] dark:border-white rounded-full text-sm font-mono text-[#1a1a1a] dark:text-white transition-colors duration-300">
                  5
                </div>
                <p className="text-[1.05rem] leading-[1.9] text-[#333] dark:text-white/90 transition-colors duration-300">
                  Hem mezunlara hem de öğrencilere maddi ve manevi destek vermek
                </p>
              </div>
            </div>
          </div>

          {/* Quote Section - Centered, Editorial Style */}
          <div className="mt-24 pt-16 border-t-2 border-[#1a1a1a] dark:border-white transition-colors duration-300">
            <blockquote className="text-center max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.5] text-[#1a1a1a] dark:text-white italic transition-colors duration-300">
                &quot;Fark ederek, hissederek, sorumluluk almak ve harekete geçmek&quot;
              </p>
            </blockquote>
          </div>

        </div>
      </section>
    </div>
  );
}
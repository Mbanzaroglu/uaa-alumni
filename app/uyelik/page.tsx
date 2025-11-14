import Link from 'next/link';
import content from '@/lib/constants/content.json';

export default function Uyelik() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gray-950">
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {content.membership.title}
          </h1>
          <p className="text-lg text-white/60">{content.membership.subtitle}</p>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Description */}
          <div className="mb-16 text-center">
            <p className="text-base leading-relaxed text-white/70">
              {content.membership.description}
            </p>
          </div>

          {/* Benefits List - Minimalist */}
          <div className="mb-16 space-y-1">
            {content.membership.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b border-white/5 py-5 transition-colors duration-200 hover:border-white/10"
              >
                <span className="mt-0.5 text-[rgb(60,120,180)] font-medium">•</span>
                <p className="flex-1 text-base text-white/80">{benefit}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Minimalist */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/uyelik/uye-ol"
              className="w-full rounded-lg bg-gradient-to-r from-[rgb(33,82,133)] to-[rgb(60,120,180)] px-8 py-3 text-center text-base font-medium text-white transition-opacity duration-200 hover:opacity-90 active:opacity-80 sm:w-auto"
            >
              {content.membership.cta}
            </Link>
            <Link
              href="/uyelik/neden-uyelik"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-8 py-3 text-center text-base font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white active:opacity-80 sm:w-auto"
            >
              Neden Üye Olmalısınız?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


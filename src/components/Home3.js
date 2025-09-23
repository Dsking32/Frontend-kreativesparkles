// src/components/TestimonialsSection.jsx
import React from "react";
import { Star, Quote } from "lucide-react";

/**
 * Desktop (lg+): marquee rows like your original
 * Mobile/Tablet (<lg): static grid showing only the first N cards
 * Tailwind required. Default export ✅
 */

// 👉 Choose how many cards to show on mobile: 4 or 6
const MOBILE_COUNT = 4; // change to 6 if you prefer

const DATA = [
  { id: 1, name: "Bukola Adamson", company: "Luxe loon", service: "Brand Identity & Logo Design", testimonial: "Kreative Sparkles refined our story and visuals. The new identity feels premium and authentic.", rating: 5, avatar: "BA" },
  { id: 2, name: "Chinedu Okafor", company: "Urban Eats NG", service: "Website Development", testimonial: "Clean build, fast pages, and conversions improved noticeably within 2 weeks.", rating: 4, avatar: "CO" },
  { id: 3, name: "Zainab Yusuf", company: "Bloom Wellness", service: "Complete Brand Package", testimonial: "From strategy to launch, the team executed with finesse. Our brand finally has a voice.", rating: 5, avatar: "ZY" },
  { id: 4, name: "Paul Omugbe", company: "Venix partners", service: "Logo & Style Guide", testimonial: "A modern, flexible system we can scale across merch and digital. Solid work.", rating: 4, avatar: "P0" },
  { id: 5, name: "Tomiwa Alabi", company: "Artisan Coffee Co.", service: "Brand Identity", testimonial: "They captured the warmth and craft behind our brand. Customers noticed immediately.", rating: 5, avatar: "TA" },
  { id: 6, name: "Aisha Bello", company: "InnovateTech", service: "Website & Branding", testimonial: "Elevated our positioning and attracted higher-value clients. Measurable impact.", rating: 4, avatar: "AB" },
  { id: 7, name: "Blessing Eze", company: "Pure Beauty Spa", service: "Logo Design", testimonial: "Elegant and timeless. The mark works beautifully across print and social.", rating: 5, avatar: "BE" },
  { id: 8, name: "Seyi Adegbite", company: "EcoHome Solutions", service: "Complete Rebrand", testimonial: "The rebrand clarified our promise. We look and feel like market leaders now.", rating: 4, avatar: "SA" },
];

function Stars({ rating }) {
  return (
    <div className="mb-2 flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? (
          <Star key={i} className="h-4 w-4 fill-white text-white" />
        ) : (
          <Star key={i} className="h-4 w-4 text-white/30" />
        )
      )}
    </div>
  );
}

function Card({ t, variant = "grid" }) {
  const widthClass =
    variant === "marquee"
      ? "min-w-[320px] sm:min-w-[360px] lg:min-w-[400px]"
      : ""; // grid/stack shouldn't force min-width

  return (
    <article className={`cs-card group ${widthClass} rounded-3xl p-[1px] bg-gradient-to-tr from-white/15 to-white/0`}>
      <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-xl backdrop-blur">
        <Quote className="absolute -top-3 -left-3 h-8 w-8 text-white/15" aria-hidden />
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-black/70 to-black/30 text-white font-semibold text-sm">
            {t.avatar}
          </div>
          <div className="flex-1">
            <h4 className="text-base sm:text-lg font-semibold text-white">{t.name}</h4>
            <p className="text-xs sm:text-sm text-white/70">{t.company}</p>
            <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-white/80">{t.service}</p>
          </div>
        </div>
        <Stars rating={t.rating} />
        <p className="text-[13.5px] sm:text-sm leading-relaxed text-white/90">“{t.testimonial}”</p>

        {/* Hover glow (desktop focus) */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -inset-20 bg-gradient-to-tr from-white/5 to-transparent blur-2xl" />
        </div>
      </div>
    </article>
  );
}

/** Desktop marquee row (like your original) */
function MarqueeRow({ items, direction = "left", speed = "24s" }) {
  const looped = [...items, ...items]; // duplicate for seamless loop
  return (
    <div
      className="cs-row flex gap-6 will-change-transform"
      style={{
        "--row-speed": speed, // ✅ correct (no ESLint warning)
        animation: `cs-${direction} var(--row-speed) linear infinite`,
      }}
    >
      {looped.map((t, idx) => (
        <Card key={`${t.id}-${idx}`} t={t} variant="marquee" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#3A4F30] py-14 sm:py-20">
      {/* Soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/70">Testimonials</p>
          <h2 className="bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text text-3xl sm:text-5xl lg:text-6xl font-semibold text-transparent">
            Client Success Stories
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-[15px] sm:text-lg text-white/85">
            Discover how Creative Sparkles transforms brands and elevates businesses across Nigeria.
          </p>
        </div>

        {/* MOBILE/TABLET: grid/stack (only first MOBILE_COUNT cards) */}
        <div className="lg:hidden grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DATA.slice(0, MOBILE_COUNT).map((t) => (
            <Card key={t.id} t={t} variant="grid" />
          ))}
        </div>

        {/* DESKTOP: marquee rows like your original */}
        <div className="hidden lg:block mt-14 space-y-6">
          <div className="overflow-hidden">
            <MarqueeRow items={DATA.slice(0, 4)} direction="left" speed="24s" />
          </div>
          <div className="overflow-hidden">
            <MarqueeRow items={DATA.slice(4, 8)} direction="right" speed="22s" />
          </div>
          <div className="overflow-hidden">
            <MarqueeRow items={DATA.slice(0, 4)} direction="left" speed="26s" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <h3 className="mb-3 text-2xl sm:text-3xl font-semibold text-white">
            Ready to join our success stories?
          </h3>
          <p className="mb-8 text-[15px] sm:text-lg text-white/85">
            Let’s create something extraordinary together and make your brand sparkle.
          </p>
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-7 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative z-10">Start Your Project Today</span>
          </a>
        </div>
      </div>

      {/* Keyframes + desktop hover-pause (plain <style>, not jsx) */}
      <style>{`
        @keyframes cs-left {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        @keyframes cs-right {
          0%   { transform: translate3d(-50%,0,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @media (hover: hover) and (pointer: fine) {
          .cs-row { animation-play-state: running; }
          .cs-row:hover { animation-play-state: paused; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-row { animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}

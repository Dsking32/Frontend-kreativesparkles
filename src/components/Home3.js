import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    { id: 1, name: "Bukola Adamson", company: "Luxe loon", service: "Brand Identity & Logo Design", testimonial: "Kreative Sparkles refined our story and visuals. The new identity feels premium and authentic.", rating: 5, avatar: "AA" },
    { id: 2, name: "Chinedu Okafor", company: "Urban Eats NG", service: "Website Development", testimonial: "Clean build, fast pages, and conversions improved noticeably within 2 weeks.", rating: 4, avatar: "CO" },
    { id: 3, name: "Zainab Yusuf", company: "Bloom Wellness", service: "Complete Brand Package", testimonial: "From strategy to launch, the team executed with finesse. Our brand finally has a voice.", rating: 5, avatar: "ZY" },
    { id: 4, name: "Paul Omugbe", company: "Venix partners", service: "Logo & Style Guide", testimonial: "A modern, flexible system we can scale across merch and digital. Solid work.", rating: 4, avatar: "IN" },
    { id: 5, name: "Tomiwa Alabi", company: "Artisan Coffee Co.", service: "Brand Identity", testimonial: "They captured the warmth and craft behind our brand. Customers noticed immediately.", rating: 5, avatar: "TA" },
    { id: 6, name: "Aisha Bello", company: "InnovateTech", service: "Website & Branding", testimonial: "Elevated our positioning and attracted higher-value clients. Measurable impact.", rating: 4, avatar: "AB" },
    { id: 7, name: "Blessing Eze", company: "Pure Beauty Spa", service: "Logo Design", testimonial: "Elegant and timeless. The mark works beautifully across print and social.", rating: 5, avatar: "BE" },
    { id: 8, name: "Seyi Adegbite", company: "EcoHome Solutions", service: "Complete Rebrand", testimonial: "The rebrand clarified our promise. We look and feel like market leaders now.", rating: 4, avatar: "SA" }
  ];

  const createRow = (items, direction = 'left', speed = '60s') => (
    <div
      className="flex gap-6 animate-scroll will-change-transform"
      style={{ animation: `scroll-${direction} ${speed} linear infinite` }}
    >
      {[...items, ...items].map((t, idx) => (
        <TestimonialCard key={`${t.id}-${idx}`} testimonial={t} />
      ))}
    </div>
  );

  const Stars = ({ rating }) => (
    <div className="mb-3 flex gap-1">
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? (
          <Star key={i} className="h-4 w-4 fill-white text-white" />
        ) : (
          <Star key={i} className="h-4 w-4 text-white/30" />
        )
      )}
    </div>
  );

  const TestimonialCard = ({ testimonial }) => (
    <div className="group relative min-w-[360px] rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur sm:min-w-[400px] transition hover:shadow-2xl">
      {/* subtle glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-gradient-to-tr from-white/5 to-transparent blur-2xl" />
      </div>

      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-black/70 to-black/30 text-white font-bold text-sm">
          {testimonial.avatar}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-white/70">{testimonial.company}</p>
          <p className="mt-1 text-xs font-medium text-white/80">{testimonial.service}</p>
        </div>
      </div>

      <Stars rating={testimonial.rating} />
      <p className="text-sm leading-relaxed text-white/85">“{testimonial.testimonial}”</p>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#3A4F30] py-20">
      {/* Soft vignette + grain */}
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
        <div className="mb-16 text-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/70">Testimonials</p>
          <h2
            className="
              bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738]
              bg-clip-text text-5xl font-semibold text-transparent sm:text-6xl
            "
          >
            Client Success Stories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Discover how kreative Sparkles has transformed brands and elevated businesses across Nigeria.
          </p>
        </div>

        {/* Rows */}
        <div className="mt-16 space-y-6">
          <div className="overflow-hidden">{createRow(testimonials.slice(0, 4), 'left', '80s')}</div>
          <div className="overflow-hidden">{createRow(testimonials.slice(4, 8), 'right', '70s')}</div>
          <div className="overflow-hidden">{createRow(testimonials.slice(0, 4), 'left', '90s')}</div>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-20 text-center">
          <h3 className="mb-4 text-3xl font-semibold text-white">Ready to join our success stories?</h3>
          <p className="mb-8 text-lg text-white/85">
            Let’s create something extraordinary together and make your brand sparkle.
          </p>

          <a
            href="contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-8 py-4 text-lg font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900"
          >
            {/* shine sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative z-10">Start Your Project Today</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll { animation-play-state: running; }
        .animate-scroll:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;

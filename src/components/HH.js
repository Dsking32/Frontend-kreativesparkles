import React from "react";
import { ArrowRight, Star, Check } from "lucide-react";

export default function AboutShowcase({
  image = "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop",
}) {
  const chips = [
    "Financial Growth",
    "Cash Flow Visibility",
    "Business Intelligence",
    "Secure Money",
    "Business Solutions",
    "Financial Planning",
  ];

  const Stat = ({ label, value }) => (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs font-medium tracking-wide text-white/70">{label}</div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#3A4F30]">
      {/* subtle vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 10%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        {/* Eyebrow */}
        <p className="mb-3 text-center text-[11px] tracking-[0.22em] uppercase text-white/70">
          About us
        </p>

        {/* Headline */}
        <h2 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-semibold leading-tight text-transparent sm:text-4xl md:text-5xl bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text">
          We work with you to make your vision a reality
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-[15.5px] leading-7 text-white/85">
          Strategy, design, and execution aligned to outcomes. We collaborate closely to turn
          priorities into measurable progress and durable growth.
        </p>

        {/* Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left */}
          <div className="md:col-span-6 flex flex-col gap-8">
            {/* Soft stat row */}
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Client satisfaction" value="99%" />
              <Stat label="Average rating" value="4.8/5" />
              <Stat label="Quality grade" value="A+" />
            </div>

            {/* Trust signal */}
            <div className="flex items-center gap-3 text-xs font-medium text-white/80">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                <span className="flex items-center gap-0.5 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                  ))}
                </span>
                <span className="ml-1">4.8 on Trustpilot</span>
              </span>
              <span className="text-white/60">•</span>
              <span>Trusted by finance, tech, and energy leaders</span>
            </div>

            {/* Partner blurb */}
            <div>
              <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                Your partner in corporate strategy achievement
              </h3>
              <p className="mt-3 max-w-xl text-[15.5px] leading-7 text-white/85">
                We focus on alignment, clarity, execution, enabling teams, and
                shipping work that compounds. Less noise, more signal.
              </p>

              {/* NEW: value checklist to add vertical length */}
              <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-white/85 sm:grid-cols-2">
                {[
                  "Clear OKRs & measurable outcomes",
                  "Risk down, delivery up execution",
                  "Lean governance & rituals",
                  "Design systems that scale",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* NEW: subtle quote card */}
              <figure className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/85 backdrop-blur">
                <blockquote>
                  “They aligned everyone around the few moves that mattered. Execution finally felt
                  calm and compounding.”
                </blockquote>
                <figcaption className="mt-2 text-xs text-white/65">
                  CEO, Luxe loons creations (Series A)
                </figcaption>
              </figure>

              {/* NEW: button row (primary black, secondary outline) */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-black px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative z-10">Start a project</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  See case studies
                </a>
              </div>
            </div>
          </div>

          {/* Right card */}
          <div className="md:col-span-6">
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur transition hover:shadow-2xl sm:p-6">
              <figure className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <img
                  src={image}
                  alt="Team reviewing strategy"
                  className="h-64 w-full rounded-xl object-cover sm:h-72"
                  loading="lazy"
                />
                <figcaption className="sr-only">Our strategy and delivery team at work</figcaption>
              </figure>

              <div className="mt-8 text-center">
                <div className="text-base font-semibold text-white/95">Our work areas</div>

                {/* Chips */}
                <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 text-[13px] font-medium text-white/90 transition hover:-translate-y-0.5 hover:bg-black/65"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* CTA (pure black + shine) */}
                <div className="mt-8">
                  <a
                    href="about"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-black px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    <span className="relative z-10">About Us</span>
                    <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* helper line */}
            <p className="mt-4 text-center text-xs text-white/65">
              Secure by design • Built for scale • Outcome driven delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

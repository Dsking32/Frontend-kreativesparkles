// HeroSignature.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HeroSignature({
  headline = "Build a brand that wins hearts and markets",
  subtext = "Strategy, design, and execution aligned to outcomes. We craft calm, compounding systems that grow with your business.",
  primaryCta = { label: "Start a project", href: "contact" },
  secondaryCta = { label: "See case studies", href: "portfolio" },
  stats = [
    { label: "Client satisfaction", value: "99%" },
    { label: "Avg rating", value: "4.8/5" },
    { label: "Projects shipped", value: "15+" },
  ],
  media = {
    type: "image", // "image" | "video"
    src: "https://res.cloudinary.com/dvpfdgnkw/image/upload/Untitled_design_1_akrgd7.svg",
    poster:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  clientLogos = [
    "https://res.cloudinary.com/dvpfdgnkw/image/upload/card3_navkwo.png",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  ],
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#3A4F30]">
      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-12 md:py-24 lg:px-8">
        {/* LEFT: copy */}
        <div className="md:col-span-6">
          {/* eyebrow */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-3 text-[11px] tracking-[0.22em] uppercase text-white/70"
          >
            Kreative Sparkles
          </motion.p>

          {/* headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="
              text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738]
            "
          >
            {headline}
          </motion.h1>

          {/* subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 max-w-xl text-[15.5px] leading-7 text-white/85"
          >
            {subtext}
          </motion.p>

          {/* stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 grid max-w-xl grid-cols-3 gap-3"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur"
              >
                <div className="text-2xl font-semibold text-white">{s.value}</div>
                <div className="mt-1 text-xs font-medium tracking-wide text-white/70">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={primaryCta.href}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-black px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {/* shine sweep */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center">
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>

            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              {secondaryCta.label}
            </a>
          </motion.div>

          {/* client logos */}
          {clientLogos?.length ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap items-center gap-6 opacity-80"
            >
              {clientLogos.slice(0, 6).map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="Client logo"
                  className="h-6 w-auto brightness-0 invert opacity-80"
                  loading="lazy"
                />
              ))}
            </motion.div>
          ) : null}
        </div>

        {/* RIGHT: media */}
        <div className="relative md:col-span-6">
          <div className="relative mx-auto w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
              <div className="rounded-2xl border border-white/10 bg-black/20">
                {media?.type === "video" ? (
                  <div className="relative">
                    <video
                      className="h-[420px] w-full rounded-2xl object-cover"
                      src={media.src}
                      poster={media.poster}
                      autoPlay
                      muted
                      playsInline
                      loop
                    />
                    {/* floating play badge (decorative since autoplay/muted) */}
                    <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[11px] text-white/90 backdrop-blur">
                      <Play className="h-3.5 w-3.5" />
                      Live reel
                    </div>
                  </div>
                ) : (
                  <img
                    src={media?.src}
                    alt="Showcase"
                    className="h-[420px] w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            {/* soft vignettes */}
            <div aria-hidden className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-black/10 blur-2xl" />
            <div aria-hidden className="pointer-events-none absolute -right-6 bottom-4 h-28 w-28 rounded-full bg-black/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

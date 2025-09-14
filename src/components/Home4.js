import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Palette, Wand2, Zap, ArrowRight } from "lucide-react";

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay: d },
});

const FeatureCard = ({ Icon, title, desc, delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:shadow-2xl"
  >
    {/* soft glow on hover */}
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="absolute -inset-24 bg-gradient-to-tr from-white/5 to-transparent blur-2xl" />
    </div>

    {/* icon */}
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-black/70 to-black/30 text-white shadow-md">
      <Icon className="h-6 w-6" />
    </div>

    <h3 className="mb-1.5 text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-white/80">{desc}</p>

    <div className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-white/80 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
      <span>Explore</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </div>
  </motion.div>
);

export default function CreativeSparklesSection({
  title = "Unleash Your Kreative Potential",
  subtitle = "Everything you need to bring bold ideas to life.",
  features = [
    {
      Icon: Palette,
      title: "Design Studio",
      desc: "Pro tools with AI assists smart palettes, auto layout, export presets.",
    },
    {
      Icon: Wand2,
      title: "Magic Automation",
      desc: "Generate variants and social sets in one click. Handoff stays tidy.",
    },
    {
      Icon: Zap,
      title: "Lightning Fast",
      desc: "Instant previews and background renders keep your flow unbroken.",
    },
  ],
  ctaPrimary = "Start Creating",
  ctaSecondary = "View Pricing",
}) {
  return (
    <section className="relative overflow-hidden bg-[#3A4F30] py-20 md:py-28">
      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        {/* header */}
        <motion.div {...fadeUp(0)} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur">
            <Sparkles className="h-4 w-4 text-white" />
            <span>Kreative Sparkles</span>
          </div>

          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text">
            {title}
          </h2>

          <p className="text-[15.5px] leading-7 text-white/85">{subtitle}</p>
        </motion.div>

        {/* features */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              Icon={f.Icon}
              title={f.title}
              desc={f.desc}
              delay={0.05 * i}
            />
          ))}
        </div>

        {/* CTA row: pure-black primary + outline secondary */}
        <motion.div {...fadeUp(0.15)} className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="contact"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-black px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {/* shine sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center">
              {ctaPrimary}
              <Sparkles className="ml-2 h-4 w-4" />
            </span>
          </a>

          <a
            href="pricing"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            {ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool, Palette, Layout, BookOpen, ArrowRight,
  PanelsTopLeft, Wand2
} from "lucide-react";

const fx = {
  fade: { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } },
  rise: (i=0) => ({ hidden:{opacity:0,y:24,scale:.98}, show:{opacity:1,y:0,scale:1,transition:{duration:.5, delay:i*0.05}}}),
};

const ALL_ITEMS = [
  {
    icon: PenTool,
    title: "Brand Strategy",
    desc: "Positioning frameworks, value props, tone of voice and naming that anchor your brand.",
    bullets: ["Market & audience research", "Value prop mapping", "Narrative & tone of voice"],
    tags: ["Brand"],
    badge: "North Star",
  },
  {
    icon: Palette,
    title: "Logo & Identity",
    desc: "Distinctive logo suites, color tokens and typography that travel across surfaces.",
    bullets: ["Primary + alt marks", "Color scales & tokens", "Iconography & patterns"],
    tags: ["Brand", "Design"],
    badge: "Identity",
  },
  {
    icon: Layout,
    title: "Web & UI",
    desc: "Conversion first pages and scalable design systems with clean component APIs.",
    bullets: ["High fi screens", "Design tokens & DS", "Responsive prototyping"],
    tags: ["Digital", "Design"],
    badge: "Systems",
  },
  {
    icon: BookOpen,
    title: "Guidelines & Collateral",
    desc: "Living guidelines and on brand assets teams can ship with no second guessing.",
    bullets: ["Style guides", "Pitch decks & kits", "Stationery & templates"],
    tags: ["Brand", "Content"],
    badge: "Delivery",
  },
  {
    icon: PanelsTopLeft,
    title: "Design Ops",
    desc: "Hand off, versioning, tokens, and rituals that keep design velocity high.",
    bullets: ["Tokens & theming", "Spec & handoff QA", "Review cadence"],
    tags: ["Digital"],
    badge: "Ops",
  },
  {
    icon: Wand2,
    title: "Motion & Micro-UX",
    desc: "Subtle motion that communicates hierarchy, intent and delight without noise.",
    bullets: ["Micro interactions", "Load & transition FX", "Lottie handoff"],
    tags: ["Digital", "Design"],
    badge: "Motion",
  },
];

export default function UltraServices({
  brand = "kreative Sparkles",
  categories = ["All", "Brand", "Design", "Digital", "Content"],
  primaryCta = { label: "Start a project", href: "contact" },
  secondaryCta = { label: "See case studies", href: "portfolio" },
}) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? ALL_ITEMS : ALL_ITEMS.filter(i => i.tags.includes(active))),
    [active]
  );

  return (
    <section className="relative overflow-hidden bg-[#3A4F30]">
      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/70">Our Services</p>

          <motion.h2
            variants={fx.fade}
            className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738]"
          >
            Signature services
          </motion.h2>

          <motion.p variants={fx.fade} className="mx-auto mt-4 max-w-2xl text-white/85">
            We build brands that scale without losing soul.
          </motion.p>

          {/* Tabs */}
          <motion.div variants={fx.fade} className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`group relative rounded-full px-4 py-1.5 text-sm transition
                    ${isActive
                      ? "bg-black text-white ring-1 ring-white/10"
                      : "border border-white/20 text-white/85 hover:bg-white/10"
                    }`}
                >
                  {/* shine on active */}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out rounded-full" />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Header CTAs (black + outline to match hero) */}
          <motion.div variants={fx.fade} className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={primaryCta.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900"
            >
              {/* shine sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10">{primaryCta.label}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              {secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="relative mx-auto -mt-10 max-w-7xl px-6 pb-20 md:-mt-16 md:pb-28 lg:px-8">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <motion.article
                key={s.title}
                layout
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fx.rise(i)}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:shadow-2xl"
              >
                {/* badge */}
                <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur">
                  {s.badge}
                </span>

                {/* icon */}
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-black/20 text-white shadow-md">
                  <s.icon className="h-5 w-5" />
                </div>

                {/* title */}
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>

                {/* desc */}
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">{s.desc}</p>

                {/* bullets */}
                <ul className="mt-4 space-y-1.5 text-sm text-white/75">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* card hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-24 bg-gradient-to-tr from-white/5 to-transparent blur-2xl" />
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}

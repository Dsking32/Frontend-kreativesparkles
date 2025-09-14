import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Linkedin, Mail, Quote, Sparkles, Star } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

/* =========================
   Brand tokens
   ========================= */
const BRAND_BG = "#3A4F30"; // deep green base
const brandGradientText =
  "bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text text-transparent";

/* =========================
   Global micro-utilities (CSS)
   ========================= */
const injectedCSS = `
  /* marquee */
  @keyframes marquee-x { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
  .animate-marquee { animation: marquee-x 22s linear infinite }

  /* pause on hover */
  .marquee-track:hover { animation-play-state: paused }

  /* fade edges for marquee */
  .mask-x {
    -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
            mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }

  /* respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .animate-marquee { animation-duration: 0s; }
    .hover-lift:hover { transform: none !important; }
  }
`;

/* =========================
   Motion helpers
   ========================= */
const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const scalePop = {
  hidden: { scale: 0.94, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 230, damping: 18 } },
};

/* =========================
   HERO
   ========================= */
function Hero() {
  return (
    <section
      className="relative flex min-h-[78vh] flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ backgroundColor: BRAND_BG }}
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1920&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-30"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(0,0,0,.3),transparent_60%)]" />
      </div>

      <motion.div initial="hidden" animate="show" variants={stagger} className="z-10">
        <motion.div
          variants={scalePop}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs text-zinc-800 ring-1 ring-black/5 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Visionary Creator</span>
        </motion.div>

        <motion.img
          src="https://res.cloudinary.com/dvpfdgnkw/image/upload/Ceo_nie08g.jpg"
          alt="Zainab Shekoni"
          className="mx-auto mb-8 h-32 w-32 rounded-full border-4 border-white/70 object-cover shadow-2xl"
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />

        <motion.h1 variants={fadeIn} className="text-5xl sm:text-6xl font-semibold text-white tracking-tight">
          <span className={brandGradientText}>Zainab Shekoni</span>
        </motion.h1>
        <motion.p variants={fadeIn} className="mt-3 text-xl text-white/90">
          Master of Design
        </motion.p>
        <motion.p variants={fadeIn} className="mx-auto mt-5 max-w-3xl text-[15.5px] leading-7 text-white/85">
          I blend product strategy, crisp UI systems, and performant front end engineering to ship experiences
          that feel effortless and deliver results.
        </motion.p>

        <motion.div variants={stagger} className="mt-10 flex items-center justify-center gap-4">
          {[
            { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:contact@alexmorgan.dev", label: "Email" },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              aria-label={s.label}
              variants={fadeIn}
              className="hover-lift group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 p-3 text-white shadow-xl backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <s.icon className="relative z-10 h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================
   ABOUT
   ========================= */
function About() {
  return (
    <section className="relative py-20" style={{ backgroundColor: BRAND_BG }}>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={stagger}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-5xl px-6 text-center"
      >
        <motion.h2 variants={fadeIn} className="text-4xl sm:text-5xl font-semibold text-white">
          <span className={brandGradientText}>Who I Am</span>
        </motion.h2>
        <motion.p variants={fadeIn} className="mx-auto mt-5 max-w-3xl text-[15.5px] leading-7 text-white/85">
          A designer engineer focused on shipping elegant, accessible, and measurable digital products. Calm craft,
          strong systems, and bias to action.
        </motion.p>
        <motion.ul variants={stagger} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {["Figma", "Canva", "Framer", "Adobe Photoshop", "Framer Motion", "WebGL"].map((t, i) => (
            <motion.li
              key={i}
              variants={scalePop}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur"
            >
              <Star className="h-3.5 w-3.5 text-white/90" />
              {t}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

/* =========================
   HIGHLIGHTS – Auto-scrolling marquee (with pics)
   ========================= */
function Highlights() {
  const highlights = [
    {
      title: "Award Winning Design",
      desc: "Recognized for innovative UI/UX at Webby Awards 2024.",
      image: "https://images.unsplash.com/photo-1516382799247-87df95d790b4?q=80&w=640&auto=format&fit=crop",
    },
    {
      title: "Global Impact",
      desc: "Served clients in 3 countries with tailored solutions.",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=640&auto=format&fit=crop",
    },
    {
      title: "Tech Innovator",
      desc: "Pioneered WebGL animations for immersive experiences.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=640&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative py-20" style={{ backgroundColor: BRAND_BG }}>
      <style>{injectedCSS}</style>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white">
          <span className={brandGradientText}>Career Highlights</span>
        </h2>
      </div>

      <div className="mt-10 overflow-hidden px-6">
        <div className="mask-x marquee-track">
          <div className="flex w-max animate-marquee gap-6">
            {[...highlights, ...highlights].map((h, i) => (
              <article
                key={i}
                className="w-[360px] flex-shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur"
              >
                <img src={h.image} alt={h.title} className="h-44 w-full rounded-2xl object-cover" />
                <h3 className="mt-3 text-lg font-semibold text-white">{h.title}</h3>
                <p className="mt-1.5 text-sm text-white/85">{h.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   ✨ NEW: IMPACT REEL (replaces “Signature Projects”)
   Horizontally scrollable, snap-to-card case studies with before/after metrics.
   ========================= */
function ImpactReel() {
  const cases = useMemo(
    () => [
      {
        title: "Fintech Onboarding",
        blurb: "Reduced friction across KYC with clearer flows and instant validation.",
        image:
          "https://images.unsplash.com/photo-1556742400-b5b7c5121f85?q=80&w=1200&auto=format&fit=crop",
        before: [{ k: "Drop-off", v: "42%" }, { k: "Avg. time", v: "7m 10s" }],
        after: [{ k: "Drop-off", v: "18%" }, { k: "Avg. time", v: "3m 55s" }],
      },
      {
        title: "Media Homepage",
        blurb: "Rebalanced hierarchy, tightened Core Web Vitals, and tuned layouts.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        before: [{ k: "LCP", v: "4.5s" }, { k: "Bounce", v: "58%" }],
        after: [{ k: "LCP", v: "1.9s" }, { k: "Bounce", v: "36%" }],
      },
      {
        title: "SaaS Signup",
        blurb: "Fewer fields, smart defaults, and progressive profiling.",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        before: [{ k: "CVR", v: "2.1%" }, { k: "Errors", v: "12%" }],
        after: [{ k: "CVR", v: "5.8%" }, { k: "Errors", v: "3%" }],
      },
      {
        title: "E-commerce PDP",
        blurb: "Clear variant UX + trust signals increased confidence.",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        before: [{ k: "ATC", v: "4.4%" }, { k: "Refunds", v: "3.2%" }],
        after: [{ k: "ATC", v: "9.6%" }, { k: "Refunds", v: "1.1%" }],
      },
    ],
    []
  );

  return (
    <section className="relative py-20" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white">
          <span className={brandGradientText}>Impact Reel</span>
        </h2>
        <p className="mt-3 text-lg text-white/85">
          Scroll through quick case snapshots—each shows what changed and why it mattered.
        </p>
      </div>

      <div className="relative mt-10">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#3A4F30] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#3A4F30] to-transparent" />

        <div
          className="mx-auto max-w-6xl snap-x snap-mandatory overflow-x-auto px-6 [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ scrollBehavior: "smooth" }}
        >
          <style>{`.snap-x::-webkit-scrollbar{display:none}`}</style>

          <ul className="flex w-max gap-6">
            {cases.map((c, i) => (
              <li key={i} className="snap-start">
                <article className="w-[320px] sm:w-[420px] lg:w-[520px] overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 text-left text-white shadow-xl backdrop-blur">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={c.image} alt={c.title} className="h-48 w-full object-cover" />
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-white/85">{c.blurb}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                      <div className="text-[11px] uppercase tracking-wide text-white/70">Before</div>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {c.before.map((b, j) => (
                          <li key={j} className="flex items-center justify-between">
                            <span className="text-white/80">{b.k}</span>
                            <span className="font-semibold text-white">{b.v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                      <div className="text-[11px] uppercase tracking-wide text-white/70">After</div>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {c.after.map((b, j) => (
                          <li key={j} className="flex items-center justify-between">
                            <span className="text-white/80">{b.k}</span>
                            <span className="font-semibold text-white">{b.v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-white/70">
                    Swipe → for more case snapshots
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =========================
   PHILOSOPHY – stacked on scroll
   ========================= */
function PhilosophyCard({ title, body }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-12 text-center text-white shadow-2xl backdrop-blur">
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      <div className="relative z-10">
        <h3 className="mb-4 text-3xl sm:text-4xl font-semibold">{title}</h3>
        <p className="mx-auto max-w-3xl text-white/90">{body}</p>
      </div>
    </div>
  );
}

function CardLayer({ index, progress, title, body }) {
  const cardStart = index * 0.25;
  const cardEnd = cardStart + 0.15;
  const nextCardStart = (index + 1) * 0.25;

  const y = useTransform(progress, [cardStart, cardEnd], [140, 0]);
  const opacity = useTransform(progress, [cardStart, cardEnd, nextCardStart, nextCardStart + 0.1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [cardStart, cardEnd], [0.98, 1]);

  return (
    <motion.div style={{ y, opacity, scale, zIndex: index + 10 }} className="absolute inset-0 flex items-center px-6">
      <PhilosophyCard title={title} body={body} />
    </motion.div>
  );
}

function PhilosophyStack({ navOffset = 0 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 20%", "end 80%"] });

  const cards = [
    {
      title: "Visionary Design",
      body:
        "Immersive aesthetics with intuitive flows. Every interaction is intentional, creating calm, confident experiences.",
    },
    {
      title: "Flawless Execution",
      body:
        "Pixel perfect, high performance front ends that scale. Clean APIs, predictable systems, and healthy budgets for perf.",
    },
    {
      title: "Transformative Impact",
      body:
        "Work that moves metrics and hearts. Clear outcomes, crisp craft, and iteration that compounds.",
    },
  ];

  return (
    <section ref={ref} className="relative" style={{ height: "380vh", backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-6xl px-6 pt-24 text-center">
        <motion.h2 initial="hidden" whileInView="show" variants={fadeIn} className="text-4xl sm:text-5xl font-semibold text-white">
          <span className={brandGradientText}>My Philosophy</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
          className="mx-auto mt-4 max-w-4xl text-white/85"
        >
          Watch each pillar stack as you scroll—a simple visual showing how principles build on one another.
        </motion.p>
      </div>

      <div className="sticky top-0 z-0 flex h-screen items-center justify-center" style={{ top: navOffset }}>
        <div className="relative w-full max-w-6xl" style={{ height: 560 }}>
          {cards.map((c, i) => (
            <CardLayer key={i} index={i} progress={scrollYProgress} title={c.title} body={c.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   TESTIMONIALS (with faces)
   ========================= */
function TestimonialGrid() {
  const testimonials = [
    {
      quote: "Working with Zainab was a game changer. The product feels world-class.",
      author: "Jane Smith",
      role: "CEO, NovaTech",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "Her designs and code ship faster than anyone I’ve worked with.",
      author: "Michael Lee",
      role: "Product Lead, FinEdge",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative py-20" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white">
          <span className={brandGradientText}>Client Voices</span>
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        variants={stagger}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2"
      >
        {testimonials.map((t, i) => (
          <motion.figure
            key={i}
            variants={fadeIn}
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-7 text-left shadow-xl backdrop-blur"
          >
            <Quote className="mb-3 h-6 w-6 text-white/50" />
            <blockquote className="text-[15.5px] leading-7 text-white/90 italic">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold text-white">{t.author}</div>
                <div className="text-xs text-white/70">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

/* =========================
   STATS
   ========================= */
function StatsGrid() {
  const stats = [
    { value: "15+", label: "Projects" },
    { value: "12", label: "Industries" },
    { value: "95%", label: "NPS" },
    { value: "3", label: "Countries" },
  ];

  return (
    <section className="relative py-20" style={{ backgroundColor: BRAND_BG }}>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={stagger}
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-6xl px-6"
      >
        <motion.h2 variants={fadeIn} className="text-center text-4xl sm:text-5xl font-semibold text-white">
          <span className={brandGradientText}>By the Numbers</span>
        </motion.h2>
        <motion.div variants={stagger} className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={scalePop}
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-white/15 bg-white/10 p-7 text-center shadow-xl backdrop-blur"
            >
              <div className="text-3xl font-semibold">
                <span className={brandGradientText}>{s.value}</span>
              </div>
              <div className="mt-1 text-sm text-white/85">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================
   CTA (black shine)
   ========================= */
function Cta() {
  return (
    <section className="relative py-24" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white">
          <span className={brandGradientText}>Let’s Build Something Exceptional</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/85">
          Ready to transform your idea into a calm, confident product? Tell me a bit about your goals and timeline.
        </p>
        <a
          href="mailto:stephenfemikingsley@gmail.com"
          className="mt-8 group relative inline-flex items-center overflow-hidden rounded-full bg-black px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          <span className="relative z-10 flex items-center">
            Start the Journey
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>
    </section>
  );
}

/* =========================
   PAGE
   ========================= */
export default function PortfolioPage({ navOffset = 0 }) {
  return (
    <div className="min-h-screen bg-[#3A4F30] font-sans text-white">
      {/* inject global CSS helpers once */}
      <style>{injectedCSS}</style>

      <Hero />
      <About />
      <Highlights />
      {/* Replaced old section with the new Impact Reel */}
      <ImpactReel />
      <PhilosophyStack navOffset={navOffset} />
      <TestimonialGrid />
      <StatsGrid />
      <Cta />
    </div>
  );
}

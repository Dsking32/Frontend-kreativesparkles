import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Smartphone,
  ShoppingCart,
  Search,
  Megaphone,
  Briefcase,
  LifeBuoy,
  ArrowRight,
  Sparkles,
} from "lucide-react";


/**
 * ServicesSection – animated services grid (nav-safe + dark-mode)
 * Stack: React, TailwindCSS, Framer Motion, lucide-react
 *
 * Usage:
 *   import ServicesSection from "./ServicesSection";
 *   <ServicesSection onCtaClick={() => router.push('/contact')} />
 */

const gradientText =
  "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 bg-clip-text text-transparent";

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const springy = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.7 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

const DEFAULT_SERVICES = [
  {
    key: "web",
    title: "Web Development",
    desc: "High performance websites and web apps built with modern stacks.",
    icon: Code2,
    bullets: ["Next.js/React", "API integration", "Performance & SEO"],
  },
  {
    key: "uiux",
    title: "UI/UX Design",
    desc: "User centered interfaces, design systems, and delightful micro-interactions.",
    icon: Palette,
    bullets: ["Design systems", "Prototyping", "Accessibility (WCAG)"],
  },
  {
    key: "mobile",
    title: "Mobile Apps",
    desc: "iOS & Android apps with a single codebase or fully native flows.",
    icon: Smartphone,
    bullets: ["React Native", "Offline first", "App Store / Play deploy"],
  },
  {
    key: "commerce",
    title: "E-commerce",
    desc: "Conversion-optimized storefronts, secure payments, and analytics.",
    icon: ShoppingCart,
    bullets: ["Headless commerce", "Checkout flows", "Subscriptions"],
  },
  {
    key: "seo",
    title: "SEO Optimization",
    desc: "Technical SEO, Core Web Vitals, and content structure for visibility.",
    icon: Search,
    bullets: ["Audit & fixes", "Schema & sitemaps", "Performance"],
  },
  {
    key: "marketing",
    title: "Digital Marketing",
    desc: "Campaigns that blend creative with data for measurable growth.",
    icon: Megaphone,
    bullets: ["Paid & organic", "Email & funnels", "Attribution"],
  },
  {
    key: "consulting",
    title: "Consulting",
    desc: "Product strategy, roadmaps, and fractional leadership support.",
    icon: Briefcase,
    bullets: ["Workshops", "Roadmaps", "Team enablement"],
  },
  {
    key: "support",
    title: "Support & Maintenance",
    desc: "Reliable SLAs, monitoring, and iterative improvements post launch.",
    icon: LifeBuoy,
    bullets: ["24/7 monitoring", "SLA support", "Continuous updates"],
  },
];

export default function ServicesSection({
  title = "Services",
  highlight = "Services",
  subtitle = "Everything you need to design, build, and grow your product.",
  services = DEFAULT_SERVICES,
  cta = { label: "Get a quote", href: "#contact" },
  onCtaClick,
}) {
  return (
    <section className="relative isolate">
      {/* decorative soft glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-400/25 to-sky-400/25 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:bg-zinc-900/60 dark:text-zinc-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>What we do</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-white">
            {title.replace(highlight, "")} <span className={gradientText}>{highlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => {
            const Icon = s.icon || Code2;
            return (
              <motion.li
                key={s.key || s.title || i}
                variants={springy}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                {/* soft highlight line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-sky-500/15 p-2.5 ring-1 ring-zinc-200/60 dark:ring-zinc-800">
                    <Icon className="h-5 w-5 text-zinc-800 transition group-hover:scale-110 dark:text-zinc-100" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{s.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{s.desc}</p>
                    {Array.isArray(s.bullets) && s.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                        {s.bullets.map((b, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* CTA per card (optional) */}
                {s.href && (
                  <a
                    href={s.href}
                    className="mt-4 inline-flex items-center text-sm font-medium text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-100"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                )}

                {/* decorative gradient hover */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.07 }}
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500 to-sky-500 blur-2xl"
                />
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Page CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          {cta?.href ? (
            <a
              href={cta.href}
              onClick={onCtaClick}
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60 active:scale-[0.98]"
            >
              {cta.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          ) : null}
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Prefer a custom bundle? <span className="font-medium">We’ll tailor a plan.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

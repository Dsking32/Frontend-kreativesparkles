// src/components/PricingPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Smartphone,
  Palette,
  IdCard,
  FileText,
  Megaphone,
  Search,
  PenTool,
  Wand2,
  BarChart3,
  Layout,
} from "lucide-react";

/* ------------------------------
   Helpers
------------------------------ */
const gradientBtn =
  "bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] text-[#3A4F30]";

const contactHref = (payload = {}) => {
  const clean = Object.fromEntries(
    Object.entries(payload)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => [k, String(v)])
  );
  const qs = new URLSearchParams(clean).toString();
  return `/contact${qs ? `?${qs}` : ""}`;
};

const formatNGN = (n) =>
  `₦${(n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

/* ------------------------------
   Small UI atoms
------------------------------ */
const Section = ({ title, eyebrow, children }) => (
  <div className="space-y-5">
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-6 rounded-full bg-[#F8B9A9]" />
      <div>
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-wider text-white/70">
            {eyebrow}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-black">{title}</h2>
      </div>
    </div>
    {children}
  </div>
);

const Chip = ({ children }) => (
  <span className="text-[11px] px-2 py-1 rounded-full bg-white/10 text-white/85 ring-1 ring-white/15">
    {children}
  </span>
);

/* ------------------------------
   Cards
------------------------------ */
const PackageCard = ({
  icon: Icon,
  name,
  tagline,
  timeline,
  idealFor,
  bullets = [],
  best,
  from,
  unit,
  payload,
}) => (
  <motion.a
    href={contactHref({ interest: "package", plan: name, from, unit, ...payload })}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    className={`group relative flex flex-col overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur transition ${
      best
        ? "border-[#F8B9A9]/50 bg-white/10"
        : "border-white/10 bg-white/5 hover:bg-white/10"
    }`}
  >
    {best && (
      <div className="absolute right-4 top-4">
        <Chip>Most popular</Chip>
      </div>
    )}

    <div className="inline-flex items-center gap-2">
      <span className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
        <Icon className="h-5 w-5 text-[#F8B9A9]" />
      </span>
      <h3 className="text-lg font-extrabold tracking-tight">{name}</h3>
    </div>

    <p className="mt-2 text-sm text-white/80">{tagline}</p>

    <div className="mt-4 flex flex-wrap items-center gap-2">
      {timeline && <Chip>Timeline: {timeline}</Chip>}
      {idealFor && <Chip>Ideal for: {idealFor}</Chip>}
      {from != null && (
        <Chip>
          Starting at: {formatNGN(from)} {unit && <span>{unit}</span>}
        </Chip>
      )}
    </div>

    {!!bullets?.length && (
      <ul className="mt-4 grid gap-2 text-sm">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F8B9A9]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    )}

    <div className="mt-6">
      <span
        className={`group/btn inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition hover:brightness-110 active:scale-[0.98] ${gradientBtn}`}
      >
        Get a tailored quote
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  </motion.a>
);

const ServiceCard = ({ icon: Icon, name, note, link, onClick }) => (
  <motion.a
    href={link}
    onClick={onClick}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:bg-white/10"
  >
    <div
      className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 blur-lg transition duration-300 group-hover:opacity-100"
      style={{
        background:
          "linear-gradient(135deg, rgba(248,185,169,0.25), rgba(181,71,56,0.25))",
      }}
    />
    <div className="relative inline-flex items-center justify-center rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
      <Icon className="h-5 w-5 text-[#F8B9A9]" />
    </div>
    <div className="mt-3">
      <h3 className="text-lg font-bold tracking-tight">{name}</h3>
      {note && <p className="mt-1 text-sm text-white/80">{note}</p>}
    </div>
    <div className="mt-5">
      <span
        className={`group/btn inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition ${gradientBtn}`}
      >
        Enquire
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  </motion.a>
);

const ScopeCard = ({ icon: Icon, label, scopes = [], examples = [], payload }) => (
  <a
    href={contactHref({ interest: "scope", item: label, ...payload })}
    className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur transition hover:bg-white/10"
  >
    <div className="mb-2 inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
      <Icon className="h-5 w-5 text-[#F8B9A9]" />
    </div>

    <div className="text-base font-bold">{label}</div>

    {!!scopes.length && (
      <ul className="mt-3 flex flex-wrap gap-2">
        {scopes.map((s) => (
          <li key={s}>
            <Chip>{s}</Chip>
          </li>
        ))}
      </ul>
    )}

    {!!examples.length && (
      <div className="mt-3 text-xs text-white/80">
        <div className="mb-1 font-semibold text-white/90">Typical inclusions</div>
        <ul className="space-y-1 list-disc pl-4">
          {examples.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    )}

    <div className="mt-3 text-sm font-semibold text-[#F8B9A9] inline-flex items-center">
      Start scoping <ArrowRight className="ml-1 h-4 w-4" />
    </div>
  </a>
);

/* ------------------------------
   Data
------------------------------ */
const packages = [
  {
    icon: Layout,
    name: "Starter Site",
    tagline: "Launch-ready 1–3 page website to look legit and start converting.",
    timeline: "2 weeks",
    idealFor: "MVP / SMEs",
    from: 450_000,
    bullets: [
      "Custom landing page + basic CMS",
      "Mobile responsive & performance tuned",
      "Contact form + essential SEO setup",
      "1 revision round",
    ],
    payload: { category: "web" },
  },
  {
    icon: Palette,
    name: "Brand Seed",
    tagline:
      "Clean identity kit that works across social, pitch decks and print.",
    timeline: "1–2 weeks",
    idealFor: "Founders / Rebrands",
    from: 300_000,
    bullets: [
      "Logo suite (primary, mono, favicon)",
      "Color palette + type pairing",
      "Social headers + profile assets",
      "Mini brand guide (PDF)",
    ],
    payload: { category: "brand" },
  },
  {
    icon: Layout,
    name: "Website Plus (incl. e-commerce)",
    tagline:
      "Business website with optional store, payments and analytics baked in.",
    timeline: "3–5 weeks",
    idealFor: "Growth-stage SMEs",
    from: 1_200_000,
    bullets: [
      "CMS pages, blogs & forms",
      "Optional store: products, checkout, payments",
      "SEO structure, analytics & pixel tracking",
      "Content templates & training",
    ],
    best: true,
    payload: { category: "web_plus" },
  },
  {
    icon: Smartphone,
    name: "App MVP",
    tagline: "Validate your idea with a production-grade cross-platform MVP.",
    timeline: "6–10 weeks",
    idealFor: "Startups",
    from: 1_600_000,
    bullets: [
      "React Native (iOS/Android) + Admin",
      "Auth, onboarding, push notifications",
      "API integration & deployment",
      "Design system starter",
    ],
    payload: { category: "app" },
  },
  {
    icon: Wand2,
    name: "Business Consulting",
    tagline:
      "On-call creative direction, brand/UX audits and rapid ideation sprints.",
    timeline: "2–5 days / sprint",
    idealFor: "Strategy / Turnarounds",
    from: 250_000,
    unit: "/sprint",
    bullets: [
      "Brand & UX audits and tear-downs",
      "Creative direction sprints",
      "Content & campaign ideation",
      "Roadmap & prioritization workshop",
    ],
    payload: { category: "consulting" },
  },
  {
    icon: Megaphone,
    name: "Social Launch",
    tagline: "Kickstart your presence with content that actually lands.",
    timeline: "Monthly",
    idealFor: "Founders / SMEs",
    from: 100_000,
    unit: "/mo",
    bullets: [
      "Content calendar + copy",
      "Design templates (IG, LinkedIn)",
      "Publishing & monthly reporting",
      "Community engagement basics",
    ],
    payload: { category: "social" },
  },
];

// Removed "Web & Apps" and "Extras"
const categories = [
  {
    title: "Branding & Design",
    items: [
      {
        key: "branding",
        name: "Logo & Brand Identity",
        note: "Logo, colors, fonts, brand kit",
        icon: Palette,
      },
      {
        key: "stationery",
        name: "Stationery Design",
        note: "Cards, letterheads, brochures",
        icon: IdCard,
      },
      {
        key: "flyers",
        name: "Flyers & Posters",
        note: "Social media and print collateral",
        icon: PenTool,
      },
      {
        key: "slides",
        name: "Presentation Slides",
        note: "Pitch and business decks",
        icon: FileText,
      },
    ],
  },
  {
    title: "Marketing & Growth",
    items: [
      {
        key: "seo",
        name: "SEO Optimization",
        note: "Technical fixes, schema, sitemaps",
        icon: Search,
      },
      {
        key: "marketing",
        name: "Digital Marketing",
        note: "Email, landing funnels, analytics",
        icon: Megaphone,
      },
      {
        key: "social",
        name: "Social Media Management",
        note: "Content creation & engagement",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "Business Consulting",
    items: [
      {
        key: "consult_audit",
        name: "Brand & UX Audit",
        note: "Heuristic review, gaps, quick wins",
        icon: BarChart3,
      },
      {
        key: "consult_creative",
        name: "Creative Direction Sprint",
        note: "Positioning, tone, campaign hooks",
        icon: Wand2,
      },
      {
        key: "consult_workshop",
        name: "Strategy Workshop",
        note: "Roadmap, priorities, resourcing",
        icon: FileText,
      },
    ],
  },
];

const scopingMenu = [
  {
    icon: Layout,
    label: "Website (incl. e-commerce)",
    scopes: ["Basic", "Standard", "Advanced"],
    examples: [
      "Landing page / corporate site",
      "Blog / CMS pages",
      "Optional store: products + checkout",
    ],
    payload: { category: "web" },
  },
  {
    icon: Smartphone,
    label: "Mobile App",
    scopes: ["MVP", "Plus", "Full"],
    examples: ["Customer app", "Rider app", "Admin console"],
    payload: { category: "app" },
  },
  {
    icon: Palette,
    label: "Logo & Brand Seed",
    scopes: ["Seed", "Core", "Pro"],
    examples: ["Logo", "Color palette", "Fonts"],
    payload: { category: "brand" },
  },
  {
    icon: Megaphone,
    label: "Social Media",
    scopes: ["Starter", "Standard", "Pro"],
    examples: ["Content calendar", "Design templates", "Reports"],
    payload: { category: "social" },
  },
  {
    icon: Search,
    label: "SEO Technical",
    scopes: ["Fixes", "Structuring", "Growth"],
    examples: ["Issue remediation", "Schema", "Sitemaps"],
    payload: { category: "seo" },
  },
  {
    icon: Wand2,
    label: "Business Consulting",
    scopes: ["Audit", "Sprint", "Advisory"],
    examples: ["UX audit", "Direction", "Ideation"],
    payload: { category: "consulting" },
  },
];

/* ------------------------------
   Component
------------------------------ */
export default function PricingPage({ onCta }) {
  const [mode, setMode] = useState("packages");

  return (
    <main className="relative bg-[#3A4F30] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
        <div className="absolute inset-0 bg-[#3A4F30]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_20%,rgba(255,255,255,.08),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              services & packages
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Flexible engagement. <span className="text-[#F8B9A9]">Clear next steps.</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
              Choose a package or start with a scope we’ll craft a quote that fits.
            </p>

            {/* Toggle */}
            <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 p-1 text-sm backdrop-blur">
              <button
                onClick={() => setMode("packages")}
                className={`rounded-full px-3 py-1.5 transition ${
                  mode === "packages"
                    ? `${gradientBtn} shadow`
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                Packages
              </button>
              <button
                onClick={() => setMode("menu")}
                className={`rounded-full px-3 py-1.5 transition ${
                  mode === "menu"
                    ? `${gradientBtn} shadow`
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                Scoping Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        {mode === "packages" ? (
          <motion.section
            key="packages"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="relative isolate mt-12 sm:mt-16"
          >
            <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8 space-y-12">
              <Section eyebrow="Bundles" title="Project Packages">
                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {packages.map((p) => (
                    <PackageCard key={p.name} {...p} />
                  ))}
                </div>
              </Section>

              <div className="space-y-12">
                {categories.map((cat) => (
                  <div key={cat.title} className="space-y-5">
                    <Section eyebrow="" title={cat.title}>
                      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {cat.items.map((s) => (
                          <ServiceCard
                            key={s.key}
                            icon={s.icon}
                            name={s.name}
                            note={s.note}
                            link={contactHref({
                              interest: "service",
                              plan: s.key,
                              label: s.name,
                            })}
                            onClick={() => onCta?.(s.key)}
                          />
                        ))}
                      </div>
                    </Section>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="menu"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="relative isolate mt-12 sm:mt-16"
          >
            <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
              <Section eyebrow="" title="Scoping Menu">
                {/* New note about individual services */}
                <p className="mb-4 text-sm text-white/80">
                  Need just one thing? We also deliver{" "}
                  <span className="font-semibold text-white/90">
                    individual services
                  </span>{" "}
                  as standalone engagements no bundle required.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {scopingMenu.map((m) => (
                    <ScopeCard key={m.label} {...m} />
                  ))}
                </div>
              </Section>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center shadow-xl backdrop-blur md:flex-row md:text-left">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold">
                Want a custom quote tailored to your scope?
              </h4>
              <p className="mt-1 text-white/85 text-sm sm:text-base">
                Share your goals and timeline we’ll reply with options.
              </p>
            </div>
            <a
              href="/contact"
              className={`group inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition hover:brightness-110 active:scale-[0.98] ${gradientBtn}`}
            >
              Start a project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// src/components/PricingPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Smartphone,
  ShoppingCart,
  Palette,
  IdCard,
  FileText,
  Megaphone,
  Search,
  PenTool,
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

/* ------------------------------
   Small UI atoms
------------------------------ */
const Section = ({ title, children }) => (
  <div className="space-y-5">
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-6 rounded-full bg-[#F8B9A9]" />
      <h2 className="text-xl sm:text-2xl font-black">{title}</h2>
    </div>
    {children}
  </div>
);

const ServiceCard = ({ icon: Icon, name, note, link, onClick }) => (
  <motion.a
    href={link}
    onClick={onClick}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition"
  >
    {/* Ambient glow */}
    <div className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 blur-lg transition duration-300 group-hover:opacity-100"
         style={{ background: "linear-gradient(135deg, rgba(248,185,169,0.25), rgba(181,71,56,0.25))" }} />

    {/* Decorative corner gradients */}
    <div className="pointer-events-none absolute -top-28 -right-24 h-48 w-48 rounded-full bg-[#F8B9A9]/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-28 -left-24 h-48 w-48 rounded-full bg-[#B54738]/10 blur-3xl" />

    {/* Icon badge */}
    <div className="relative inline-flex items-center justify-center rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
      <Icon className="h-5 w-5 text-[#F8B9A9]" />
    </div>

    {/* Content */}
    <div className="mt-3">
      <h3 className="text-lg font-bold tracking-tight">{name}</h3>
      {note && <p className="mt-1 text-sm text-white/80">{note}</p>}
    </div>

    {/* Price line */}
    <div className="mt-4 text-2xl sm:text-3xl font-black">Get a quote</div>

    {/* CTA */}
    <div className="mt-5">
      <span
        className={`group/btn inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition ${gradientBtn}`}
      >
        Get a quote
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
      </span>
    </div>

    {/* Focus ring */}
    <span className="absolute inset-0 rounded-3xl ring-1 ring-transparent focus-within:ring-white/40" />
  </motion.a>
);

/* ------------------------------
   Component
------------------------------ */
export default function PricingPage({ onCta }) {
  const [mode, setMode] = useState("packages");

  const categories = [
    {
      title: "Web & Apps",
      items: [
        {
          key: "website",
          name: "Website Development",
          note: "Corporate, portfolio, or landing sites",
          icon: Code2,
        },
        {
          key: "ecommerce",
          name: "E-commerce",
          note: "Shopify or headless storefronts",
          icon: ShoppingCart,
        },
        {
          key: "mobile",
          name: "Mobile App Development",
          note: "iOS and Android via React Native",
          icon: Smartphone,
        },
      ],
    },
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
      title: "Extras",
      items: [
        {
          key: "custom",
          name: "Custom Solutions",
          note: "Integrations or bespoke systems",
          icon: Code2,
        },
      ],
    },
  ];

  const menu = [
    {
      icon: Code2,
      label: "Website",
      from: 900000,
      items: ["Landing page", "Corporate site", "Portfolio"],
    },
    {
      icon: ShoppingCart,
      label: "E-commerce",
      from: 1200000,
      items: ["Shopify", "Payments", "Funnels"],
    },
    {
      icon: Smartphone,
      label: "Mobile App",
      from: 1600000,
      items: ["Customer app", "Rider app", "Admin console"],
    },
    {
      icon: Palette,
      label: "Logo & Brand Seed",
      from: 30000,
      items: ["Logo", "Color palette", "Fonts"],
    },
    {
      icon: Megaphone,
      label: "Social Media (mo)",
      from: 100000,
      items: ["Instagram", "LinkedIn", "Reports"],
    },
  ];

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
              pricing
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Simple pricing. <span className="text-[#F8B9A9]">Clear next steps.</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
              Pick a package or tell us your budget — we’ll tailor a quote.
            </p>

            {/* Toggle */}
            <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 p-1 text-sm backdrop-blur">
              <button
                onClick={() => setMode("packages")}
                className={`rounded-full px-3 py-1.5 transition ${
                  mode === "packages" ? `${gradientBtn} shadow` : "text-white/90 hover:bg-white/10"
                }`}
              >
                Packages
              </button>
              <button
                onClick={() => setMode("menu")}
                className={`rounded-full px-3 py-1.5 transition ${
                  mode === "menu" ? `${gradientBtn} shadow` : "text-white/90 hover:bg-white/10"
                }`}
              >
                Starting-at Menu
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
            <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 space-y-12">
              {categories.map((cat) => (
                <div key={cat.title} className="space-y-5">
                  <Section title={cat.title}>
                    <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {cat.items.map((s) => (
                        <ServiceCard
                          key={s.key}
                          icon={s.icon}
                          name={s.name}
                          note={s.note}
                          link={contactHref({
                            interest: "package",
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
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
                {menu.map((m) => {
                  const Icon = m.icon;
                  return (
                    <a
                      key={m.label}
                      href={contactHref({
                        interest: "menu",
                        item: m.label,
                        from: m.from,
                      })}
                      className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur transition hover:bg-white/10"
                    >
                      <div className="mb-2 inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                        <Icon className="h-5 w-5 text-[#F8B9A9]" />
                      </div>
                      <div className="text-sm text-white/80">Starting at</div>
                      <div className="text-xl font-bold">₦{m.from.toLocaleString()}</div>

                      {!!m.items?.length && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {m.items.slice(0, 3).map((it) => (
                            <li
                              key={it}
                              className="text-[11px] px-2 py-1 rounded-full bg-white/10 text-white/85 ring-1 ring-white/15"
                            >
                              {it}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-3 text-sm font-semibold text-[#F8B9A9] inline-flex items-center">
                        Enquire <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </a>
                  );
                })}
              </div>
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
                Ready to get a tailored quote in ₦?
              </h4>
              <p className="mt-1 text-white/85 text-sm sm:text-base">
                Share your goals — we usually respond within 24 hours.
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

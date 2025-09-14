// src/components/PricingPage.js
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  ArrowRight,
  Info,
  Code2,
  Palette,
  Smartphone,
  ShoppingCart,
  Search,
  Megaphone,
  FileText,
  PenTool,
  IdCard,
  ScrollText,
  Image as ImageIcon,
  LayoutTemplate,
} from "lucide-react";

/* ------------------------------
   Helpers
------------------------------ */
const ngn = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(n));

const gradientBtn =
  "bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] text-[#3A4F30]";

/* ------------------------------
   Page
------------------------------ */
export default function PricingPage({ onCta }) {
  // "retainer" | "project" | "design"
  const [mode, setMode] = useState("retainer");

  /* ------------------------------
     1) Your existing retainers
  ------------------------------ */
  const retainers = useMemo(
    () => [
      {
        key: "starter",
        name: "Starter",
        price: 350000,
        period: "mo",
        blurb: "Perfect for small sites or continuous tweaks.",
        features: [
          "Up to 30 dev/design hours",
          "1 active project",
          "Weekly check-ins",
          "Email & chat support",
          "Basic analytics snapshots",
        ],
        badge: "Most Affordable",
      },
      {
        key: "growth",
        name: "Growth",
        price: 650000,
        period: "mo",
        blurb: "For teams shipping features every sprint.",
        features: [
          "Up to 60 dev/design hours",
          "2 active projects",
          "Twice-weekly standups",
          "Priority support (next-biz-day)",
          "SEO & performance reviews",
        ],
        highlight: true,
        badge: "Best Value",
      },
      {
        key: "scale",
        name: "Scale",
        price: 1200000,
        period: "mo",
        blurb: "Dedicated squad for ambitious roadmaps.",
        features: [
          "Up to 120 dev/design hours",
          "Parallel projects",
          "Dedicated PM & QA",
          "SLA support (same-day)",
          "Quarterly growth workshops",
        ],
      },
    ],
    []
  );

  /* ------------------------------
     2) Your existing projects
  ------------------------------ */
  const projects = useMemo(
    () => [
      {
        key: "web",
        icon: Code2,
        name: "Web Development",
        from: 900000,
        timeline: "3–6 weeks",
        cover:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
        details: [
          "Next.js/React build",
          "CMS or headless",
          "Core Web Vitals tuned",
          "Basic SEO setup",
        ],
      },
      {
        key: "uiux",
        icon: Palette,
        name: "UI/UX Design",
        from: 650000,
        timeline: "2–4 weeks",
        cover:
          "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1400&auto=format&fit=crop",
        details: [
          "Design system seed",
          "Hi-fi prototypes",
          "WCAG-focused",
          "Dev handoff",
        ],
      },
      {
        key: "mobile",
        icon: Smartphone,
        name: "Mobile Apps",
        from: 1600000,
        timeline: "5–10 weeks",
        cover:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1400&auto=format&fit=crop",
        details: [
          "React Native (iOS/Android)",
          "API integration",
          "QA + TestFlight/Play",
        ],
      },
      {
        key: "commerce",
        icon: ShoppingCart,
        name: "E-commerce",
        from: 1200000,
        timeline: "4–8 weeks",
        cover:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
        details: ["Headless/Shopify", "Payments & checkout", "Analytics & funnels"],
      },
      {
        key: "seo",
        icon: Search,
        name: "SEO Optimization",
        from: 450000,
        timeline: "1–3 weeks",
        cover:
          "https://images.unsplash.com/photo-1552960562-daf630e9278b?q=80&w=1400&auto=format&fit=crop",
        details: ["Tech audit", "Fix CWV issues", "Schema & sitemaps"],
      },
      {
        key: "marketing",
        icon: Megaphone,
        name: "Digital Marketing",
        from: 500000,
        timeline: "ongoing / 2–6 weeks",
        cover:
          "https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=1400&auto=format&fit=crop",
        details: ["Landing pages", "Email flows", "Paid & organic experiments"],
      },
    ],
    []
  );

  /* ------------------------------
     3) Design & Social (from PDF)
     Source: Kreative Sparkles rate card
  ------------------------------ */
  // Logo Design Packages
  const logoPackages = [
    {
      name: "Basic",
      price: 20000,
      includes: ["1 Logo Concept", "1 Revision", "PNG & JPEG Files"],
    },
    {
      name: "Standard",
      price: 30000,
      includes: [
        "2 Logo Concepts",
        "3 Revisions",
        "Mockup, Color Variations",
        "PNG, JPEG & PDF Files",
      ],
      badge: "Popular",
    },
    {
      name: "Premium",
      price: 50000,
      includes: [
        "3 Concepts",
        "Unlimited Revisions",
        "Brand Kit, Mockup",
        "PNG, JPEG, PDF, SVG Files",
      ],
    },
  ];

  // Stationery
  const stationery = [
    {
      name: "Letterheads",
      price: 10000,
      includes: ["1 Concept", "1 Revision", "JPEG & PDF Files"],
      icon: FileText,
    },
    {
      name: "Business Cards",
      price: 10000,
      includes: ["1 Concept", "1 Revision", "Mockup", "JPEG & PDF Files"],
      icon: IdCard,
    },
    {
      name: "Brochures",
      price: "50,000 – 80,000",
      includes: ["1 Concept", "2 Revisions", "PDF File"],
      icon: ScrollText,
    },
  ];

  // Flyers / Posters
  const flyers = [
    {
      name: "Social Media Flyers",
      price: 10000,
      includes: ["1 Concept", "1 Revision", "JPEG, PNG, PDF"],
      icon: ImageIcon,
    },
    {
      name: "Business Rate Card",
      price: 15000,
      includes: ["2 Concepts", "1 Revision", "JPEG, PNG, PDF"],
      icon: LayoutTemplate,
    },
    {
      name: "Signage / Roll-up Banners",
      price: 15000,
      includes: ["2 Concepts", "1 Revision", "Mockup", "JPEG, PNG"],
      icon: PenTool,
    },
  ];

  // Presentation Slides
  const slides = {
    name: "PowerPoint Slides Design",
    price: 20000,
    includes: [
      "Up to 10 slides",
      "Brand styling (colors/fonts)",
      "Custom icons & visuals",
      "Editable PPTX + PDF",
    ],
  };

  // Social Media Management Plans
  const smmPlans = [
    {
      name: "Starter",
      price: 100000,
      period: "mo",
      bestFor: "Small brands & startups",
      bullets: [
        "3 Posts/Week (Static or Carousel)",
        "1 Platform (Instagram or LinkedIn)",
        "Monthly Content Calendar",
        "Captions + Hashtags",
        "Basic Designs (Canva)",
        "1 Strategy Call/Month",
        "Basic Monthly Report",
      ],
    },
    {
      name: "Standard",
      price: 150000,
      period: "mo",
      bestFor: "Growing businesses building authority",
      bullets: [
        "4 Posts/Week",
        "2 Platforms (IG + LinkedIn/Facebook)",
        "Custom Content Calendar",
        "Captions + Hashtag Strategy",
        "Graphics + Basic Motion",
        "Stories (up to 3/week)",
        "Community Engagement (3×/week)",
        "Monthly Report + Insights",
        "1 Revision Round/Week",
      ],
      highlight: true,
      badge: "Best Value",
    },
    {
      name: "Premium",
      price: 250000,
      period: "mo",
      bestFor: "Established brands needing full support",
      bullets: [
        "5 Posts/Week",
        "Up to 3 Platforms",
        "Strategic Content Calendar",
        "Brand-aligned Graphics & Reels (4/mo)",
        "Copywriting (captions, bios, CTAs)",
        "Advanced Hashtag & Trend Research",
        "Engagement Monitoring (5×/week)",
        "Monthly Strategy Session",
        "Advanced Reporting + Competitor Analysis",
      ],
    },
  ];

  // Per-Post Rates
  const perPostRates = [
    ["Static Image Post (1 slide)", "10,000"],
    ["Carousel Post (up to 5 slides)", "15,000"],
    ["Carousel Post (6+ slides)", "16,000"],
    ["Instagram Story Set (3–5)", "5,000"],
    ["Short Reels (under 30 sec)", "12,000"],
    ["Caption + Hashtags only", "3,000"],
  ];

  // Global notes (delivery / express / payment)
  const deliveryNotes = [
    "Standard delivery: 3–5 working days",
    "Express delivery (24–48 hours): ₦5,000 extra (Brochures remain 3–5 days)",
    "Logo/Stationery/Flyers/Slides: Payment 70% upfront, 30% on completion",
  ];

  const brandingNotes = [
    "Branding packages delivery: 3–5 working days",
    "Payment: 100% upfront",
    "48-hour express delivery: ₦5,000",
    "Editable Canva template: ₦5,000",
    "Extra revision (per item): ₦2,000",
  ];

  // Branding packages
  const brandingPacks = [
    {
      name: "Basic Spark",
      price: 30000,
      bestFor: "Personal brands / startups",
      bullets: [
        "1 Logo Design (1 concept + 2 revisions)",
        "Brand Color Palette",
        "Font Selection",
        "Logo Mockups",
        "Files: JPEG, PNG, PDF",
      ],
    },
    {
      name: "Kreative Brilliance",
      price: 50000,
      bestFor: "Growing businesses",
      bullets: [
        "2 Logo Concepts (3 revisions)",
        "Color Palette + Fonts",
        "Brand Mood Board",
        "Mini Brand Guide",
        "Social Media Display Kit (DP & Banner)",
        "Files: JPEG, PNG, PDF, SVG",
      ],
      highlight: true,
      badge: "Popular",
    },
    {
      name: "Full Sparkle Suite",
      price: 80000,
      bestFor: "Businesses wanting a polished, pro brand",
      bullets: [
        "3 Logo Concepts",
        "Full Color + Font Styling",
        "Full Brand Guidelines (PDF)",
        "Social Media Kit (5 templates)",
        "Business Card + Letterhead",
        "Mockups",
        "Editable Files Included",
      ],
    },
  ];

  return (
    <main className="relative bg-[#3A4F30] text-white ">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3A4F30]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_20%,rgba(255,255,255,.08),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Transparent Naira pricing
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Flexible <span className="text-[#F8B9A9]">Pricing</span> for Every Stage
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Choose a monthly retainer, a fixed project, or our design/social menu. Prices exclude VAT.
            </p>

            {/* Toggle */}
            <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 p-1 text-sm backdrop-blur">
              {[
                { k: "retainer", label: "Monthly Retainer" },
                { k: "project", label: "Fixed Project" },
                { k: "design", label: "Design & Social" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setMode(t.k)}
                  className={`rounded-full px-3 py-1.5 transition ${
                    mode === t.k
                      ? `${gradientBtn} shadow`
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RETAINERS / PROJECTS */}
      <AnimatePresence mode="wait">
        {mode === "retainer" ? (
          <motion.section
            key="retainers"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative isolate mt-16 md:mt-16"
          >
            <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {retainers.map((p) => (
                  <div
                    key={p.key}
                    className={`relative rounded-3xl p-6 shadow-xl backdrop-blur border ${
                      p.highlight
                        ? "bg-white/10 border-white/20 ring-2 ring-[#F8B9A9]/50"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-3 left-4 inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold text-[#3A4F30] ring-1 ring-white/20 shadow-sm bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738]">
                        {p.badge}
                      </span>
                    )}

                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm text-white/85">{p.blurb}</p>

                    <div className="mt-5 flex items-end gap-2">
                      <div className="text-3xl font-black">{ngn(p.price)}</div>
                      <div className="text-xs text-white/70">/{p.period}</div>
                    </div>

                    <ul className="mt-5 space-y-2 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => onCta?.(p)}
                      className={`mt-6 w-full rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${
                        p.highlight
                          ? `${gradientBtn} hover:brightness-110`
                          : "bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      Choose {p.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        ) : mode === "project" ? (
          <motion.section
            key="projects"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative isolate mt-16 md:mt-16"
          >
            <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((s) => (
                  <div
                    key={s.key}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={s.cover}
                        alt={s.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                        <s.icon className="h-5 w-5 text-[#F8B9A9]" />
                      </div>
                      <h3 className="text-base font-semibold">{s.name}</h3>
                      <p className="mt-1 text-sm text-white/85">
                        From <span className="font-semibold">{ngn(s.from)}</span> • {s.timeline}
                      </p>
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {s.details.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="/contact"
                        className="mt-4 inline-flex items-center text-sm font-semibold text-[#F8B9A9] hover:underline"
                      >
                        Get a fixed quote <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        ) : (
          /* DESIGN & SOCIAL */
          <motion.section
            key="design"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative isolate mt-16 md:mt-16"
          >
            <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
              {/* Logo Design */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-black">Logo Design</h2>
                <p className="mt-1 text-sm text-white/85">
                  Choose a package that fits your stage.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {logoPackages.map((p) => (
                  <div
                    key={p.name}
                    className={`relative rounded-3xl p-6 shadow-xl backdrop-blur border ${
                      p.badge
                        ? "bg-white/10 border-white/20 ring-2 ring-[#F8B9A9]/50"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-3 left-4 inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold text-[#3A4F30] ring-1 ring-white/20 shadow-sm bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738]">
                        {p.badge}
                      </span>
                    )}
                    <div className="inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 mb-2">
                      <PenTool className="h-5 w-5 text-[#F8B9A9]" />
                    </div>
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <div className="mt-2 text-3xl font-black">{ngn(p.price)}</div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {p.includes.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/contact"
                      className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${gradientBtn} hover:brightness-110`}
                    >
                      Start Logo Project
                    </a>
                  </div>
                ))}
              </div>

              {/* Stationery */}
              <div className="mt-12 mb-4 text-center">
                <h2 className="text-2xl font-black">Stationery</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {stationery.map((i) => {
                  const Icon = i.icon;
                  return (
                    <div
                      key={i.name}
                      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
                    >
                      <div className="mb-2 inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                        <Icon className="h-5 w-5 text-[#F8B9A9]" />
                      </div>
                      <h3 className="text-base font-semibold">{i.name}</h3>
                      <div className="mt-1 text-xl font-bold">
                        {typeof i.price === "number" ? ngn(i.price) : `₦${i.price}`}
                      </div>
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {i.includes.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Flyers / Posters */}
              <div className="mt-12 mb-4 text-center">
                <h2 className="text-2xl font-black">Flyer / Poster</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {flyers.map((i) => {
                  const Icon = i.icon;
                  return (
                    <div
                      key={i.name}
                      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
                    >
                      <div className="mb-2 inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                        <Icon className="h-5 w-5 text-[#F8B9A9]" />
                      </div>
                      <h3 className="text-base font-semibold">{i.name}</h3>
                      <div className="mt-1 text-xl font-bold">{ngn(i.price)}</div>
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {i.includes.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Presentation Slides */}
              <div className="mt-12 grid grid-cols-1 gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
                  <div className="mb-2 inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                    <FileText className="h-5 w-5 text-[#F8B9A9]" />
                  </div>
                  <h3 className="text-base font-semibold">{slides.name}</h3>
                  <div className="mt-1 text-xl font-bold">{ngn(slides.price)}</div>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {slides.includes.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Social Media Management */}
              <div className="mt-12 mb-6 text-center">
                <h2 className="text-2xl font-black">Social Media Management</h2>
                <p className="mt-1 text-sm text-white/85">
                  Retainer plans for content, design & engagement.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {smmPlans.map((p) => (
                  <div
                    key={p.name}
                    className={`relative rounded-3xl p-6 shadow-xl backdrop-blur border ${
                      p.highlight
                        ? "bg-white/10 border-white/20 ring-2 ring-[#F8B9A9]/50"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-3 left-4 inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold text-[#3A4F30] ring-1 ring-white/20 shadow-sm bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738]">
                        {p.badge}
                      </span>
                    )}
                    <div className="inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 mb-2">
                      <Megaphone className="h-5 w-5 text-[#F8B9A9]" />
                    </div>
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-sm text-white/80">{p.bestFor}</p>
                    <div className="mt-3 flex items-end gap-2">
                      <div className="text-3xl font-black">{ngn(p.price)}</div>
                      <div className="text-xs text-white/70">/{p.period}</div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/contact"
                      className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${gradientBtn} hover:brightness-110`}
                    >
                      Enquire
                    </a>
                  </div>
                ))}
              </div>

              {/* Per-Post Rates */}
              <div className="mt-10">
                <div className="mb-2 text-sm font-semibold">Per-Post Rates</div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {perPostRates.map(([label, price]) => (
                        <tr key={label} className="border-t border-white/10">
                          <td className="px-4 py-3">{label}</td>
                          <td className="px-4 py-3">{`₦${price}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-white/80">
                  <Info className="h-4 w-4" />
                  Payment terms (per post): 100% upfront.
                </div>
              </div>

              {/* Branding Packages */}
              <div className="mt-12 mb-6 text-center">
                <h2 className="text-2xl font-black">Branding & Packaging</h2>
                <p className="mt-1 text-sm text-white/85">
                  From a lean brand seed to a full sparkle suite.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {brandingPacks.map((p) => (
                  <div
                    key={p.name}
                    className={`relative rounded-3xl p-6 shadow-xl backdrop-blur border ${
                      p.highlight
                        ? "bg-white/10 border-white/20 ring-2 ring-[#F8B9A9]/50"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-3 left-4 inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold text-[#3A4F30] ring-1 ring-white/20 shadow-sm bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738]">
                        {p.badge}
                      </span>
                    )}
                    <div className="inline-flex rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 mb-2">
                      <Palette className="h-5 w-5 text-[#F8B9A9]" />
                    </div>
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-sm text-white/80">{p.bestFor}</p>
                    <div className="mt-3 text-3xl font-black">{ngn(p.price)}</div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/contact"
                      className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${gradientBtn} hover:brightness-110`}
                    >
                      Enquire
                    </a>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
                  <div className="mb-2 text-sm font-semibold">Delivery & Payment</div>
                  <ul className="space-y-2 text-sm">
                    {deliveryNotes.map((n) => (
                      <li key={n} className="flex items-start gap-2">
                        <Info className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
                  <div className="mb-2 text-sm font-semibold">Branding Notes</div>
                  <ul className="space-y-2 text-sm">
                    {brandingNotes.map((n) => (
                      <li key={n} className="flex items-start gap-2">
                        <Info className="mt-0.5 h-4 w-4 text-[#F8B9A9]" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* COMPARISON TABLE (for your retainers) */}
      {mode === "retainer" && (
        <section className="relative isolate ">
          <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-black">What’s Included</h2>
              <p className="mt-1 text-sm text-white/85">Compare monthly retainers at a glance.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold">Starter</th>
                    <th className="px-4 py-3 text-center font-semibold">Growth</th>
                    <th className="px-4 py-3 text-center font-semibold">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Monthly hours", "30", "60", "120"],
                    ["Active projects", "1", "2", "Multiple"],
                    ["Standups", "Weekly", "2× Weekly", "Custom cadence"],
                    ["Support", "Email/Chat", "Priority (NBD)", "SLA (same-day)"],
                    ["Analytics/SEO reviews", "Basic", "Included", "Workshops + Roadmap"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-white/10">
                      <td className="px-4 py-3">{row[0]}</td>
                      <td className="px-4 py-3 text-center">{row[1]}</td>
                      <td className="px-4 py-3 text-center">{row[2]}</td>
                      <td className="px-4 py-3 text-center">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-white/80">
              <Info className="h-4 w-4" />
              Prices are VAT-exclusive. Third-party tools/fees are billed at cost. Custom scopes may change estimates.
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur md:flex-row md:text-left">
            <div>
              <h4 className="text-2xl font-bold">Ready to get a tailored quote in ₦?</h4>
              <p className="mt-1 text-white/85">Share your goals — we’ll respond within 24 hours.</p>
            </div>
            <a
              href="/contact"
              className={`group inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.98] ${gradientBtn}`}
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

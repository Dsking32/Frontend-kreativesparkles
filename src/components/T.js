import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Quote, Star, Play, ArrowRight, X } from "lucide-react";

/* =========================
   Motion helpers
   ========================= */
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
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const gradientText =
  "bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text text-transparent";

/* =========================
   Helpers: avatars & logos
   ========================= */
const UNSPLASH_HEADSHOTS = [
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547425260-1abd7459fc66?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=800&auto=format&fit=crop",
];
const defaultAvatar = (i) => UNSPLASH_HEADSHOTS[i % UNSPLASH_HEADSHOTS.length];
const logoData = (txt) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='48'>
      <rect width='100%' height='100%' rx='6' fill='rgba(255,255,255,0.85)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto' font-size='16' fill='#1b1f1a'>${txt}</text>
    </svg>`
  );

/* =========================
   Modal
   ========================= */
function Stars({ n = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < n ? "fill-yellow-400 text-yellow-400" : "text-white/30"}`}
        />
      ))}
    </div>
  );
}

function TestimonialModal({ item, onClose }) {
  const onKeyDown = useCallback((e) => e.key === "Escape" && onClose?.(), [onClose]);

  useEffect(() => {
    if (!item) return;
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [item, onKeyDown]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Card */}
          <motion.div
            className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#10150F]/90 p-6 text-white shadow-2xl backdrop-blur md:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Close testimonial"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/20">
                <img
                  src={item.avatar || defaultAvatar(0)}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-white/70">{item.role}</div>
                <div className="mt-1">
                  <Stars n={item.rating ?? 5} />
                </div>
              </div>
            </div>

            <Quote className="mt-6 mb-3 h-6 w-6 text-white/50" />
            <p className="text-lg leading-relaxed">{item.quote}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================
   Hero
   ========================= */
function TestimonialsHero({
  title = "Loved by teams who love results",
  highlight = "results",
  subtitle = "Real words from founders, product leaders, and marketers we partner with.",
  badge = "Testimonials",
  bg = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop",
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#3A4F30]">
      <div className="absolute inset-0 -z-10">
        <img src={bg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#3A4F30]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,.08),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-white">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs text-zinc-700 ring-1 ring-black/5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{badge}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            {title.replace(highlight, "")} <span className={gradientText}>{highlight}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Logos
   ========================= */
function LogosMarquee({ logos = [] }) {
  const safe = logos.length
    ? logos
    : ["ACME", "NOVA", "AURORA", "ZENCO", "PULSE", "KINETIC"].map(logoData);

  return (
    <section className="relative isolate bg-[#3A4F30] mt-10 md:mt-16">
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur">
          <div className="animate-[marquee_24s_linear_infinite] flex gap-10 whitespace-nowrap">
            {safe.concat(safe).map((src, i) => (
              <img key={i} src={src} alt="client" className="h-8 w-auto opacity-90" />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

/* =========================
   Card + Grid
   ========================= */
function TestimonialCard({ item, onOpen, i }) {
  const avatar = item.avatar || defaultAvatar(i);
  const rating = item.rating ?? 5;
  return (
    <motion.li
      variants={springy}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:shadow-2xl"
    >
      <button
        onClick={() => onOpen?.(item)}
        className="block w-full text-left"
        aria-label="Open testimonial"
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/20">
            <img src={avatar} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{item.name}</div>
            <div className="text-xs text-white/70">{item.role}</div>
            <div className="mt-1"><Stars n={rating} /></div>
          </div>
        </div>

        <Quote className="mt-4 mb-2 h-5 w-5 text-white/50" />
        <p className="text-sm text-white/90 leading-relaxed">{item.quote}</p>

        {Array.isArray(item.badges) && item.badges.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {item.badges.map((b, j) => (
              <li
                key={j}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/90 ring-1 ring-white/15"
              >
                <Star className="h-3 w-3" /> {b}
              </li>
            ))}
          </ul>
        )}
      </button>
    </motion.li>
  );
}

function TestimonialsGrid({ items = [], onOpen }) {
  if (!items.length) return null;
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-2 lg:px-8">
        <motion.ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((t, i) => (
            <TestimonialCard key={i} item={t} onOpen={onOpen} i={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* =========================
   Video
   ========================= */
function VideoTestimonial({
  title = "Customer story",
  subtitle = "2 minute watch",
  embedUrl,
  poster = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
}) {
  if (!embedUrl && !poster) return null;
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 text-white/80">{subtitle}</p>}
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          {embedUrl ? (
            <div className="relative w-full overflow-hidden">
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  title="Video testimonial"
                  src={embedUrl}
                  className="absolute left-0 top-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <img src={poster} alt="Testimonial" className="w-full object-cover" />
              <button
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md backdrop-blur hover:bg-white"
                type="button"
                aria-label="Play"
              >
                <Play className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Stats
   ========================= */
function StatsBand({ stats = [] }) {
  if (!stats.length) return null;
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <dl className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white shadow-xl backdrop-blur md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k}>
              <dt className="text-xs uppercase tracking-wide text-white/70">{s.k}</dt>
              <dd className="text-xl font-bold">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* =========================
   Submit Testimonial (with robust UX)
   ========================= */
function SubmitTestimonialForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", role: "", quote: "", rating: 5, avatar: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.quote.trim()) {
      setError("Please fill in your name and a short quote.");
      return;
    }
    try {
      setLoading(true);
      await onSubmit?.(form);
      setSent(true);
      setForm({ name: "", role: "", quote: "", rating: 5, avatar: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Share your experience</h2>
          <p className="mt-2 text-white/85">
            We love feedback. Add a short quote below (with permission to publish).
          </p>
        </div>
        <form
          onSubmit={submit}
          className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-white">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/60 focus:ring-2 focus:ring-white/30"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Role / Company</label>
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/60 focus:ring-2 focus:ring-white/30"
                placeholder="Head of Product, Acme"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-white">Quote</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              rows={4}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/60 focus:ring-2 focus:ring-white/30"
              placeholder="Write your testimonial..."
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-white">Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-white/30"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} stars
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-white">Avatar URL (optional)</label>
              <input
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/60 focus:ring-2 focus:ring-white/30"
                placeholder="https://.../avatar.jpg"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] px-5 py-3 text-sm font-semibold text-[#3A4F30] shadow-lg ring-1 ring-white/20 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Submitting..." : <>Submit testimonial <ArrowRight className="h-4 w-4" /></>}
            </button>

            {/* success */}
            <AnimatePresence>
              {sent && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90"
                  aria-live="polite"
                >
                  Thank you! We’ll review and publish soon.
                </motion.span>
              )}
            </AnimatePresence>

            {/* error */}
            {error && (
              <span
                className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs text-red-200 ring-1 ring-red-400/20"
                role="alert"
              >
                {error}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

/* =========================
   CTA
   ========================= */
function CTA({
  title = "Ready to sparkle?",
  subtitle = "Let's plan your next big launch.",
  cta = { label: "Start a project", href: "contact" },
}) {
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white shadow-xl backdrop-blur md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-bold"> {title} </h3>
            <p className="mt-2 text-white/85">{subtitle}</p>
          </div>
          {cta?.href && (
            <a
              href={cta.href}
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] px-5 py-3 text-sm font-semibold text-[#3A4F30] shadow-lg ring-1 ring-white/20 transition hover:brightness-110 active:scale-[0.98]"
            >
              {cta.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Root
   ========================= */
export default function TestimonialPage({
  testimonials = [],
  logos = [],
  video = { embedUrl: "" },
  stats = [
    { k: "Avg. rating", v: "4.8/5" },
    { k: "Projects delivered", v: "15+" },
    { k: "Clients", v: "10+" },
    { k: "Countries", v: "3" },
  ],
  onSubmitTestimonial,
}) {
  const items = useMemo(
    () =>
      testimonials.length
        ? testimonials
        : [
            {
              quote: "They shipped in half the time and doubled our conversion.",
              name: "Adams A.",
              role: "Growth Lead, Fintech",
              rating: 5,
            },
            {
              quote: "Engineering rigor with design taste rare and valuable.",
              name: "Doris B.",
              role: "Founder, Media",
              rating: 5,
            },
            {
              quote: "From strategy to ship, the team just gets it.",
              name: "Evans O.",
              role: "Head of Product",
              rating: 5,
            },
            {
              quote: "World class UI and blazing performance.",
              name: "Sofia M.",
              role: "Marketing Director",
              rating: 4,
            },
            {
              quote: "Clear communication and tight execution.",
              name: "Chinedu K.",
              role: "Product Manager",
              rating: 5,
            },
            {
              quote: "Truly a partner, not just a vendor.",
              name: "Ifeoma I.",
              role: "Operations Lead",
              rating: 5,
            },
          ],
    [testimonials]
  );

  const [selected, setSelected] = useState(null);

  return (
    <main className="relative bg-[#3A4F30] text-white">
      <TestimonialsHero />
      <LogosMarquee logos={logos} />
      <TestimonialsGrid items={items} onOpen={setSelected} />
      <VideoTestimonial {...video} />
      <StatsBand stats={stats} />
      <SubmitTestimonialForm onSubmit={onSubmitTestimonial} />
      <CTA />

      {/* Modal */}
      <TestimonialModal item={selected} onClose={() => setSelected(null)} />
    </main>
  );
}

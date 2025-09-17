import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertTriangle,
  ShieldCheck, Loader2, Twitter, Instagram, Linkedin, Copy, Check, ExternalLink
} from "lucide-react";
import { sendContact } from "../utils/api";

/* =========================
   Brand tokens
   ========================= */
const BRAND_BG = "#3A4F30";
const brandGradientText =
  "bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text text-transparent";

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

/* =========================
   1) HERO
   ========================= */
function ContactHero({
  title = "Let's build something great",
  highlight = "great",
  subtitle = "Tell us about your project and we’ll reply within one business day.",
  badge = "Contact",
}) {
  return (
    <section className="relative isolate overflow-hidden" style={{ backgroundColor: BRAND_BG }}>
      {/* ambient texture */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background:linear-gradient(to_right,rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.7)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,.08),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-22 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs text-zinc-800 ring-1 ring-black/5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{badge}</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title.replace(highlight, "")}{" "}
            <span className={brandGradientText}>{highlight}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-7 text-white/90">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================
   2) CONTACT DETAILS
   ========================= */
function CopyableLine({ icon: Icon, label, value, hrefPrefix }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur text-white">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 text-white/90" />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{label}</h3>
          {hrefPrefix ? (
            <a
              href={`${hrefPrefix}${value}`}
              className="group inline-flex items-center gap-1.5 text-sm text-white/90 underline-offset-4 hover:underline"
            >
              {value}
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          ) : (
            <p className="text-sm text-white/90 break-words">{value}</p>
          )}
        </div>
        <button
          type="button"
          onClick={copy}
          className="ml-auto inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-2 text-white/90 hover:bg-white/15"
          aria-label={`Copy ${label}`}
          title={`Copy ${label}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function ContactDetails({ email, phone, address, hours }) {
  return (
    <section className="relative isolate" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-7xl px-6 pb-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div variants={springy} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <CopyableLine icon={Mail} label="Email" value={email} hrefPrefix="mailto:" />
          </motion.div>
          <motion.div variants={springy} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <CopyableLine icon={Phone} label="Phone" value={phone} hrefPrefix="tel:" />
          </motion.div>
          <motion.div variants={springy} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <CopyableLine icon={MapPin} label="Location" value={address} />
          </motion.div>
        </div>

        {hours && (
          <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
            <Clock className="h-4 w-4" /> {hours}
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================
   Helpers
   ========================= */
function FieldError({ touched, error }) {
  if (!touched || !error) return null;
  return <p role="alert" className="mt-1 text-xs text-rose-300">{error}</p>;
}

/* =========================
   3) FORM (accessible, validated, spam-safe)
   ========================= */
function ContactForm({ onSubmit, submitting, submitted, error }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [touched, setTouched] = useState({});

  // anti-spam
  const hpRef = useRef(null);
  const startTs = useRef(Date.now());

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Please add a subject";
    if (form.message.trim().length < 10) e.message = "Tell us a bit more (10+ chars)";
    return e;
  }, [form]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const submit = async (e) => {
    e.preventDefault();
    const honey = hpRef.current?.value || "";
    const tookSeconds = (Date.now() - startTs.current) / 1000;
    if (honey) return alert("Submission blocked (spam detected).");
    if (tookSeconds < 3) return alert("Please take a moment to complete the form.");
    if (Object.keys(errors).length)
      return setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    await onSubmit?.(form);
  };

  return (
    <section className="relative isolate" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left panel */}
          <motion.div
            variants={springy}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur text-white"
          >
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-white/90" />
              <div>
                <h3 className="text-sm font-semibold">We answer fast</h3>
                <p className="mt-1 text-sm text-white/85">
                  Avg response: under 24 hours. Your data is private and never shared.
                </p>
              </div>
            </div>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-white/85">
              <li>Tell us your goals, timeline, and budget range.</li>
              <li>We’ll propose next steps—free discovery call included.</li>
              <li>GDPR-friendly & accessible (WCAG) by default.</li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/70">
              <Clock className="h-4 w-4" /> Mon–Fri, 9:00–18:00
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            noValidate
            aria-labelledby="contact-form-title"
            variants={springy}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-sm backdrop-blur text-white lg:col-span-2"
          >
            <h3 id="contact-form-title" className="text-lg font-semibold">Start a conversation</h3>

            {/* honeypot */}
            <input ref={hpRef} type="text" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden name="company" />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none ${
                    touched.name && errors.name
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-300/50"
                      : "border-white/40 focus:ring-2 focus:ring-white/40"
                  }`}
                  placeholder="Adaeze Okafor"
                  required
                />
                <FieldError touched={touched.name} error={errors.name} />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none ${
                    touched.email && errors.email
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-300/50"
                      : "border-white/40 focus:ring-2 focus:ring-white/40"
                  }`}
                  placeholder="you@company.com"
                  required
                />
                <FieldError touched={touched.email} error={errors.email} />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="+234 902 447 1003"
                />
              </div>

              <div>
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none ${
                    touched.subject && errors.subject
                      ? "border-rose-300 focus:ring-2 focus:ring-rose-300/50"
                      : "border-white/40 focus:ring-2 focus:ring-white/40"
                  }`}
                  placeholder="E.g. Marketing site redesign"
                  required
                />
                <FieldError touched={touched.subject} error={errors.subject} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none ${
                  touched.message && errors.message
                    ? "border-rose-300 focus:ring-2 focus:ring-rose-300/50"
                    : "border-white/40 focus:ring-2 focus:ring-white/40"
                }`}
                placeholder="Share goals, scope, timeline, budget range, and links..."
                required
              />
              <FieldError touched={touched.message} error={errors.message} />
            </div>

            <div className="mt-4 flex items-start gap-3 text-xs text-white/80">
              <ShieldCheck className="mt-0.5 h-4 w-4" /> We respect your privacy. Your info is only used to respond to this inquiry.
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.98] disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Sending..." : "Send message"}
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs text-emerald-200 ring-1 ring-emerald-400/20"
                    aria-live="polite"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Sent! We'll reply soon.
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-3 py-1.5 text-xs text-rose-200 ring-1 ring-rose-400/20"
                    role="alert"
                  >
                    <AlertTriangle className="h-4 w-4" /> {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* =========================
   4) MAP
   ========================= */
function MapSection({ embedUrl, image, label = "Find us" }) {
  return (
    <section className="relative isolate" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <h3 className="mb-3 text-lg font-semibold text-white">{label}</h3>
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-sm backdrop-blur">
          {embedUrl ? (
            <iframe
              title="Map"
              src={embedUrl}
              loading="lazy"
              className="h-[360px] w-full"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : image ? (
            <img src={image} alt="Map" className="h-[360px] w-full object-cover" />
          ) : (
            <div className="flex h-[360px] w-full items-center justify-center text-white/70">
              <MapPin className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================
   5) SOCIAL & FAQ
   ========================= */
function SocialRow({ links = {} }) {
  const items = [
    { Icon: Twitter, key: "twitter", label: "Twitter" },
    { Icon: Instagram, key: "instagram", label: "Instagram" },
    { Icon: Linkedin, key: "linkedin", label: "LinkedIn" },
  ].filter((i) => links[i.key]);

  if (!items.length) return null;

  return (
    <section className="relative isolate" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-7xl px-6 pb-4 lg:px-8">
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          {items.map(({ Icon, key, label }) => (
            <a
              key={key}
              href={links[key]}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-white/90 hover:bg-white/15"
            >
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniFAQ({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="relative isolate pb-20" style={{ backgroundColor: BRAND_BG }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4">
          {items.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-left text-sm font-semibold">
                {f.q}
                <span className="ml-3 text-white/70 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-2 text-sm text-white/85">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   6) ROOT PAGE
   ========================= */
export default function ContactPage({
  email = "hello@yourdomain.com",
  phone = "+234 902 447 1003",
  address = "Lekki Phase 1, Lagos, Nigeria",
  hours = "Mon–Fri, 9:00–18:00 WAT",
  social = { twitter: "#", instagram: "#", linkedin: "#" },
  map = { embedUrl: "" },
  faq = [
    { q: "How soon will you reply?", a: "Within 1 business day. Often much faster." },
    { q: "Do you work internationally?", a: "Yes — we collaborate across timezones with async-friendly workflows." },
  ],
  onSubmit, // optional override
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (payload) => {
    try {
      setError("");
      setSubmitting(true);

      if (typeof onSubmit === "function") {
        await onSubmit(payload); // allow override
      } else {
        await sendContact(payload); // default: call Vercel API
      }

      setSubmitted(true);
    } catch (e) {
      setError("Could not send message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
      const id = setTimeout(() => setSubmitted(false), 6000);
      return () => clearTimeout(id);
    }
  };

  return (
    <main className="relative">
      <ContactHero />

      <ContactDetails email={email} phone={phone} address={address} hours={hours} />

      <SocialRow links={social} />

      <ContactForm onSubmit={handleSubmit} submitting={submitting} submitted={submitted} error={error} />

      <MapSection embedUrl={map.embedUrl} image={map.image} />

      <MiniFAQ items={faq} />
    </main>
  );
}

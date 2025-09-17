// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home, User, Briefcase, FolderOpen, Mail, BookOpen, Star, DollarSign,
  MapPin, Phone, Clock, Send, ChevronUp,
  Twitter, Instagram, Linkedin, Github, Youtube
} from "lucide-react";
import logoImage from "../assets/logoo.PNG";
import { subscribeNewsletter } from "../utils/api"; // ⬅️ NEW: call your backend

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: "", msg: "" }); // type: "ok" | "err" | ""
  const year = new Date().getFullYear();

  // Internal nav (use <Link> for client-side routing)
  const navItems = [
    { id: "home",         label: "Home",         icon: Home,        path: "/" },
    { id: "about",        label: "About",        icon: User,        path: "/about" },
    { id: "services",     label: "Services",     icon: Briefcase,   path: "/services" },
    { id: "portfolio",    label: "Portfolio",    icon: FolderOpen,  path: "/portfolio" },
    { id: "contact",      label: "Contact",      icon: Mail,        path: "/contact" },
    { id: "blog",         label: "Blog",         icon: BookOpen,    path: "/blog" },
    { id: "testimonials", label: "Testimonials", icon: Star,        path: "/testimonials" },
    { id: "pricing",      label: "Pricing",      icon: DollarSign,  path: "/pricing" },
  ];

  // External social links (open new tab + safe rel)
  const socialLinks = [
    { id: "twitter",   label: "Twitter",   href: "#", Icon: Twitter },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/kreativesparkles/?igsh=MTE5NHhkMzNtZXU3Nw%3D%3D&utm_source=qr#", Icon: Instagram },
    { id: "linkedin",  label: "LinkedIn",  href: "#", Icon: Linkedin },
    { id: "github",    label: "GitHub",    href: "#", Icon: Github },
    { id: "youtube",   label: "YouTube",   href: "#", Icon: Youtube },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setNotice({ type: "", msg: "" });

    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setNotice({ type: "err", msg: "Please enter a valid email." });
      return;
    }

    try {
      setSubmitting(true);
      await subscribeNewsletter(value); // POST /api/subscribe
      setEmail("");
      setNotice({ type: "ok", msg: "Thanks! You’re subscribed." });
    } catch (err) {
      setNotice({ type: "err", msg: err?.message || "Subscribe failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative w-full bg-[#3A4F30] text-white">
      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* Back to top */}
      <div className="pointer-events-none absolute -top-6 left-1/2 z-20 -translate-x-1/2">
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black p-3 ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Back to top"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          <ChevronUp className="relative z-10 h-5 w-5 text-white" />
        </button>
      </div>

      {/* Main panel */}
      <div className="relative border-t border-white/10 bg-[#2F3E28]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Brand */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-3 rounded-2xl  px-3 py-2 ring-1 ring-black/5 shadow-md">
                  <img src={logoImage} alt="Kreative Sparkles" className="h-8 w-auto md:h-10" draggable="false" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">Kreative Sparkles</h3>
                  <p className="text-xs text-white/70">Calm, compounding brand systems</p>
                </div>
              </div>

              <p className="mb-6 max-w-sm text-sm leading-6 text-white/80">
                We craft strategy, design, and execution that align with outcomes and help brands grow with clarity&nbsp;and&nbsp;consistency.
              </p>

              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Lagos, Nigeria</li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+2349024471003" className="hover:underline">+234 902 447 1003</a>
                </li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mon – Fri: 9AM – 6PM</li>
              </ul>
            </div>

            {/* Quick links (internal) */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map(({ id, label, icon: Icon, path }) => (
                  <Link
                    key={id}
                    to={path}
                    className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 opacity-90 transition-transform group-hover:translate-x-0.5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services (anchors or pages as you add them) */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Services</h4>
              <ul className="space-y-2 text-sm text-white/75">
                {[
                  "Brand Strategy",
                  "Logo & Identity",
                  "Web & UI",
                  "Guidelines & Collateral",
                  "Design Ops",
                  "Motion & Micro-UX",
                ].map((svc) => (
                  <li key={svc}>
                    <a
                      href="services"
                      className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-white/10 hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      {svc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter + Social */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Stay Connected</h4>
              <p className="mb-4 text-sm text-white/80">Get insights, case studies, and product updates.</p>

              <form onSubmit={handleEmailSubmit} className="space-y-3" noValidate>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:ring-2 focus:ring-white/30"
                  aria-label="Email address"
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative z-10 flex items-center">
                    {submitting ? "Subscribing..." : "Subscribe"}
                    <Send className="ml-2 h-4 w-4" />
                  </span>
                </button>

                {/* Feedback */}
                <div aria-live="polite" className="min-h-[1.25rem]">
                  {notice.type === "ok" && (
                    <span className="inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-400/20">
                      {notice.msg}
                    </span>
                  )}
                  {notice.type === "err" && (
                    <span className="inline-block rounded-full bg-rose-500/15 px-3 py-1 text-xs text-rose-200 ring-1 ring-rose-400/20">
                      {notice.msg}
                    </span>
                  )}
                </div>
              </form>

              {/* Social */}
              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/60">Follow</p>
                <div className="flex gap-2">
                  {socialLinks.map(({ id, label, href, Icon }) => (
                    <a
                      key={id}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                      title={label}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom row */}
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/70 md:flex-row">
            <p>© {year} Creative Sparkles. All rights reserved.</p>
            <nav className="flex items-center gap-4">
              <Link to="/privacy" className="transition hover:text-white">Privacy</Link>
              <span className="text-white/30">•</span>
              <Link to="/terms" className="transition hover:text-white">Terms</Link>
              <span className="text-white/30">•</span>
              <Link to="/cookies" className="transition hover:text-white">Cookies</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Tiny ambient dots */}
      <div className="pointer-events-none absolute left-8 top-6 h-2 w-2 rounded-full bg-white/20" />
      <div className="pointer-events-none absolute right-12 top-12 h-1.5 w-1.5 rounded-full bg-white/15" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-1.5 w-1.5 rounded-full bg-white/15" />
    </footer>
  );
};

export default Footer;

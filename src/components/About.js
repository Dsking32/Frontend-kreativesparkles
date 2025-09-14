import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Users, HeartHandshake, Rocket, Palette} from "lucide-react";

/* =========================
   Motion helpers
   ========================= */
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/* Brand headline gradient (warm) */
const gradientText =
  "bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text text-transparent";

/* =========================
   1) HERO
   ========================= */
export function AboutHero({
  brandName = "Kreative Sparkles",
  eyebrow = "About us",
  title = "We design experiences that sparkle",
  highlight = "sparkle",
  subtitle =
    "We’re a creative technology studio helping ambitious brands ship beautiful, performant digital products.",
  cta = { label: "Work with us", href: "contact" },
  bgImage =
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop",
  bgColor = "#3A4F30",
  overlayOpacity = 0.55,
}) {
  const hasHighlight = title.toLowerCase().includes(highlight.toLowerCase());
  const [pre, post] = hasHighlight ? title.split(new RegExp(highlight, "i")) : [title, ""];

  return (
    <section className="relative isolate overflow-hidden bg-[#3A4F30]">
      {/* Background image + tint */}
      <div className="absolute inset-0 -z-10">
        <img src={bgImage} alt="" className="h-full w-full object-cover" loading="eager" fetchpriority="high" />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor, opacity: overlayOpacity, mixBlendMode: "multiply" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(0,0,0,0.28),transparent_62%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:py-28 lg:px-8">
        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {/* Eyebrow */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs text-zinc-800 ring-1 ring-black/5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {hasHighlight ? (
              <>
                {pre}
                <span className={gradientText}>{title.slice(pre.length, pre.length + highlight.length)}</span>
                {post}
              </>
            ) : (
              <span className={gradientText}>{title}</span>
            )}
          </h1>

          {/* Subtext */}
          <p className="mt-5 max-w-xl text-[15.5px] leading-7 text-white/85">{subtitle}</p>

          {/* Primary CTA (pure black + shine) */}
          <div className="mt-8">
            <a
              href={cta.href}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-black px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center">
                {cta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>

          {/* Stats */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {["15+ projects", "12 industries", "95% NPS", "3 countries"].map((s) => (
              <motion.li
                key={s}
                variants={fadeIn}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 backdrop-blur"
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right visual card (glassy, on-brand) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
   2) MISSION / VISION (dark glass cards)
   ========================= */
export function MissionVision({
  missionTitle = "Our mission",
  missionText =
    "Empower brands with delightful, inclusive, and scalable digital experiences that drive measurable business results.",
  visionTitle = "Our vision",
  visionText =
    "A world where creativity and technology blend seamlessly so every interaction feels effortless and human.",
}) {
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-16 md:grid-cols-2 lg:px-8">
        {[{ t: missionTitle, c: missionText }, { t: visionTitle, c: visionText }].map((b) => (
          <motion.div
            key={b.t}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
          >
            <h2 className="text-xl font-semibold text-white">{b.t}</h2>
            <p className="mt-3 text-white/85">{b.c}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   3) APPROACH – bullets
   ========================= */
export function StoryApproach({
  title = "Our story & approach",
  text =
    "Born at the intersection of design and engineering, we partner with founders and teams to craft products that feel as good as they look.",
  bullets = [
    "Discovery sprints to align on goals",
    "Design systems that scale",
    "Performance budgets baked in",
    "Analytics instrumentation from day one",
  ],
}) {
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-white/85">{text}</p>
          <ul className="mt-5 space-y-3 text-sm text-white/90">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Palette, title: "Craft", text: "Pixel-perfect details." },
              { icon: Users, title: "Collaboration", text: "We solve better, together." },
              { icon: HeartHandshake, title: "Integrity", text: "Do the right thing." },
              { icon: Rocket, title: "Momentum", text: "Bias to action and iteration." },
            ].map((v, idx) => {
              const I = v.icon;
              return (
                <div key={idx} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <span className="rounded-xl border border-white/10 bg-black/40 p-2">
                    <I className="h-5 w-5 text-white/90" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{v.title}</h3>
                    <p className="text-xs text-white/80">{v.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
   4) TIMELINE – milestones
   ========================= */
export function Timeline({
  title = "Milestones",
  items = [
    { year: "2023", text: "Founded the studio with a mission to blend craft and design." },
    { year: "2024", text: "Launched design system offerings for fintech and media." },
    { year: "2025", text: "Expanded engineering team and shipped 15+ products." },
    { year: "2025", text: "Delivery with partners in 5 countries." },
  ],
}) {
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        <div className="mx-auto mt-10 max-w-3xl">
          <ol className="relative border-s border-white/15">
            {items.map((m, i) => (
              <motion.li
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="ms-6 py-4"
              >
                <span className="absolute -start-2.5 mt-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black ring-2 ring-white/10">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-white/70">{m.year}</p>
                  <p className="mt-1 text-sm text-white/90">{m.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* =========================
   5) TEAM – cards
   ========================= */
export function Team({
  title = "Meet the team",
  people = [
    { name: "Zainab Shekoni", role: "Creative Director" },
    { name: "Stephen Femi", role: "Project Manager" },
    { name: "Sofia John", role: "Product Strategist" },
  ],
}) {
  return (
    <section className="relative isolate bg-[#3A4F30] pb-20">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {people.map((p, i) => (
            <motion.li
              key={p.name + i}
              variants={fadeIn}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h3 className="text-base font-semibold text-white">{p.name}</h3>
              <p className="text-sm text-white/80">{p.role}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* =========================
   6) CTA – contact banner
   ========================= */
export function ContactCta({
  title = "Ready to build something brilliant?",
  note = "Tell us about your goals and timeline let’s make it happen.",
  cta = { label: "Start a project", href: "contact" },
}) {
  return (
    <section className="relative isolate bg-[#3A4F30] pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur md:p-10">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-1 text-white/85">{note}</p>
            </div>
            <a
              href={cta.href}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-black px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center">
                {cta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Root page
   ========================= */
export default function AboutPage(props) {
  return (
    <main className="relative bg-[#3A4F30] text-white">
      <AboutHero {...props?.hero} />
      <MissionVision {...props?.missionVision} />
      <StoryApproach {...props?.storyApproach} />
      <Timeline {...props?.timeline} />
      <Team {...props?.team} />
      <ContactCta {...props?.cta} />
    </main>
  );
}

/* =========================
   Example usage:
   <AboutPage
     hero={{
       bgColor: "#3A4F30",
       bgImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop",
       title: "We design experiences that sparkle",
       highlight: "sparkle",
     }}
   />
   ========================= */

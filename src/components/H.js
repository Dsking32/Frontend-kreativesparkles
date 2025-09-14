// src/components/AdvancedHomeLanding.js
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  ShieldCheck,
  Rocket,
  Gauge,
  Layers,
  Wand2,
  Palette,
  Code2,
  Smartphone,
  ShoppingCart,
  Megaphone,
  Search,
  Briefcase,
  LifeBuoy,
  ChevronRight,
  Star,
} from "lucide-react";

/* -------------------- motion helpers -------------------- */
const springy = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16, mass: 0.7 },
  },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const gradientText =
  "bg-gradient-to-r from-[#FFD700] via-[#FFC100] to-[#FFA500] bg-clip-text text-transparent";

/* -------------------- utilities -------------------- */
function useParallax(range = [0, 1], output = [0, -60]) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.5 });
  return useTransform(smooth, range, output);
}

/* -------------------- global scroll progress -------------------- */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.6 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[9999] h-1 origin-left bg-gradient-to-r from-[#FFD700] via-[#FFC100] to-[#FFA500]"
      style={{ scaleX }}
    />
  );
}

/* -------------------- cursor spotlight layer -------------------- */
function CursorSpotlight() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 mix-blend-overlay"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <motion.div
        className="absolute h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: x,
          top: y,
          background:
            "radial-gradient(closest-side, rgba(255,255,255,.10), rgba(255,255,255,0) 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}

/* -------------------- morphing gradient blob -------------------- */
function MorphingBlob({ className = "" }) {
  return (
    <svg className={`absolute blur-2xl opacity-50 ${className}`} viewBox="0 0 600 600" aria-hidden>
      <motion.path
        initial={false}
        animate={{
          d: [
            "M431,322Q422,404,343,451.5Q264,499,190,447.5Q116,396,115,303Q114,210,184,150Q254,90,330.5,127.5Q407,165,428.5,232.5Q450,300,431,322Z",
            "M425,321Q423,397,357,457.5Q291,518,208.5,480.5Q126,443,97.5,360.5Q69,278,110.5,210Q152,142,224.5,102.5Q297,63,366,110Q435,157,435.5,228.5Q436,300,425,321Z",
            "M445,330Q418,410,349.5,470.5Q281,531,201,489Q121,447,90.5,366.5Q60,286,112,209Q164,132,242.5,117Q321,102,389.5,145.5Q458,189,459,244.5Q460,300,445,330Z",
          ],
        }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        fill="url(#g)"
      />
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC100" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* -------------------- magnetic button -------------------- */
function MagneticButton({ href = "#", children, className = "" }) {
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const ref = useRef(null);
  function onMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    bx.set(dx * 0.18);
    by.set(dy * 0.18);
  }
  function onLeave() {
    animate(bx, 0, { duration: 0.35 });
    animate(by, 0, { duration: 0.35 });
  }
  return (
    <a href={href} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <motion.span
        ref={ref}
        style={{ x: bx, y: by }}
        className={`group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-5 py-3 text-sm font-semibold text-[#3A4F30] shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60 active:scale-[0.98] ${className}`}
      >
        {children}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </motion.span>
    </a>
  );
}

/* -------------------- 3D tilt card -------------------- */
function TiltCard({ children, className = "" }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const ref = useRef(null);
  const reset = () => {
    animate(rx, 0, { duration: 0.4 });
    animate(ry, 0, { duration: 0.4 });
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 16);
        rx.set((0.5 - py) * 16);
      }}
      onMouseLeave={reset}
      style={{ transformStyle: "preserve-3d", rotateX: rx, rotateY: ry }}
      className={`relative will-change-transform ${className}`}
    >
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
}

/* -------------------- CountUp (FIXED: uses state, not MotionValue as child) -------------------- */
function CountUp({ to, start, duration = 1.1, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const controls = animate(0, Number(to), {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, to, duration]);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  const y1 = useParallax([0, 1], [0, -80]);
  const y2 = useParallax([0, 1], [0, -40]);

  return (
    <section className="relative isolate overflow-hidden bg-[#3A4F30] text-[#F8F4EA]">
      {/* background layers */}
      <MorphingBlob className="-top-32 -left-24 h-[520px] w-[520px]" />
      <MorphingBlob className="top-10 -right-20 h-[520px] w-[520px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_15%_-10%,rgba(255,215,0,.18),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_80%_10%,rgba(255,193,0,.12),transparent_40%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-24 pb-16 md:grid-cols-2 md:pt-32 lg:px-8">
        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={springy}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4A6B3D]/80 px-3 py-1 text-xs text-[#F8F4EA] backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Now supporting teams of any size</span>
          </motion.div>

          <motion.h1
            variants={springy}
            className="text-5xl font-black tracking-tight text-[#F8F4EA] sm:text-6xl md:text-7xl"
          >
            Design. Build. <span className={gradientText}>Grow.</span>
          </motion.h1>

          <motion.p
            variants={springy}
            className="mt-5 max-w-xl text-lg leading-relaxed text-[#F8F4EA]/90"
          >
            kreative Sparkles ships premium web, mobile, and growth systems — from
            strategy to pixels to production — fast.
          </motion.p>

          <motion.div variants={springy} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="/contact">Start a project</MagneticButton>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full border border-[#4A6B3D] px-5 py-3 text-sm font-semibold text-[#F8F4EA] transition hover:bg-[#4A6B3D]/50"
            >
              <Play className="h-4 w-4" /> Watch demo
            </a>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-[#F8F4EA]/80">
              <ShieldCheck className="h-4 w-4" />
              GDPR &amp; SOC2 ready
            </div>
          </motion.div>

          {/* logos */}
          <motion.div variants={springy} className="mt-10 select-none">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#F8F4EA]/70">
              Trusted by teams at
            </p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 opacity-80">
              {["MTN", "Airtel", "Glo", "Flutterwave", "Paystack"].map((b, i) => (
                <li key={i} className="text-sm text-[#F8F4EA]/90">
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Right visual with parallax + 3D tilt */}
        <motion.div style={{ y: y2 }} className="relative">
          <TiltCard className="rounded-3xl bg-[#4A6B3D]/80 p-4 shadow-2xl backdrop-blur">
            <div className="h-64 w-[22rem] overflow-hidden rounded-2xl md:h-72">
              {/* Replace with your product image */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3A4F30] to-[#4A6B3D]">
                <span className="text-sm text-[#F8F4EA]/70">Drop your product shot here</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[#F8F4EA]/70">
              <span>Powered by Kreative Sparkles</span>
              <span className="font-mono">99.9% uptime</span>
            </div>
          </TiltCard>

          {/* floating accent orbs */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute -right-8 -top-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] blur-[2px]"
          />
          <motion.div
            aria-hidden
            style={{ y: y1 }}
            className="absolute -left-10 bottom-10 h-20 w-20 rounded-full bg-gradient-to-tr from-[#FFC100] to-[#FFA500]"
          />
        </motion.div>
      </div>

      {/* stats with animated counters */}
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <dl className="grid grid-cols-2 gap-4 rounded-3xl bg-[#4A6B3D]/70 p-6 text-center shadow-sm backdrop-blur md:grid-cols-4">
          {[
            { k: "Active users", v: 25000, suffix: "+" },
            { k: "Integrations", v: 50, suffix: "+" },
            { k: "Avg. uptime", v: "99.9%" },
            { k: "NPS", v: 68 },
          ].map((it, i) => (
            <Stat key={i} label={it.k} value={it.v} suffix={it.suffix} />
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------- counters -------------------- */
function Stat({ label, value, suffix = "" }) {
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setSeen(true)),
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const isNum = typeof value === "number";
  return (
    <div ref={ref}>
      <dt className="text-xs uppercase tracking-wide text-[#F8F4EA]/70">{label}</dt>
      <dd className="text-xl font-bold text-[#F8F4EA]">
        {isNum ? <CountUp to={value} start={seen} suffix={suffix} /> : value}
      </dd>
    </div>
  );
}

/* -------------------- features grid -------------------- */
function FeatureTiles() {
  const items = [
    { icon: Rocket, title: "Speed to market", text: "Ship MVPs & v1s in weeks." },
    { icon: Gauge, title: "Perf obsessed", text: "Core Web Vitals, edge-ready." },
    { icon: Layers, title: "Design systems", text: "Reusable, themed components." },
    { icon: Wand2, title: "Delightful UX", text: "Micro-interactions that convert." },
  ];
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-6 lg:px-8">
        <motion.ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((it, i) => (
            <motion.li
              key={i}
              variants={springy}
              whileHover={{ y: -8, rotate: i % 2 ? -1.2 : 1.2 }}
              className="rounded-3xl border border-[#4A6B3D] bg-[#4A6B3D]/80 p-5 shadow-sm backdrop-blur"
            >
              <it.icon className="h-5 w-5 text-[#FFD700]" />
              <h3 className="mt-3 text-sm font-semibold text-[#F8F4EA]">
                {it.title}
              </h3>
              <p className="mt-1 text-sm text-[#F8F4EA]/90">{it.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------- marquee services -------------------- */
function ServicesMarquee() {
  const services = [
    { icon: Code2, title: "Web Development", desc: "Next.js/React, headless, APIs." },
    { icon: Palette, title: "UI/UX Design", desc: "Design systems, prototyping, WCAG." },
    { icon: Smartphone, title: "Mobile Apps", desc: "React Native iOS/Android." },
    { icon: ShoppingCart, title: "E-commerce", desc: "Headless/Shopify + analytics." },
    { icon: Search, title: "SEO Optimization", desc: "Technical audits & CWV." },
    { icon: Megaphone, title: "Digital Marketing", desc: "Paid + organic growth." },
    { icon: Briefcase, title: "Consulting", desc: "Roadmaps, workshops, reviews." },
    { icon: LifeBuoy, title: "Support & Maintenance", desc: "SLAs, monitoring, updates." },
  ];
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tight text-[#F8F4EA] sm:text-4xl">
            Everything you need to ship
          </h2>
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-[#F8F4EA]/90 hover:underline"
          >
            See all <ChevronRight className="h-4 w-4" />
          </a>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-[#4A6B3D] bg-[#4A6B3D]/70 p-4 backdrop-blur group">
          <ul className="animate-[scrollx_26s_linear_infinite] group-hover:[animation-play-state:paused] flex gap-4">
            {services.concat(services).map((s, i) => (
              <li
                key={i}
                className="min-w-[260px] rounded-2xl border border-[#4A6B3D] bg-[#4A6B3D]/80 p-4 shadow-sm"
              >
                <s.icon className="h-5 w-5 text-[#FFD700]" />
                <div className="mt-2 text-sm font-semibold text-[#F8F4EA]">{s.title}</div>
                <div className="text-sm text-[#F8F4EA]/90">{s.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`@keyframes scrollx {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

/* -------------------- showcase -------------------- */
function Showcase() {
  const items = [
    { title: "Turnaj Fantasy", tag: "React / Next.js", img: "/images/turnaj-cover.jpg" },
    { title: "BingeBay.TV", tag: "Video UX", img: "/images/bingebay-cover.jpg" },
    { title: "FinSight Dashboard", tag: "Analytics", img: "/images/finsight-cover.jpg" },
  ];
  return (
    <section id="demo" className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#F8F4EA] sm:text-4xl">
            Recent work
          </h2>
          <p className="mt-2 text-[#F8F4EA]/90">A few highlights from design & engineering.</p>
        </div>
        <motion.ul
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((p, i) => (
            <motion.li
              key={i}
              variants={springy}
              whileHover={{ y: -8, rotate: i % 2 ? -0.8 : 0.8 }}
              className="overflow-hidden rounded-3xl border border-[#4A6B3D] bg-[#4A6B3D]/80 shadow-sm backdrop-blur"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {/* Replace with your image */}
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3A4F30] to-[#4A6B3D] text-[#F8F4EA]/70">
                  <span className="text-sm">{p.title}</span>
                </div>
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#3A4F30]/90 px-2 py-1 text-[10px] font-semibold text-[#F8F4EA] backdrop-blur">
                  <Star className="h-3 w-3 text-[#FFD700]" /> {p.tag}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------- testimonials -------------------- */
function Testimonials() {
  const quotes = [
    { q: "They shipped in half the time and doubled our conversion.", a: "COO, Fintech" },
    { q: "Design quality + engineering rigor — rare & valuable.", a: "Founder, Media" },
    { q: "From strategy to ship, the team just gets it.", a: "Head of Product" },
  ];
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <motion.ul
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {quotes.map((t, i) => (
            <motion.li
              key={i}
              variants={springy}
              className="rounded-3xl border border-[#4A6B3D] bg-[#4A6B3D]/80 p-5 text-sm text-[#F8F4EA] shadow-sm backdrop-blur"
            >
              “{t.q}”
              <div className="mt-2 text-xs text-[#F8F4EA]/70">— {t.a}</div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------- CTA -------------------- */
function CTA() {
  return (
    <section className="relative isolate bg-[#3A4F30]">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#4A6B3D] bg-[#4A6B3D]/80 p-8 text-center shadow-sm backdrop-blur md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-[#F8F4EA]">Ready to make it sparkle?</h3>
            <p className="mt-2 text-[#F8F4EA]/90">
              Tell us about your scope — we'll reply in 24h.
            </p>
          </div>
          <MagneticButton href="/contact">Start a project</MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* -------------------- ROOT PAGE -------------------- */
// src/components/AdvancedHomeLanding.js
export default function AdvancedHomeLanding() {
  return (
    <main className="relative bg-[#3A4F30] text-[#F8F4EA] pt-20"> {/* Added pt-20 */}
      <ScrollProgressBar />
      <CursorSpotlight />
      <Hero />
      <FeatureTiles />
      <ServicesMarquee />
      <Showcase />
      <Testimonials />
      <CTA />
    </main>
  );
}
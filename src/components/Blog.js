// src/components/BlogSimple.js
import React, { useMemo, useState, useEffect } from "react";
import { CalendarDays, Clock, X } from "lucide-react";

/* ---------- theme ---------- */
const BG = "#354833";
const gradientText =
  "bg-gradient-to-r from-[#FFEDED] via-[#F8B9A9] to-[#B54738] bg-clip-text text-transparent";

/* ---------- image fallbacks ---------- */
const POOL = {
  Design: [
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1600&auto=format&fit=crop",
  ],
  Engineering: [
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
  ],
  Growth: [
    "https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
  ],
  General: [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  ],
};
const hashInt = (s = "") => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h | 0);
};
const pickCover = (cat, seed) => {
  const list = POOL[cat] || POOL.General;
  return list[hashInt(seed) % list.length];
};
const avatar = (name = "CS") =>
  `https://dummyimage.com/96x96/111827/ffffff&text=${encodeURIComponent(
    name.split(" ").map((n) => n[0]).slice(0, 2).join("")
  )}`;
const normalize = (arr = []) =>
  arr.map((p) => ({
    ...p,
    cover:
      (p.cover && p.cover.trim()) ||
      pickCover(p.category, `${p.title}|${p.category}|${(p.tags || []).join(",")}`),
    author: p.author || "Creative Sparkles",
    readingTime: p.readingTime || "5 min",
    _avatar: avatar(p.author || "CS"),
  }));

/* ---------- small bits ---------- */
function SmartImage({ src, alt }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setOk(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          ok ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
    </div>
  );
}
function Meta({ date, readingTime }) {
  if (!date && !readingTime) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/75">
      {date && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" /> {date}
        </span>
      )}
      {readingTime && (
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {readingTime}
        </span>
      )}
    </div>
  );
}

/* ---------- modal ---------- */
function PostModal({ post, open, onClose }) {
  // ESC to close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button className="absolute inset-0 bg-black/60" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F0A]/85 text-white backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h4 className="text-sm font-semibold">{post.title}</h4>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-white/90 hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {!!post.cover && (
            <img
              src={post.cover}
              alt=""
              className="mb-4 h-56 w-full rounded-lg object-cover"
            />
          )}
          <div className="prose prose-invert prose-zinc max-w-none">
            <p>
              {post.content ||
                post.excerpt ||
                "No content provided. Use the full post route to read more."}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs">
          <div className="flex items-center gap-2 text-white/70">
            <img src={post._avatar} alt="" className="h-5 w-5 rounded-full ring-1 ring-white/20" />
            <span>{post.author}</span>
          </div>
          <Meta date={post.date} readingTime={post.readingTime} />
        </div>
      </div>
    </div>
  );
}

/* ---------- card ---------- */
function Card({ p, onOpen }) {
  return (
    <button
      onClick={() => onOpen(p)}
      className="group block text-left"
      aria-label={`Open ${p.title}`}
    >
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 text-white shadow-xl backdrop-blur transition hover:bg-white/7.5">
        <SmartImage src={p.cover} alt={p.title} />
        <div className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-white/70">
            {p.category || "Article"}
          </div>
          <h3 className="mt-1 text-lg font-semibold leading-snug group-hover:underline">
            {p.title}
          </h3>
          {p.excerpt && (
            <p className="mt-1 line-clamp-2 text-sm text-white/85">{p.excerpt}</p>
          )}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-white/80">
            <img
              src={p._avatar}
              alt=""
              className="h-5 w-5 rounded-full ring-1 ring-white/20"
            />
            <span>{p.author}</span>
          </div>
          <Meta date={p.date} readingTime={p.readingTime} />
        </div>
      </article>
    </button>
  );
}

/* ---------- typing word ---------- */
function TypingWord({
  word = "writing",
  speed = 110,       // milliseconds per character
  startDelay = 450,  // delay before typing begins
  caret = true,
  className = "",
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setI((v) => {
          if (v >= word.length) {
            clearInterval(id);
            return v;
          }
          return v + 1;
        });
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [word, speed, startDelay]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span aria-live="polite" aria-label={word}>
        {word.slice(0, i)}
      </span>
      {caret && (
        <>
          {/* Small blinking caret */}
          <span
            aria-hidden="true"
            style={{ animation: "blink 1s step-end infinite" }}
            className="ml-0.5 inline-block"
          >
            |
          </span>
          {/* Scoped keyframes for caret blink */}
          <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </>
      )}
    </span>
  );
}

/* ---------- hero ---------- */
function Hero({
  title = "Simple, thoughtful",
  highlight = "thoughtful",
  subtitle = "Notes on design, engineering, and growth from our studio.",
  image =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
}) {
  // Split into: "Simple, ", highlighted "thoughtful", and animate the last word "writing"
  const [before, middle, after] = (() => {
    const parts = title.split(" ");
    //const last = parts.pop() || "";
    const left = parts.join(" ");
    const [pre, hi, post] = left.split(new RegExp(`(${highlight})`, "i"));
    return [pre?.trim(), hi, post?.trim()]; // before, highlight, after (if any)
  })();

  return (
    <section className="relative isolate overflow-hidden" style={{ backgroundColor: BG }}>
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0 bg-[color:var(--bg)]/85 mix-blend-multiply"
          style={{ "--bg": BG }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(255,255,255,.08),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] ring-1 ring-white/20">
            Our Blog
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            {/* "Simple," and possible pre-text */}
            {before && <span>{before}</span>}
            {before && " "}

            {/* highlighted middle word "thoughtful" */}
            {middle ? <span className={gradientText}>{middle}</span> : null}
            {middle && " "}

            {/* any text after highlight before the animated word */}
            {after && <span>{after}</span>}
            {after && " "}

            {/* animated last word "writing" */}
            <TypingWord word="writing" className="" />
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- root ---------- */
export default function BlogSimple({ posts = [] }) {
  const data = useMemo(() => {
    if (posts.length) return normalize(posts);
    // demo seed
    return normalize([
      {
        id: 1,
        title: "Design systems that scale",
        excerpt: "How we build durable foundations for product teams.",
        category: "Design",
        author: "Adaeze Okafor",
        date: "Aug 12, 2025",
        readingTime: "6 min",
        content:
          "We begin with an audit, then establish tokens, components, and documentation that make design and dev move in lockstep…",
      },
      {
        id: 2,
        title: "Turbocharging Core Web Vitals",
        excerpt: "Lessons from bringing LCP under 2s on heavy pages.",
        category: "Engineering",
        author: "Tunde Akinlade",
        date: "Aug 4, 2025",
        readingTime: "8 min",
        content:
          "Largest Contentful Paint is a user-centric metric. Here’s how we trimmed payloads, tuned cache headers, and preloaded the right bits…",
      },
      {
        id: 3,
        title: "Experimentation playbook for product growth",
        excerpt: "A lightweight framework for learning fast.",
        category: "Growth",
        author: "Sofia Mensah",
        date: "Jul 30, 2025",
        readingTime: "7 min",
        content:
          "Hypothesis → minimal test → ship → measure → learn. The tight loop is where momentum happens. These are the guardrails we use…",
      },
      {
        id: 4,
        title: "Landing pages that convert",
        excerpt: "Above-the-fold structure and messaging.",
        category: "Growth",
        author: "Creative Sparkles",
        date: "Jun 28, 2025",
        readingTime: "6 min",
      },
      {
        id: 5,
        title: "Edge rendering in practice",
        excerpt: "Caching, invalidation, and streaming tips.",
        category: "Engineering",
        author: "Creative Sparkles",
        date: "Jul 10, 2025",
        readingTime: "9 min",
      },
      {
        id: 6,
        title: "Animation principles for delightful UI",
        excerpt: "Micro-interactions that guide, not distract.",
        category: "Design",
        author: "Creative Sparkles",
        date: "Jul 18, 2025",
        readingTime: "5 min",
      },
    ]);
  }, [posts]);

  const [openPost, setOpenPost] = useState(null);

  return (
    <main className="min-h-screen bg-[color:var(--bg)] text-white" style={{ "--bg": BG }}>
      <Hero />

      {/* grid */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <Card key={p.id || p.title} p={p} onOpen={setOpenPost} />
            ))}
          </div>
        </div>
      </section>

      {/* modal */}
      <PostModal post={openPost} open={!!openPost} onClose={() => setOpenPost(null)} />
    </main>
  );
}

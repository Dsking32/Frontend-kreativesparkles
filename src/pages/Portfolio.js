// src/pages/portfolio.js
import React from "react";
import PortfolioPage from "../components/Portfolio"; // adjust path

const projects = [
  {
    id: 1,
    title: "Turnaj Fantasy Platform",
    subtitle: "Full-stack build with telco billing integration",
    cover: "/images/turnaj-cover.jpg",
    images: ["/images/turnaj-1.jpg", "/images/turnaj-2.jpg"],
    category: "Web",
    tags: ["Next.js", "Tailwind", "Node", "Payments"],
    year: 2025,
    link: "https://example.com",
    repo: "https://github.com/example",
    metrics: [
      { k: "Signup uplift", v: "+38%" },
      { k: "TTFB", v: "<200ms" },
      { k: "CR", v: "+14%" },
      { k: "MAU", v: "120k" },
    ],
  },
  {
    id: 2,
    title: "BingeBay.TV",
    subtitle: "Creator-first streaming & monetization platform",
    cover: "/images/bingebay-cover.jpg",
    images: ["/images/bingebay-1.jpg", "/images/bingebay-2.jpg"],
    category: "Web",
    tags: ["React", "Firebase", "Stripe", "Video.js"],
    year: 2024,
    link: "https://example.com",
    repo: "https://github.com/example",
    metrics: [
      { k: "Creators onboarded", v: "450+" },
      { k: "Uptime", v: "99.9%" },
      { k: "Payout latency", v: "<24h" },
      { k: "ARPU", v: "$8.7" },
    ],
  },
  {
    id: 3,
    title: "BillMagic",
    subtitle: "Telco-grade billing & reconciliation system",
    cover: "/images/billmagic-cover.jpg",
    images: ["/images/billmagic-1.jpg", "/images/billmagic-2.jpg"],
    category: "Fintech",
    tags: ["Go", "Postgres", "Redis", "gRPC"],
    year: 2023,
    link: "https://example.com",
    repo: "https://github.com/example",
    metrics: [
      { k: "Transactions/sec", v: "3.2k" },
      { k: "Accuracy", v: "99.99%" },
      { k: "Latency", v: "<80ms" },
      { k: "Handled volume", v: "$12M+" },
    ],
  },
  {
    id: 4,
    title: "Creative Sparkles",
    subtitle: "Modern digital agency website & brand studio",
    cover: "/images/sparkles-cover.jpg",
    images: ["/images/sparkles-1.jpg", "/images/sparkles-2.jpg"],
    category: "Branding",
    tags: ["Next.js", "Framer Motion", "TailwindCSS"],
    year: 2024,
    link: "https://example.com",
    repo: "https://github.com/example",
    metrics: [
      { k: "PageSpeed score", v: "98/100" },
      { k: "Bounce rate", v: "-22%" },
      { k: "SEO rank boost", v: "+15 positions" },
      { k: "Client NPS", v: "9.2" },
    ],
  },
  {
    id: 5,
    title: "FinSight",
    subtitle: "Telecom analytics dashboard with CRBT insights",
    cover: "/images/finsight-cover.jpg",
    images: ["/images/finsight-1.jpg", "/images/finsight-2.jpg"],
    category: "Data",
    tags: ["Python", "FastAPI", "React", "D3.js"],
    year: 2025,
    link: "https://example.com",
    repo: "https://github.com/example",
    metrics: [
      { k: "Queries/day", v: "2.4M" },
      { k: "Dashboard latency", v: "<1.2s" },
      { k: "Revenue tracked", v: "$25M+" },
      { k: "Adoption rate", v: "76%" },
    ],
  },
];


// src/pages/portfolio.js
export default function Portfolio() {
  return (
    <PortfolioPage
      projects={projects}
      featured={1}
      testimonials={[
        { quote: "They shipped in half the time and doubled our conversion.", author: "COO, Fintech" },
        { quote: "Design quality and engineering rigor in one team.", author: "Founder, Media" },
      ]}
      tools={["Next.js","React","Tailwind","Node","Framer Motion","Postgres","AWS"]}
      awards={[
        { title: "Top 10 Product Design Studio", detail: "Regional shortlist 2024" },
        { title: "Web Performance Award", detail: "Core Web Vitals excellence" },
      ]}
      stats={[
        { k: "Projects shipped", v: "120+" },
        { k: "Avg. uptime", v: "99.95%" },
        { k: "Client NPS", v: "+70" },
        { k: "Countries", v: "6" },
      ]}
      navOffset={64}   // <— set this to your navbar height in px (adjust if needed)
    />
  );
}

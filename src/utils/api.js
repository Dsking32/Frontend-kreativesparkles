// src/utils/api.js

const envBase = (process.env.REACT_APP_API_BASE || "").trim();
const runtimeBase =
  typeof window !== "undefined" && window.__API_BASE__
    ? String(window.__API_BASE__).trim()
    : "";

const BASE = envBase || runtimeBase || "/"; // must be set via .env

const DEFAULT_TIMEOUT_MS = 15000;

function join(base, path) {
  return `${String(base).replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

function ensureBase() {
  if (!BASE) {
    throw new Error(
      "Missing API base. Set REACT_APP_API_BASE in .env (dev) or .env.production (build)."
    );
  }
}

async function request(
  path,
  { method = "GET", headers = {}, body, timeout = DEFAULT_TIMEOUT_MS } = {}
) {
  ensureBase();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  let res;
  try {
    res = await fetch(join(BASE, path), { method, headers, body, signal: controller.signal });
  } catch (err) {
    clearTimeout(timer);
    if (err?.name === "AbortError") throw new Error("Request timed out. Please try again.");
    throw new Error("Network error. Please check your connection and try again.");
  } finally {
    clearTimeout(timer);
  }

  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text().catch(() => "");

  if (!res.ok) {
    const msg =
      (isJson && (data?.error || data?.message)) ||
      (typeof data === "string" && data) ||
      `Request failed with status ${res.status}`;
    throw new Error(msg);
  }
  return isJson ? data : { ok: true, data };
}

async function postJson(path, payload, opts = {}) {
  return request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    body: JSON.stringify(payload || {}),
    timeout: opts.timeout,
  });
}

function trim(v) { return typeof v === "string" ? v.trim() : v; }
function clamp(n, min, max) { const x = Number(n); return Number.isNaN(x) ? min : Math.max(min, Math.min(max, x)); }

// Contact
export async function sendContact(payload = {}) {
  const clean = {
    name: trim(payload.name),
    email: trim(payload.email),
    phone: trim(payload.phone || ""),
    subject: trim(payload.subject || ""),
    message: trim(payload.message),
  };
  if (!clean.name) throw new Error("Please enter your name.");
  if (!clean.email) throw new Error("Please enter your email.");
  if (!clean.message || clean.message.length < 3) throw new Error("Please add a message.");
  return postJson("/api/contact", clean);
}

// Testimonial
export async function submitTestimonial(payload = {}) {
  const clean = {
    name: trim(payload.name),
    role: trim(payload.role || ""),
    quote: trim(payload.quote),
    rating: clamp(payload.rating ?? 5, 1, 5),
    avatar: trim(payload.avatar || ""),
  };
  if (!clean.name) throw new Error("Please enter your name.");
  if (!clean.quote) throw new Error("Please add a short quote.");
  return postJson("/api/testimonials", clean);
}

// Newsletter
export async function subscribeNewsletter(email) {
  const value = trim(email);
  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error("Please enter a valid email.");
  }
  return postJson("/api/subscribe", { email: value });
}

export function getApiBase() {
  ensureBase();
  return BASE;
}

const api = { sendContact, submitTestimonial, subscribeNewsletter, getApiBase };
export default api;

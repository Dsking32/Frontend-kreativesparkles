// src/utils/api.js

/**
 * Set this env before building:
 *   REACT_APP_API_BASE="https://YOUR-VERCEL-PROJECT.vercel.app" npm run build
 *
 * Optionally, you can override at runtime (e.g., in index.html) with:
 *   <script>window.__API_BASE__ = "https://YOUR-VERCEL-PROJECT.vercel.app";</script>
 */

const envBase = (process.env.REACT_APP_API_BASE || "").trim();
const runtimeBase =
  typeof window !== "undefined" && window.__API_BASE__
    ? String(window.__API_BASE__).trim()
    : "";

const BASE = envBase || runtimeBase || ""; // keep empty to force a helpful error in request()

const DEFAULT_TIMEOUT_MS = 15000;

/** Join base + path without double or missing slashes */
function join(base, path) {
  return `${String(base).replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

/** Throw if API base is missing */
function ensureBase() {
  if (!BASE) {
    throw new Error(
      "Missing API base. Set REACT_APP_API_BASE at build time (or window.__API_BASE__ at runtime)."
    );
  }
}

/** Core fetch with JSON handling + timeout + nice errors */
async function request(
  path,
  { method = "GET", headers = {}, body, timeout = DEFAULT_TIMEOUT_MS } = {}
) {
  ensureBase();

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeout);

  let res;
  try {
    res = await fetch(join(BASE, path), {
      method,
      headers,
      body,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(t);
    if (err?.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw new Error("Network error. Please check your connection and try again.");
  } finally {
    clearTimeout(t);
  }

  // Try to parse JSON; fall back to text
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

/** Convenience: POST JSON */
async function postJson(path, payload, opts = {}) {
  return request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    body: JSON.stringify(payload || {}),
    timeout: opts.timeout,
  });
}

/** Trim helper */
function trimIfString(v) {
  return typeof v === "string" ? v.trim() : v;
}

/** Clamp number helper */
function clamp(n, min, max) {
  const x = Number(n);
  if (Number.isNaN(x)) return min;
  return Math.max(min, Math.min(max, x));
}

/**
 * Send Contact form
 * @param {{name: string, email: string, phone?: string, subject?: string, message: string}} payload
 */
export async function sendContact(payload = {}) {
  const clean = {
    name: trimIfString(payload.name),
    email: trimIfString(payload.email),
    phone: trimIfString(payload.phone || ""),
    subject: trimIfString(payload.subject || ""),
    message: trimIfString(payload.message),
  };

  if (!clean?.name) throw new Error("Please enter your name.");
  if (!clean?.email) throw new Error("Please enter your email.");
  if (!clean?.message || clean.message.length < 3) throw new Error("Please add a message.");

  return postJson("/api/contact", clean);
}

/**
 * Submit Testimonial
 * @param {{name: string, role?: string, quote: string, rating?: number, avatar?: string}} payload
 */
export async function submitTestimonial(payload = {}) {
  const clean = {
    name: trimIfString(payload.name),
    role: trimIfString(payload.role || ""),
    quote: trimIfString(payload.quote),
    rating: clamp(payload.rating ?? 5, 1, 5),
    avatar: trimIfString(payload.avatar || ""),
  };

  if (!clean?.name) throw new Error("Please enter your name.");
  if (!clean?.quote) throw new Error("Please add a short quote.");

  return postJson("/api/testimonials", clean);
}

/** Optional: expose the resolved API base for debugging */
export function getApiBase() {
  ensureBase();
  return BASE;
}

/** ESLint-friendly default export (no anonymous objects) */
const api = {
  sendContact,
  submitTestimonial,
  getApiBase,
};

export default api;

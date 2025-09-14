// server/index.js
// Express server for Creative Sparkles (CRA build + secure mailer APIs)

require("dotenv").config();

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

const app = express();

// Respect Render/NGINX proxy (needed for real IPs & https info)
app.set("trust proxy", 1);

// ---------- Basics ----------
const PORT = process.env.PORT || 3000;
const BUILD_DIR = path.join(__dirname, "..", "build");

// Simple request log (good during deploys)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ---------- Security Headers ----------
app.use(
  helmet({
    hidePoweredBy: true,
    noSniff: true,
    frameguard: { action: "sameorigin" },

    // Keep relaxed for CRA/SPA assets and inline chunks
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin" },

    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "blob:", "https:"],
        "font-src": ["'self'", "data:"],
        "connect-src": ["'self'", "blob:", "https:"],
        "frame-src": [
          "'self'",
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com",
          "https://player.vimeo.com",
          "https://www.google.com",
          "https://maps.google.com"
        ],
        "media-src": ["'self'", "blob:", "https:"],
        "object-src": ["'none'"],
        "form-action": ["'self'"],
        "base-uri": ["'self'"],
        // Uncomment if you use web workers:
        // "worker-src": ["'self'", "blob:"],
        // Uncomment if you strictly serve HTTPS behind Render:
        // "upgrade-insecure-requests": []
      }
    }
  })
);

// Some Chrome probes this path; return 204 so it doesn't error in logs
app.get("/.well-known/appspecific/com.chrome.devtools.json", (_req, res) => {
  res.status(204).end();
});

// ---------- Parsers ----------
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));

// ---------- Static build (CRA output) ----------
app.use(
  express.static(BUILD_DIR, {
    index: false, // we'll serve index.html manually (SPA fallback below)
    etag: true,
    maxAge: "1y" // long cache for hashed assets
  })
);

// ---------- Mail Transport ----------
const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "SMTP_TO"
];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.warn(
    "⚠️  Missing env vars:",
    missing.join(", "),
    "\n   Set them in Render → Environment."
  );
}
const smtpPort = Number(process.env.SMTP_PORT || 465);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ---------- Helpers ----------
const asyncH =
  (fn) =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// ---------- Rate limit (API only) ----------
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false
});
app.use("/api", apiLimiter);

// ---------- Health Check ----------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ---------- API: Contact ----------
app.post(
  "/api/contact",
  asyncH(async (req, res) => {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, message: "Invalid email" });
    }
    if (String(message).length > 5000) {
      return res.status(413).json({ ok: false, message: "Message too large" });
    }

    const text = `New contact submission:

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}

Subject: ${subject}

Message:
${message}

--
IP: ${req.ip}
UA: ${req.headers["user-agent"] || "-"}
Time: ${new Date().toISOString()}`;

    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
        subject: `Contact: ${subject} — ${name}`,
        replyTo: email,
        text
      });
      console.log("Email sent (contact):", info.messageId);
      res.json({ ok: true });
    } catch (err) {
      console.error("Mailer error (contact):", err);
      const msg =
        (err && err.response && err.response.toString && err.response.toString()) ||
        err?.message ||
        "Mail send failed";
      res.status(500).json({ ok: false, message: msg });
    }
  })
);

// ---------- API: Testimonials ----------
app.post(
  "/api/testimonials",
  asyncH(async (req, res) => {
    const { name, role, quote, rating = 5, avatar } = req.body || {};
    if (!name || !quote) {
      return res
        .status(400)
        .json({ ok: false, message: "Name and quote are required" });
    }

    const text = `New testimonial:

Name: ${name}
Role: ${role || "-"}
Rating: ${rating}
Avatar: ${avatar || "-"}

Quote:
${quote}

--
IP: ${req.ip}
UA: ${req.headers["user-agent"] || "-"}
Time: ${new Date().toISOString()}`;

    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
        subject: `🗣️ New Testimonial — ${name}`,
        replyTo: process.env.SMTP_TO,
        text
      });
      console.log("Email sent (testimonial):", info.messageId);
      res.json({ ok: true });
    } catch (err) {
      console.error("Mailer error (testimonial):", err);
      const msg =
        (err && err.response && err.response.toString && err.response.toString()) ||
        err?.message ||
        "Mail send failed";
      res.status(500).json({ ok: false, message: msg });
    }
  })
);

// ---------- API 404 ----------
app.use("/api", (req, res) => {
  console.warn("API 404:", req.method, req.originalUrl);
  res.status(404).json({ ok: false, message: "Not found" });
});

// ---------- Global Error Handler ----------
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err && (err.stack || err));
  if (res.headersSent) return;
  res
    .status(500)
    .json({ ok: false, message: err?.message || "Internal Server Error" });
});

// ---------- SPA Fallback (serve index.html for non-API routes) ----------
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(BUILD_DIR, "index.html"));
});

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  console.log(`📦 Serving CRA build from: ${BUILD_DIR}`);
});

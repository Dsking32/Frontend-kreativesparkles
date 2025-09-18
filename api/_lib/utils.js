function parseJson(req) {
    if (req.body && typeof req.body === "object") return req.body;
    try { return JSON.parse(req.body || "{}"); } catch { return {}; }
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim()); }
  function trim(s) { return (typeof s === "string" ? s.trim() : ""); }
  function clamp(n, min, max) { const x = Number(n); return Number.isNaN(x) ? min : Math.max(min, Math.min(max, x)); }
  function escapeHtml(s = "") {
    return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
  }
  function ok(res, data = {}) { res.setHeader("Content-Type","application/json"); res.status(200).end(JSON.stringify({ ok:true, ...data })); }
  function bad(res, msg, code = 400) { res.setHeader("Content-Type","application/json"); res.status(code).end(JSON.stringify({ error: msg })); }
  
  module.exports = { parseJson, isEmail, trim, clamp, escapeHtml, ok, bad };
  
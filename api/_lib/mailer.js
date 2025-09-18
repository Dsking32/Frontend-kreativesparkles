// Common mail sender for Vercel Functions
const nodemailer = require("nodemailer");

function resolveBool(v, def = false) {
  if (v === undefined || v === null || v === "") return def;
  const s = String(v).toLowerCase();
  return s === "1" || s === "true" || s === "yes";
}

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing SMTP envs (SMTP_HOST/PORT/SECURE/USER/PASS)");
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: resolveBool(SMTP_SECURE, Number(SMTP_PORT) === 465),
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendMail({ subject, text, html, replyTo }) {
  const { FROM_NAME, SMTP_USER, CONTACT_TO } = process.env;
  const from = FROM_NAME ? `${FROM_NAME} <${SMTP_USER}>` : SMTP_USER;
  const to = CONTACT_TO || SMTP_USER;

  const transporter = getTransport();
  const info = await transporter.sendMail({ from, to, subject, text, html, replyTo });
  return info?.messageId || "ok";
}

module.exports = { sendMail };

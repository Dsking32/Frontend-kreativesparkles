const { sendMail } = require("./_lib/mailer");
const { parseJson, isEmail, trim, escapeHtml, ok, bad } = require("./_lib/utils");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return bad(res, "Method not allowed", 405);

  const { name = "", email = "", phone = "", subject = "", message = "" } = parseJson(req);
  const clean = {
    name: trim(name),
    email: trim(email),
    phone: trim(phone),
    subject: trim(subject) || "New contact message",
    message: trim(message),
  };

  if (!clean.name) return bad(res, "Please enter your name.");
  if (!isEmail(clean.email)) return bad(res, "Please enter a valid email.");
  if (clean.message.length < 3) return bad(res, "Please add a message.");

  const text =
`Name: ${clean.name}
Email: ${clean.email}${clean.phone ? `\nPhone: ${clean.phone}` : ""}
Subject: ${clean.subject}

${clean.message}`;

  const html =
`<div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
  <p><strong>Name:</strong> ${escapeHtml(clean.name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(clean.email)}</p>
  ${clean.phone ? `<p><strong>Phone:</strong> ${escapeHtml(clean.phone)}</p>` : ""}
  <p><strong>Subject:</strong> ${escapeHtml(clean.subject)}</p>
  <hr>
  <pre style="white-space:pre-wrap">${escapeHtml(clean.message)}</pre>
</div>`;

  try {
    await sendMail({
      subject: `Contact • ${clean.subject}`,
      text, html,
      replyTo: clean.email,
    });
    return ok(res);
  } catch (e) {
    console.error("contact send error", e);
    return bad(res, "Could not send message. Please try again later.", 500);
  }
};

const { sendMail } = require("./_lib/mailer");
const { parseJson, trim, clamp, escapeHtml, ok, bad } = require("./_lib/utils");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return bad(res, "Method not allowed", 405);

  const { name = "", role = "", quote = "", rating = 5, avatar = "" } = parseJson(req);
  const clean = {
    name: trim(name),
    role: trim(role),
    quote: trim(quote),
    rating: clamp(rating, 1, 5),
    avatar: trim(avatar),
  };
  if (!clean.name) return bad(res, "Please enter your name.");
  if (!clean.quote) return bad(res, "Please add a short quote.");

  const text =
`New testimonial:
Name: ${clean.name}
Role: ${clean.role || "-"}
Rating: ${clean.rating}
Avatar: ${clean.avatar || "-"}

"${clean.quote}"`;

  const html =
`<div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
  <p><strong>Name:</strong> ${escapeHtml(clean.name)}</p>
  ${clean.role ? `<p><strong>Role:</strong> ${escapeHtml(clean.role)}</p>` : ""}
  <p><strong>Rating:</strong> ${clean.rating}</p>
  ${clean.avatar ? `<p><strong>Avatar:</strong> ${escapeHtml(clean.avatar)}</p>` : ""}
  <hr>
  <blockquote style="margin:0;padding:0.5rem 0">${escapeHtml(clean.quote)}</blockquote>
</div>`;

  try {
    await sendMail({ subject: "Testimonial • New submission", text, html });
    return ok(res);
  } catch (e) {
    console.error("testimonial send error", e);
    return bad(res, "Could not submit. Please try again later.", 500);
  }
};

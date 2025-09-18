const { sendMail } = require("./_lib/mailer");
const { parseJson, isEmail, trim, ok, bad } = require("./_lib/utils");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return bad(res, "Method not allowed", 405);

  const { email = "" } = parseJson(req);
  const value = trim(email);
  if (!isEmail(value)) return bad(res, "Please enter a valid email.");

  const text = `New newsletter subscriber:\n\n${value}\n\n(Manually add to your list or connect a provider later.)`;
  const html = `<p>New newsletter subscriber:</p><p><strong>${value}</strong></p><p>(Manually add to your list or connect a provider later.)</p>`;

  try {
    await sendMail({ subject: "Newsletter • New subscriber", text, html, replyTo: value });
    return ok(res);
  } catch (e) {
    console.error("subscribe send error", e);
    return bad(res, "Could not subscribe. Please try again later.", 500);
  }
};

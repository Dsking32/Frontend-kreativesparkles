// api/subscribe.js
import { sendMail } from "./_lib/mailer.js";
import { parseJson, isEmail, trim, ok, bad } from "./_lib/utils.js";

export default async function handler(req, res) {
  console.log("[subscribe] method:", req.method);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method === "GET") {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    return ok(res);
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    return bad(res, "Method not allowed", 405);
  }

  try {
    const body = parseJson(req) || {};
    const value = trim(body.email || "");
    if (!isEmail(value)) return bad(res, "Please enter a valid email.", 400);

    await sendMail({
      subject: "Newsletter — New subscriber",
      text: `New newsletter subscriber:\n\n${value}`,
      html: `<p>New newsletter subscriber:</p><p><strong>${value}</strong></p>`
    });

    return ok(res);
  } catch (e) {
    console.error("subscribe send error", e);
    return bad(res, "Could not subscribe. Please try again later.", 500);
  }
}

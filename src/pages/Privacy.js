import React from "react";

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-sm leading-6 text-white-800">
      <h1 className="mb-2 text-3xl font-semibold">Privacy Policy</h1>
      <p className="text-white-500">Last updated: {new Date().toISOString().slice(0,10)}</p>

      <p className="mt-6">
        Creative Sparkles (“we”, “us”, “our”) respects your privacy. This policy explains what
        we collect, how we use it, and the choices you have. It is designed to comply with
        applicable laws including the Nigeria Data Protection Regulation (NDPR) and the GDPR (where applicable).
      </p>

      <h2 className="mt-8 text-lg font-semibold">1) Who we are</h2>
      <p>
        Creative Sparkles Studio, Lekki Phase 1, Lagos, Nigeria. Contact:{" "}
        <a className="underline" href="mailto:hello@creativesparkles.studio">
          hello@creativesparkles.studio
        </a>.
      </p>

      <h2 className="mt-6 text-lg font-semibold">2) What we collect</h2>
      <ul className="list-disc pl-5">
        <li><strong>Contact details</strong> (name, email, phone) when you submit a form.</li>
        <li><strong>Project information</strong> you choose to share in messages.</li>
        <li><strong>Usage data</strong> (pages viewed, device information) via cookies/analytics (see Cookies Policy).</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">3) How we use your data</h2>
      <ul className="list-disc pl-5">
        <li>Responding to enquiries and providing services you request.</li>
        <li>Improving our website and service quality.</li>
        <li>Legal compliance and protecting our rights.</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">4) Legal bases</h2>
      <ul className="list-disc pl-5">
        <li><strong>Contract</strong> – to respond and provide requested services.</li>
        <li><strong>Legitimate interests</strong> – to improve and secure our services.</li>
        <li><strong>Consent</strong> – for optional analytics/marketing cookies where required.</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">5) Sharing</h2>
      <p>
        We don’t sell your data. We may share limited data with service providers (e.g. email, hosting),
        under contracts that protect your information, or when required by law.
      </p>

      <h2 className="mt-6 text-lg font-semibold">6) Retention</h2>
      <p>
        We keep personal data only as long as necessary for the purposes above, then delete or anonymise it.
        Emails regarding projects may be retained for legitimate business records.
      </p>

      <h2 className="mt-6 text-lg font-semibold">7) Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, delete, or restrict processing of
        your data, and to object or withdraw consent. To exercise rights, contact{" "}
        <a className="underline" href="mailto:hello@creativesparkles.studio">hello@creativesparkles.studio</a>.
      </p>

      <h2 className="mt-6 text-lg font-semibold">8) Security</h2>
      <p>
        We use reasonable administrative and technical measures to protect your data. No online transmission is 100% secure.
      </p>

      <h2 className="mt-6 text-lg font-semibold">9) International transfers</h2>
      <p>
        If we transfer data outside your country, we use appropriate safeguards (e.g., standard contractual clauses or equivalent).
      </p>

      <h2 className="mt-6 text-lg font-semibold">10) Children</h2>
      <p>Our site is not directed to children under 16 and we do not knowingly collect their data.</p>

      <h2 className="mt-6 text-lg font-semibold">11) Changes</h2>
      <p>
        We may update this policy from time to time. We’ll post the new date above. Continued use means you accept the updated policy.
      </p>

      <h2 className="mt-6 text-lg font-semibold">12) Contact</h2>
      <p>
        Questions? Email{" "}
        <a className="underline" href="mailto:hello@creativesparkles.studio">hello@creativesparkles.studio</a>.
      </p>
    </main>
  );
}

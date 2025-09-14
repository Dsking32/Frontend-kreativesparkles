import React from "react";

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-sm leading-6 text-white-800">
      <h1 className="mb-2 text-3xl font-semibold">Terms of Service</h1>
      <p className="text-white-500">Last updated: {new Date().toISOString().slice(0,10)}</p>

      <p className="mt-6">
        These Terms govern your use of the Kreative Sparkles website and services (“Services”).
        By accessing or using our Services, you agree to these Terms.
      </p>

      <h2 className="mt-8 text-lg font-semibold">1) Use of Services</h2>
      <ul className="list-disc pl-5">
        <li>Don’t misuse the site (no unlawful, harmful, or disruptive activity).</li>
        <li>You are responsible for the content you submit (it must be accurate and legal).</li>
        <li>We may modify or discontinue parts of the Services at any time.</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">2) Proposals, Fees & Invoices</h2>
      <p>
        Any project work, pricing and payment terms are defined in a separate proposal or contract.
        Unless stated otherwise, deposits are non-refundable once work begins.
      </p>

      <h2 className="mt-6 text-lg font-semibold">3) Intellectual Property</h2>
      <ul className="list-disc pl-5">
        <li>Our site design, text, graphics and trademarks are owned by us or our licensors.</li>
        <li>Project IP ownership/license is defined in the specific project agreement.</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">4) Third-Party Services</h2>
      <p>
        We may link to or integrate third-party tools (e.g., analytics, video, maps).
        They are governed by their own terms and policies.
      </p>

      <h2 className="mt-6 text-lg font-semibold">5) Disclaimers</h2>
      <p>
        The Services are provided “as is” and “as available”. We disclaim warranties to the fullest extent
        permitted by law, including implied warranties of merchantability, fitness for a particular purpose and non-infringement.
      </p>

      <h2 className="mt-6 text-lg font-semibold">6) Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Kreative Sparkles will not be liable for any indirect, incidental,
        special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly
        or indirectly, or any loss of data, use, goodwill, or other intangible losses.
      </p>

      <h2 className="mt-6 text-lg font-semibold">7) Indemnity</h2>
      <p>
        You agree to indemnify and hold Creative Sparkles harmless from claims arising out of your misuse of the Services
        or violation of these Terms.
      </p>

      <h2 className="mt-6 text-lg font-semibold">8) Termination</h2>
      <p>
        We may suspend or terminate access if you violate these Terms. Provisions that by their nature should survive,
        survive termination (e.g., IP, disclaimers, limitation of liability).
      </p>

      <h2 className="mt-6 text-lg font-semibold">9) Governing Law</h2>
      <p>
        These Terms are governed by the laws of the Federal Republic of Nigeria. Venue and jurisdiction lie with competent
        courts in Lagos, Nigeria.
      </p>

      <h2 className="mt-6 text-lg font-semibold">10) Changes</h2>
      <p>
        We may update these Terms occasionally. We’ll post the new date above. Continued use means you accept the updated Terms.
      </p>

      <h2 className="mt-6 text-lg font-semibold">11) Contact</h2>
      <p>
        Questions? Email{" "}
        <a className="underline" href="mailto:hello@creativesparkles.studio">hello@creitivesparkles.studio</a>.
      </p>
    </main>
  );
}

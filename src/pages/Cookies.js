import React from "react";

export default function Cookies() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-sm leading-6 text-white-800">
      <h1 className="mb-2 text-3xl font-semibold">Cookies Policy</h1>
      <p className="text-white-500">Last updated: {new Date().toISOString().slice(0,10)}</p>

      <p className="mt-6">
        Cookies are small text files stored on your device to help websites work and to collect information.
        We use cookies and similar technologies to operate our site and, where permitted, to understand usage.
      </p>

      <h2 className="mt-8 text-lg font-semibold">1) Types of cookies we use</h2>
      <ul className="list-disc pl-5">
        <li><strong>Essential cookies</strong> – required for core functionality and security.</li>
        <li><strong>Analytics cookies</strong> – help us understand page usage and improve the site.</li>
        <li><strong>Functional/embedded content</strong> – e.g., YouTube videos or Google Maps.</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">2) Examples</h2>
      <div className="overflow-x-auto">
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Purpose</th>
              <th className="py-2 pr-4">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4">Essential</td>
              <td className="py-2 pr-4">Load pages, keep preferences, secure forms</td>
              <td className="py-2 pr-4">Session / up to 12 months</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">Analytics</td>
              <td className="py-2 pr-4">Measure visits and interactions</td>
              <td className="py-2 pr-4">Session / up to 24 months</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Functional/Embedded</td>
              <td className="py-2 pr-4">Enable video or map embeds</td>
              <td className="py-2 pr-4">As set by provider (e.g., YouTube/Google)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-6 text-lg font-semibold">3) Managing cookies</h2>
      <p>
        Most browsers let you control cookies via settings (block, delete, or limit). If you block essential cookies,
        parts of the site may not work. Where required, we’ll request consent for non-essential cookies.
      </p>

      <h2 className="mt-6 text-lg font-semibold">4) Third-party cookies</h2>
      <p>
        Some third-party services (e.g., YouTube, Google Maps) set cookies when their content is loaded.
        Their policies apply to their cookies.
      </p>

      <h2 className="mt-6 text-lg font-semibold">5) Changes</h2>
      <p>
        We may update this Cookies Policy from time to time. We’ll post the new date above.
      </p>

      <h2 className="mt-6 text-lg font-semibold">6) Contact</h2>
      <p>
        Questions? Email{" "}
        <a className="underline" href="mailto:hello@creativesparkles.studio">hello@creativesparkles.studio</a>.
      </p>
    </main>
  );
}

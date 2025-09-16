import React from "react";
import ContactPage from "../components/Contact"; // adjust path if needed

export default function Contact() {
  return (
    <ContactPage
      email="shekonizainab10@gmail.com"
      phone="+234 902 447 1003"
      address="Lekki Phase 1, Lagos, Nigeria"
      map={{ embedUrl: "https://www.google.com/maps/embed?pb=!1m18..." }}
      social={{
        twitter: "https://twitter.com/yourhandle",
        instagram: "https://instagram.com/yourhandle",
        linkedin: "https://linkedin.com/company/yourcompany",
      }}
      onSubmit={async (data) => {
        // Robust error surfacing to parent
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.message || "Request failed");
      }}
    />
  );
}

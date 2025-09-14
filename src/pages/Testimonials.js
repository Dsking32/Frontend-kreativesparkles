import React from "react";
import TestimonialPage from "../components/T"; // adjust path if needed

export default function Testimonials() {
  return (
    <TestimonialPage
      logos={["/logos/a.svg", "/logos/b.svg", "/logos/c.svg", "/logos/d.svg"]}
      video={{
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Customer story",
        subtitle: "2-minute watch",
      }}
      onSubmitTestimonial={async (data) => {
        const res = await fetch("/api/testimonials", {
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

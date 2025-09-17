import React from "react";
import TestimonialPage from "../components/T"; // keep your path

export default function Testimonials() {
  return (
    <TestimonialPage
      logos={["/logos/a.svg", "/logos/b.svg", "/logos/c.svg", "/logos/d.svg"]}
      video={{
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Customer story",
        subtitle: "2-minute watch",
      }}
      // No onSubmitTestimonial prop → uses default Vercel API
    />
  );
}

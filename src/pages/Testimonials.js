import React from "react";
import TestimonialPage from "../components/T"; // keep your path

export default function Testimonials() {
  return (
    <TestimonialPage
      logos={[
        "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/Venix_Logo_pvjh45.png",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/The_Work_Life_Organisation_Logo_azuzwx.png",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/card3_k2g3bl.png",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/samples/cloudinary-logo-vector.svg",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/Luxeloons_Creations_Logo_wlkg5c.png",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/10844959_njkmu0.png",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/9391712_efdn7l.png",
        "https://res.cloudinary.com/dvpfdgnkw/image/upload/card3_navkwo.png",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      ]}
      video={{
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Customer story",
        subtitle: "2-minute watch",
      }}
      // No onSubmitTestimonial prop → uses default submitTestimonial() to your Render API
    />
  );
}

// app/about/page.js
import React from "react";
// Adjust the path to where you saved the About component I gave you
// If you put it in src/components/About.jsx, use the relative path below:
import AboutPage from "../../src/components/About";

export default function Page() {
  return (
    <AboutPage
      hero={{
        bgColor: "#3A4F30",
        bgImage:
          "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
        title: "We design experiences that sparkle",
        highlight: "sparkle",
      }}
    />
  );
}

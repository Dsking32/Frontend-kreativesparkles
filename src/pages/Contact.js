import React from "react";
import ContactPage from "../components/Contact";

export default function Contact() {
  return (
    <ContactPage
      email="hello@yourdomain.com"
      phone="+234 902 447 1003"
      address="Lekki Phase 1, Lagos, Nigeria"
      map={{ embedUrl: "https://www.google.com/maps/embed?pb=!1m18..." }}
      social={{
        twitter: "https://twitter.com/yourhandle",
        instagram: "https://www.instagram.com/kreativesparkles?igsh=MTE5NHhkMzNtZXU3Nw%3D%3D&utm_source=qr",
        linkedin: "https://linkedin.com/company/yourcompany",
      }}
      // onSubmit not passed → default sendContact() will be used
    />
  );
}

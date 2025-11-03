import React from "react";
import ContactPage from "../components/Contact";

export default function Contact() {
  return (
    <ContactPage
      email="info@kreativesparkles.com"
      phone="+234 902 447 1003"
      address="5, Vantage Estate, Off Jibowu Rd,Lagos"
      map={{ embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.7916611876887!2d3.2987121!3d6.6580402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b97d7951b3f97%3A0x46196b64e3f51946!2sVantage%20Estate!5e0!3m2!1sen!2sng!4v1697400000000!5m2!1sen!2sng" }}
      social={{
        twitter: "https://twitter.com/yourhandle",
        instagram: "https://www.instagram.com/kreativesparkles?igsh=MTE5NHhkMzNtZXU3Nw%3D%3D&utm_source=qr",
        linkedin: "https://linkedin.com/company/yourcompany",
      }}
      // onSubmit not passed → default sendContact() will be used
    />
  );
}

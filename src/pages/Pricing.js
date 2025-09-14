// src/pages/pricing.js
import React from "react";
import PricingPage from "../components/Pricing"; // adjust path

export default function Pricing() {
  return <PricingPage onCta={(plan) => console.log("Selected:", plan)} />;
}

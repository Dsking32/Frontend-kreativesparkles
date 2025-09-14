import React from "react";
import HomeHero1 from "../components/Home-hero1";
import Home2 from "../components/Home2"
import Home3 from "../components/Home3"
import Home4 from "../components/Home4"
import HH from "../components/HH"



export default function Home() {
  return (
    <>

      
      <HomeHero1 />
      <Home2 />
      <HH />
      <Home3 />
      <Home4 />
    
    </>
  );
} 

/*
// src/pages/index.js (or Home.js)
import React from "react";
import AdvancedHomeLanding from "../components/H"; // adjust path

export default function Home() {
  return <AdvancedHomeLanding />;
}
*/
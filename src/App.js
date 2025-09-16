import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';
import Pricing from './pages/Pricing';
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import ScrollToTop from "./components/ScrollToTop"; // ⬅️ add this

function App() {
  const particlesRef = useRef(null);

  useEffect(() => {
    if (window.particlesJS && particlesRef.current) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#FFD700' },
          shape: { type: 'star' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          move: { enable: true, speed: 1 },
        },
        interactivity: {
          events: { onhover: { enable: true, mode: 'repulse' } },
        },
      });
    }
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Background particles */}
      <div
        id="particles-js"
        ref={particlesRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      <Router>
        <ScrollToTop /> {/* ⬅️ ensure this is inside Router but above Routes */}
        {/* Make sure your Navbar has sticky styles internally:
            e.g., a wrapper with `sticky top-0 z-50` */}
        <Navbar />

        {/* Main content */}
        <main className="relative bg-[#3A4F30] text-white pt-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

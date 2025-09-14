import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Play, ChevronDown, Sparkles, Star, Users, 
  TrendingUp, Award, Globe, Zap, Heart, Download
} from 'lucide-react';

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "Crafting Digital Excellence",
      subtitle: "Where Innovation Meets Design",
      description: "We create stunning digital experiences that captivate your audience and drive results through cutting-edge technology and creative excellence.",
      ctaPrimary: "Start Your Project",
      ctaSecondary: "View Our Work",
      stats: { projects: "500+", clients: "250+", awards: "50+" }
    },
    {
      title: "Transforming Ideas Into Reality",
      subtitle: "Your Vision, Our Expertise",
      description: "From concept to completion, we bring your boldest ideas to life with innovative solutions that exceed expectations and deliver measurable impact.",
      ctaPrimary: "Get Started Today",
      ctaSecondary: "Learn More",
      stats: { experience: "8+ Years", satisfaction: "99%", growth: "200%" }
    },
    {
      title: "Building Tomorrow's Web",
      subtitle: "Future-Ready Solutions",
      description: "Stay ahead of the curve with modern, scalable solutions that adapt to your growing needs and embrace the latest technologies.",
      ctaPrimary: "Explore Services",
      ctaSecondary: "Contact Us",
      stats: { technologies: "50+", uptime: "99.9%", performance: "A+" }
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentSlideData = slides[currentSlide];

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-40 left-40 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-ping" />
        <div className="absolute top-60 right-60 w-16 h-16 bg-purple-500/20 rounded-full blur-lg animate-pulse" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
      </div>

      {/* Header content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main hero section */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 py-20">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Badge/Announcement */}
            <div className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 mb-8 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-white/80 text-sm font-medium">New: Advanced AI-Powered Solutions</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </div>

            {/* Main heading */}
            <div className={`mb-6 transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  {currentSlideData.title}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light">
                {currentSlideData.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className={`text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed transform transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {currentSlideData.description}
            </p>

            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 transform transition-all duration-1000 delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              
              {/* Primary CTA */}
              <button className="group relative bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl px-8 py-4 text-white font-semibold shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 border border-white/20 overflow-hidden">
                <div className="flex items-center space-x-2 relative z-10">
                  <span>{currentSlideData.ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </button>

              {/* Secondary CTA */}
              <button className="group relative bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 text-white font-medium border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="flex items-center space-x-2 relative z-10">
                  <Play className="w-4 h-4" />
                  <span>{currentSlideData.ctaSecondary}</span>
                </div>
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Stats section */}
            <div className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16 transform transition-all duration-1000 delay-800 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {Object.entries(currentSlideData.stats).map(([key, value], index) => {
                const icons = [Award, Users, TrendingUp];
                const Icon = icons[index] || Star;
                
                return (
                  <div key={key} className="group text-center">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                      <Icon className="w-8 h-8 text-pink-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
                      <div className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide indicators */}
            <div className={`flex items-center justify-center space-x-3 mb-8 transform transition-all duration-1000 delay-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Trust indicators */}
            <div className={`flex items-center justify-center space-x-8 text-white/50 transform transition-all duration-1000 delay-1200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex items-center space-x-2 group">
                <Globe className="w-4 h-4 group-hover:text-white/70 transition-colors" />
                <span className="text-sm group-hover:text-white/70 transition-colors">Global Reach</span>
              </div>
              <div className="w-1 h-1 bg-white/30 rounded-full" />
              <div className="flex items-center space-x-2 group">
                <Zap className="w-4 h-4 group-hover:text-white/70 transition-colors" />
                <span className="text-sm group-hover:text-white/70 transition-colors">Lightning Fast</span>
              </div>
              <div className="w-1 h-1 bg-white/30 rounded-full" />
              <div className="flex items-center space-x-2 group">
                <Heart className="w-4 h-4 group-hover:text-white/70 transition-colors" />
                <span className="text-sm group-hover:text-white/70 transition-colors">Made with Love</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <button
            onClick={scrollToContent}
            className="group flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="relative">
              <ChevronDown className="w-6 h-6 animate-bounce group-hover:animate-pulse" />
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
            </div>
          </button>
        </div>
      </div>

      {/* Floating action button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button className="group bg-gradient-to-r from-pink-500 to-violet-500 rounded-full p-4 shadow-2xl hover:shadow-pink-500/25 transform hover:scale-110 transition-all duration-300 border border-white/20">
          <Download className="w-6 h-6 text-white group-hover:animate-bounce" />
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
              Download Portfolio
              <div className="absolute top-full right-4 w-2 h-2 bg-black/80 rotate-45 transform -translate-y-1" />
            </div>
          </div>
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-pink-400 rounded-full animate-ping opacity-30" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-violet-400 rounded-full animate-bounce opacity-50" />
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-60" />
    </div>
  );
};

export default Header;
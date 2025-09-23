import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, User, Briefcase, FolderOpen, Mail, BookOpen, Star,
  DollarSign, Menu,
} from "lucide-react";

// ✅ Update path if your logo lives elsewhere
import logoImage from "../assets/logoo.PNG";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "about", label: "About", icon: User, path: "/about" },
    { id: "services", label: "Services", icon: Briefcase, path: "/services" },
    { id: "portfolio", label: "Portfolio", icon: FolderOpen, path: "/portfolio" },
    { id: "contact", label: "Contact", icon: Mail, path: "/contact" },
    { id: "blog", label: "Blog", icon: BookOpen, path: "/blog" },
    { id: "testimonials", label: "Testimonials", icon: Star, path: "/testimonials" },
    { id: "pricing", label: "Pricing", icon: DollarSign, path: "/pricing" },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // Handle clicks outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const linkBase =
    "relative flex items-center transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30";
  const activeDesktop =
    "bg-[#4A6B3D] text-white shadow-lg";
  const idleDesktop =
    "text-white/90 hover:text-white hover:bg-[#4A6B3D]/80";

  return (
    <>
      <div className="w-full bg-[#3A4F30]">
        <div className="w-full px-8 pt-8 pb-8 md:px-8 md:pt-8 md:pb-8 bg-[#3A4F30]">
          <div className="flex justify-center">

            {/* DESKTOP (≥1024px) */}
            <nav
              className="hidden lg:block relative bg-[#4A6B3D]/80 backdrop-blur-xl rounded-3xl px-6 py-4 shadow-2xl"
              aria-label="Primary navigation"
            >
              <NavLink
                to="/"
                className="absolute left-8 top-1/2 -translate-y-1/2 cursor-pointer select-none"
              >
                <img
                  src={logoImage}
                  alt="Kreative Sparkles"
                  className="h-28 w-auto object-contain"
                  draggable="false"
                />
              </NavLink>

              <div className="flex items-center space-x-1 pl-56 pr-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="relative group">
                      <NavLink
                        to={item.path}
                        end={item.path === "/"} 
                        className={({ isActive }) =>
                          [
                            linkBase,
                            "space-x-2 px-4 py-3 transform hover:-translate-y-0.5 hover:shadow-lg",
                            isActive ? activeDesktop : idleDesktop,
                          ].join(" ")
                        }
                      >
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-[#4A6B3D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon className="w-4 h-4 relative z-10" />
                        <span className="relative z-10 text-sm font-medium hidden xl:inline">
                          {item.label}
                        </span>
                        <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out" />
                        </span>
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* TABLET (≥768px and <1024px) */}
            <nav
              className="hidden md:block lg:hidden relative bg-[#4A6B3D]/80 backdrop-blur-xl rounded-3xl p-2 shadow-2xl"
              aria-label="Primary navigation (tablet)"
            >
              <NavLink
                to="/"
                className="absolute left-8 top-1/2 -translate-y-1/2 cursor-pointer select-none"
              >
                <img
                  src={logoImage}
                  alt="Kreative Sparkles"
                  className="h-12 w-auto object-contain shrink-0"
                  draggable="false"
                />
              </NavLink>

              <div className="flex items-center space-x-1 pl-40 pr-4">
                {navItems.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="relative group">
                      <NavLink
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                          [
                            linkBase,
                            "justify-center px-3 py-3 transform hover:-translate-y-0.5 hover:shadow-lg",
                            isActive ? activeDesktop : idleDesktop,
                          ].join(" ")
                        }
                      >
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-[#4A6B3D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon className="w-4 h-4 relative z-10" />
                      </NavLink>
                    </div>
                  );
                })}

                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((v) => !v)}
                    className="relative flex items-center justify-center px-3 py-3 rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg text-white/90 hover:text-white hover:bg-[#4A6B3D]/80 focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                    aria-label="More"
                  >
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-[#4A6B3D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Menu className="w-4 h-4 relative z-10" />
                  </button>
                  {isMenuOpen && (
                    <div
                      role="menu"
                      className="absolute top-full right-0 mt-2 bg-[#4A6B3D] backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden min-w-48 border border-white/10"
                    >
                      {navItems.slice(4).map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.path === "/"}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                              [
                                "w-full flex items-center gap-3 px-4 py-3 transition-all duration-200",
                                isActive ? "text-white bg-[#3A4F30]" : "text-white/90 hover:text-white hover:bg-[#3A4F30]",
                              ].join(" ")
                            }
                            role="menuitem"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </nav>

            {/* MOBILE (<768px) - COMPLETELY REDESIGNED */}
            <nav 
              ref={mobileMenuRef}
              className="block md:hidden w-full relative z-50" 
              aria-label="Primary navigation (mobile)"
            >
              {/* Mobile Header Bar */}
              <div className="flex items-center justify-between bg-[#4A6B3D]/90 backdrop-blur-xl rounded-3xl px-6 py-4 shadow-2xl border border-white/10">
                {/* Logo */}
                <NavLink
                  to="/"
                  className="cursor-pointer select-none flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    src={logoImage}
                    alt="Creative Sparkles"
                    className="h-20 w-auto object-contain shrink-0"
                    draggable="false"
                  />
                </NavLink>

                {/* Hamburger Button */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`
                    relative p-3 rounded-2xl transition-all duration-500 ease-out
                    focus:outline-none focus:ring-2 focus:ring-white/50
                    ${isMenuOpen 
                      ? 'bg-[#3A4F30] text-white shadow-lg rotate-180' 
                      : 'text-white/90 hover:text-white hover:bg-[#3A4F30]/60 hover:rotate-12'
                    }
                  `}
                  aria-controls="mobile-menu"
                  aria-expanded={isMenuOpen}
                >
                  <div className="relative w-6 h-6">
                    <span
                      className={`absolute top-0 left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                        isMenuOpen ? 'rotate-45 translate-y-2.5' : 'rotate-0 translate-y-0'
                      }`}
                    />
                    <span
                      className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                        isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                      }`}
                    />
                    <span
                      className={`absolute top-5 left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                        isMenuOpen ? '-rotate-45 -translate-y-2.5' : 'rotate-0 translate-y-0'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Mobile Menu Dropdown */}
              <div
                id="mobile-menu"
                className={`
                  absolute top-full left-0 right-0 mt-3 
                  transform transition-all duration-500 ease-out origin-top
                  ${isMenuOpen 
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                  }
                `}
                style={{
                  maxHeight: isMenuOpen ? '500px' : '0px',
                  overflow: 'hidden'
                }}
              >
                <div className="bg-[#4A6B3D]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                  {/* Navigation Items */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        
                        return (
                          <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.path === "/"}
                            onClick={() => setIsMenuOpen(false)}
                            className={`
                              relative group flex flex-col items-center gap-3 p-4 rounded-2xl 
                              transition-all duration-300 ease-out
                              transform active:scale-95
                              focus:outline-none focus:ring-2 focus:ring-white/30
                              ${isActive 
                                ? 'bg-[#3A4F30] text-white shadow-lg' 
                                : 'text-white/90 hover:text-white hover:bg-[#3A4F30]/70'
                              }
                            `}
                            style={{
                              animationDelay: `${index * 100}ms`,
                              animation: isMenuOpen ? 'slideInScale 600ms ease-out forwards' : 'none'
                            }}
                          >
                            {/* Background Gradient */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#4A6B3D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Icon */}
                            <Icon 
                              className={`
                                w-6 h-6 relative z-10 transition-all duration-300
                                ${isActive ? 'text-[#FFD700] scale-110' : 'group-hover:scale-110'}
                              `} 
                            />
                            
                            {/* Label */}
                            <span className="text-sm font-medium relative z-10 text-center">
                              {item.label}
                            </span>

                            {/* Active Indicator */}
                            {isActive && (
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
                            )}

                            {/* Ripple Effect */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-active:opacity-100 transition-opacity duration-200">
                              <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-full transition-transform duration-300" />
                            </div>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-[#FFD700]/40 via-[#4A6B3D]/60 to-[#FFD700]/40" />
                </div>
              </div>
            </nav>

          </div>
        </div>
      </div>

      {/* Full Screen Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Custom Keyframe Animations */}
      <style jsx>{`
        @keyframes slideInScale {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
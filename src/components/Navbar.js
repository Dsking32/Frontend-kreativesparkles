import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, User, Briefcase, FolderOpen, Mail, BookOpen, Star,
  DollarSign, Menu, X
} from "lucide-react";

// ✅ Update path if your logo lives elsewhere
import logoImage from "../assets/logoo.PNG";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const linkBase =
    "relative flex items-center transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30";
  const activeDesktop =
    "bg-[#4A6B3D] text-white shadow-lg";
  const idleDesktop =
    "text-white/90 hover:text-white hover:bg-[#4A6B3D]/80";

  const activeOnlyDot = (
    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
  );

  return (
    <div className="w-full bg-[#3A4F30]">
      <div className="w-full px-8 pt-8 pb-8 md:px-8 md:pt-8 md:pb-8 bg-[#3A4F30]">
        <div className="flex justify-center">

          {/* DESKTOP (≥1024px) */}
          <nav
            className="hidden lg:block relative bg-[#4A6B3D]/80 backdrop-blur-xl rounded-3xl p-2 shadow-2xl"
            aria-label="Primary navigation"
          >
            {/* Logo (clickable to Home) */}
            <NavLink
              to="/"
              className="absolute left-8 top-1/2 -translate-y-1/2 cursor-pointer select-none"
            >
              <img
                src={logoImage}
                alt="Kreative Sparkles"
                className="h-20 md:h-24 lg:h-20 w-auto object-contain"
                draggable="false"
              />
            </NavLink>

            {/* Items */}
            <div className="flex items-center space-x-1 pl-56 pr-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="relative group">
                    <NavLink
                      to={item.path}
                      end={item.path === "/"} // treat "/" as exact
                      className={({ isActive }) =>
                        [
                          linkBase,
                          "space-x-2 px-4 py-3 transform hover:scale-105",
                          isActive ? activeDesktop : idleDesktop,
                        ].join(" ")
                      }
                    >
                      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-[#4A6B3D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10 text-sm font-medium hidden xl:inline">
                        {item.label}
                      </span>
                      {location.pathname === item.path && activeOnlyDot}
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
            {/* Logo */}
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

            {/* Items (first 4) + overflow menu */}
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
                          "justify-center px-3 py-3 transform hover:scale-105",
                          isActive ? activeDesktop : idleDesktop,
                        ].join(" ")
                      }
                    >
                      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-[#4A6B3D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="w-4 h-4 relative z-10" />
                      {location.pathname === item.path && activeOnlyDot}
                    </NavLink>
                  </div>
                );
              })}

              {/* Overflow menu for the rest */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((v) => !v)}
                  className="relative flex items-center justify-center px-3 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 text-white/90 hover:text-white hover:bg-[#4A6B3D]/80 focus:outline-none focus:ring-2 focus:ring-white/30"
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

          {/* MOBILE (<768px) */}
          <nav className="block md:hidden w-full" aria-label="Primary navigation (mobile)">
            <div className="flex items-center justify-between bg-[#4A6B3D]/80 backdrop-blur-xl rounded-3xl px-6 py-4 shadow-2xl">
              {/* Logo */}
              <NavLink
                to="/"
                className="cursor-pointer select-none flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={logoImage}
                  alt="Creative Sparkles"
                  className="h-10 w-auto object-contain shrink-0"
                  draggable="false"
                />
              </NavLink>

              <button
                type="button"
                onClick={() => setIsMenuOpen((v) => !v)}
                className="text-white/90 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-xl p-1"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {isMenuOpen && (
              <div
                id="mobile-menu"
                className="mt-2 bg-[#4A6B3D] backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-1 p-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        end={item.path === "/"}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          [
                            "relative flex flex-col items-center gap-2 px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30",
                            isActive ? "bg-[#3A4F30] text-white shadow-lg" : "text-white/90 hover:text-white hover:bg-[#3A4F30]/80",
                          ].join(" ")
                        }
                        aria-current={location.pathname === item.path ? "page" : undefined}
                      >
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-[#4A6B3D]/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        <Icon className="w-5 h-5 relative z-10" />
                        <span className="text-xs font-medium relative z-10">{item.label}</span>
                        {location.pathname === item.path && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>

        </div>
      </div>
    </div>
  );
};

export default Navbar;

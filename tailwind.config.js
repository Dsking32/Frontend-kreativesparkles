/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6E6FA', // Lavender
        accent: '#FFD700', // Gold sparkle
        secondary: '#FFB6C1', // Soft pink
        gradientStart: '#FFB6C1',
        gradientEnd: '#E6E6FA',
      },
      animation: {
        sparkle: 'sparkle 1.5s infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        astros: {
          // The deep, nearly black background
          "bg-dark": "#020617",
          // The primary dark blue background (gradient start)
          "bg-main": "#050B18",
          // Card background (slightly lighter/blue-grey)
          card: "#0B1A31",
          // Active tab/highlight blue
          accent: "#1E3A8A",
          // Secondary text (muted grey/blue)
          muted: "#94A3B8",
          // Foreground text
          white: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};

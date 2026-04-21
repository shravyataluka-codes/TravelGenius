/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          purple: "#9333EA",
        },
      },
      boxShadow: {
        glass: "0 15px 45px rgba(15, 23, 42, 0.28)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(100deg, #2563EB 0%, #9333EA 100%)",
      },
    },
  },
  plugins: [],
}


import importantPlugin from "tailwindcss-important";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",
  theme: {
  },
  plugins: [
    importantPlugin
  ],
};

export default config;

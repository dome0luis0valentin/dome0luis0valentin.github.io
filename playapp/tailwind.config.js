<<<<<<< HEAD
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
=======
import importantPlugin from "tailwindcss-important";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    importantPlugin
  ],
};

export default config;
>>>>>>> 3575a4deabde0cf1f7adc329b160b5b8d347fff0

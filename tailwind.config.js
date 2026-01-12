/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "gray-base": "#FAFAFA",
      },
    },
  },
  plugins: [],
};

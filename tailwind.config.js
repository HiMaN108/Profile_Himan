// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Valorant inspired palette
        valorantRed: "hsl(351, 96%, 65%)",   // #ff4655
        valorantDark: "hsl(210, 10%, 10%)", // near black
        valorantLight: "hsl(0, 0%, 95%)",
        accentGreen: "hsl(162, 100%, 50%)", // bright green
        accentBlue: "hsl(210, 100%, 60%)"   // cyber blue for accents
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};

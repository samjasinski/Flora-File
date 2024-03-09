/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        PlantLetters: "PlantLetters",
        sans: "Comfortaa"
      },
      colors: {
        'flora-red': '#cd5c5c',
        'flora-red-light': '#d07878'
        }
    },
  },
  plugins: [],
}


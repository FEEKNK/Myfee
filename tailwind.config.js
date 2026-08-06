/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        thai: ['Sarabun', 'sans-serif'],
      },
      colors: {
        gray: {
          750: '#2d3748',
        }
      }
    }
  },
  plugins: [],
}

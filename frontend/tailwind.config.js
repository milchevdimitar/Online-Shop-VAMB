/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class', // Активиране на клас-базиран dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Пътища до твоите файлове
  theme: {
    extend: {},
  },
  plugins: [],
};


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
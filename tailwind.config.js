/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cyan': '#00F0FF',
        'brand-emerald': '#00FF9D',
        'brand-purple': '#B026FF',
        'brand-dark': '#05070f',
        'brand-surface': 'rgba(255, 255, 255, 0.03)',
      }
    },
  },
  plugins: [],
}

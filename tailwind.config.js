/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fdf8f0',
        earth: {
          50: '#fdf8f0',
          100: '#f5ead6',
          200: '#e8d0a8',
          300: '#d4aa6e',
          400: '#c48d45',
          500: '#a87232',
          600: '#8a5a24',
          700: '#6e451c',
          800: '#573617',
          900: '#472d14',
        },
        forest: {
          50: '#f2f8f0',
          100: '#dff0d8',
          200: '#bde0b0',
          300: '#8fc97f',
          400: '#5fac4e',
          500: '#3d8f35',
          600: '#2d7228',
          700: '#245a20',
          800: '#1e481b',
          900: '#1a3c18',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: '#3182F6',
          'blue-hover': '#1B64DA',
          'blue-light': '#EBF3FE',
          bg: '#F2F4F6',
          white: '#FFFFFF',
          label: '#191F28',
          secondary: '#333D4B',
          tertiary: '#6B7684',
          placeholder: '#B0B8C1',
          line: '#E5E8EB',
          'line-dark': '#D1D6DB',
        },
      },
    },
  },
  plugins: [],
}

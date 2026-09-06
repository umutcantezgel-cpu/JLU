/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jlu: {
          blue: '#165A97',
          'blue-dark': '#0B3259',
          'blue-hover': '#124878',
          light: '#EAF7FF',
          canvas: '#F8FAFC',
          amber: '#D97706',
          'amber-light': '#FEF3C7',
          green: '#15803D',
          'green-light': '#E5F0CF',
          red: '#B91C1C',
          'red-light': '#FEE2E2',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}

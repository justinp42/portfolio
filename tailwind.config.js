/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#A8BBA4',
          dark: '#6B7F68',
          mist: '#E8F0E6',
        },
        'warm-linen': '#FAF6F1',
        cream: '#FFF9F2',
        espresso: '#2C2318',
        'warm-dark': '#4A3F35',
        clay: '#8C7E72',
        'burnt-clay': '#B86B4A',
        straw: '#E8DFD4',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

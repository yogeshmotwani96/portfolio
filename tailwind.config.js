/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#e50914',
          dark: '#0b0b0f',
          soft: '#121218',
          card: '#1a1a22',
        },
      },
      boxShadow: {
        card: '0 10px 20px rgba(0,0,0,0.35), 0 6px 6px rgba(0,0,0,0.3)'
      }
    },
  },
  plugins: [],
}

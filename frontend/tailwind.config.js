/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf8f3',
          100: '#f5f0e6',
          200: '#ebe0cc',
          300: '#dcc9a3',
          400: '#c9b17a',
          500: '#c5a029',
          600: '#b08f24',
          700: '#8c721d',
          800: '#6b5716',
          900: '#4a3c10',
        },
        x8: {
          dark: '#231f20',
          gold: '#c5a029',
          'gold-light': '#d4b54a',
          'gold-dark': '#a88a22',
          gray: '#6b7280',
          'gray-light': '#f5f5f5',
          border: '#e5e5e5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

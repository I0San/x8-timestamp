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
          50: '#fdfcf8',
          100: '#faf6ed',
          200: '#f3ebda',
          300: '#e9dbb8',
          400: '#dbc27d',
          500: '#cba855',
          600: '#b8923d',
          700: '#997633',
          800: '#7d5f2c',
          900: '#674d27',
        },
        x8: {
          dark: '#231f20',
          gold: '#dbc27d',
          'gold-light': '#e8d49f',
          'gold-dark': '#c4a85c',
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

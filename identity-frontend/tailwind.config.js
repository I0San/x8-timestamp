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
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(219, 194, 125, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(219, 194, 125, 0.6)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}

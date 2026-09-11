/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f8f5',
          100: '#d9efe6',
          200: '#b5dfd0',
          300: '#84c7b2',
          400: '#4fa78f',
          500: '#2b8a72',
          600: '#0e7c66',
          700: '#0b6353',
          800: '#0b4f43',
          900: '#0a4138',
          950: '#052f28',
        },
        sand: {
          50: '#fbfaf7',
          100: '#f5f1e8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(10, 65, 56, 0.18)',
        card: '0 1px 2px rgba(10, 65, 56, 0.04), 0 12px 32px -16px rgba(10, 65, 56, 0.16)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}


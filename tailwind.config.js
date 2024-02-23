/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme') 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, rgba(144, 172, 255, 0.2) 0%, rgba(144, 172, 255, 0) 70%, rgba(144, 172, 255, 0) 100%)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}


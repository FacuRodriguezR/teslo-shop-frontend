/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'montserrat': [ 'Montserrat', 'sans-serif' ],
      'inter': [ 'Inter', 'sans-serif' ],
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out'
      },
      keyframes:{
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1},
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes:['night']
  }
}


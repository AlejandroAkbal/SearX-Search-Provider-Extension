const defaultTheme = require('tailwindcss/defaultTheme')
const defaultColors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.vue'],

  theme: {
    extend: {
      colors: {
        primary: defaultColors.violet,

        /**
         * Used for the background
         */
        base: {
          // TODO: remember that borders, and backgrounds use 20% opacity: border-base-0/20
          // TODO: E.g: border-base-0/20 & bg-base-0/20
          0: defaultColors.white,

          ...defaultColors.gray,

          1000: defaultColors.black
        },

        /**
         * Used for text and icons on the background
         */
        'base-content': {
          hover: defaultColors.gray[900],

          highlight: defaultColors.gray[700],

          DEFAULT: defaultColors.gray[500]
        }
      },

      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },

  plugins: [require('@tailwindcss/forms')]
}

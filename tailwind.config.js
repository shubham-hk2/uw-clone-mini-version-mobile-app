/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      colors: {
        primary: '#394F5F',
        secondary: '#FF6900',
        grey: '#8E8E8E',
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  plugins: [],
};

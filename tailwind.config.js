/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#d64227',
        'brand-primary-dark': '#ad341f',
        'brand-primary-light': '#d7523a',
        'brand-secondary': '#142b54',
        'brand-dark': '#303030',
        'brand-light-grey': '#f8f8f8',
        'brand-medium-grey': '#e6e6e6',
        'brand-light': '#ffffff',
        'brand-text': '#212529',
      },
      fontSize: {
        'l': 24,
        'm': 16,
        's': 12,
      },
    },
  },
  plugins: [],
}
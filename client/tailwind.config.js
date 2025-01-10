/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '480px', // Mobile
      'md': '768px', // Tablet
      'lg': '1024px', // Laptop
      'xl': '1280px', // Desktop
    },
    extend: {
      backgroundImage: {
        'faq-gradient': 'linear-gradient(0deg, rgba(229, 0, 0, 0) 0%, rgba(229, 0, 0, 1) 17%, rgba(229, 0, 0, 0) 100%)',
      },
      borderColor:{
'faq-gradient': 'linear-gradient(0deg, rgba(229, 0, 0, 0) 0%, rgba(229, 0, 0, 1) 17%, rgba(229, 0, 0, 0) 100%)',
      },
      backgroundColor:{
        'faq-gradient': 'linear-gradient(0deg, rgba(229, 0, 0, 0) 0%, rgba(229, 0, 0, 1) 17%, rgba(229, 0, 0, 0) 100%)',
      },
      colors: {
        'red45' : '#E50000',
        'red50' : '#FF0000',
        'red55' : '#FF1919',
        'red60' : '#FF3333',
        'red80' : '#FF9999',
        'red90' : '#FFCCCC',
        'red95' : '#FFE5E5',
        'red99' : '#FFFAFA',

        'black6' : '#0F0F0F',
        'black8' : '#141414',
        'black10' : '#1A1A1A',
        'black12' : '#1F1F1F',
        'black15' : '#262626',
        'black20' : '#333333',
        'black25' : '#404040',
        'black30' : '#4C4C4C',

        'gray60' : '#999999',
        'gray65' : '#A6A6A6',
        'gray70' : '#B3B3B3',
        'gray75' : '#BFBFBF',
        'gray90' : '#E4E4E7',
        'gray95' : '#F1F1F3',
        'gray97' : '#F7F7F8',
        'gray99' : '#FCFCFD',

        'faq-gradient': 'linear-gradient(0deg, rgba(229, 0, 0, 0) 0%, rgba(229, 0, 0, 1) 17%, rgba(229, 0, 0, 0) 100%)',
      },
      fontFamily:{
        'manrope': ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
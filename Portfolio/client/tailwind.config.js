const color =  require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        // primary: '#202225',
        // secondary: '#5865f2',
        // gray: {
        //   900: '#202225',
        //   800:'#2f3136',
        //   700: '#36393f',
        //   600: '#4f545c',
        //   400: '#d4d7dc',
        //   300: '#e3e5e8',
        //   200: '#ebedef',
        //   100: '#f2f3f5',
          
        // }
      }
    },
  },
  plugins: [],
}
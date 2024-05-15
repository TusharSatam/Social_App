/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Gray:'#797979',
        lightGray: '#F6F6F6',
        primaryColor: '#FF4D67',
      },
      fontFamily: {
        sfProDisplay: ['SF-Pro-Display-Light','SF-Pro-Display-Regular','SF-Pro-Display-Medium', 'SF-Pro-Display-Semibold','SF-Pro-Display-Bold'],
      },
    },
  },
  plugins: [],
}


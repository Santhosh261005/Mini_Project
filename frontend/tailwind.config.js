module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // Adjusted this path for proper matching
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-in-top': 'slide-in-top 1s ease-out forwards',
        'slide-in-left': 'slide-in-left 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}

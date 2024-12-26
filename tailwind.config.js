/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boardTile: {
          yellow: "#FFD700",
          red: "#FF4500",
        },
      },
    },
  },
  plugins: [],
}


module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This ensures Tailwind scans all JS, JSX, TS, and TSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'purple-1000': '#45038b',
        'orange-1000': '  #fb7710 ',
        'teal-1000': '   #03ffd9 ', // Custom color
      },
    },
  },
  plugins: [], // Add Tailwind plugins here
};

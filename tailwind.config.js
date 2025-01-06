module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures Tailwind scans all JS, JSX, TS, and TSX files in the src folder
  ],
  theme: {
    extend: {}, // Place custom theme extensions here
  },
  plugins: [], // Add Tailwind plugins here
};
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Make sure React files are included here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
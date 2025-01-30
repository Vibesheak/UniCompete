module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This ensures Tailwind scans all JS, JSX, TS, and TSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'purple-1000': '#45038b',
        'orange-1000': '#fb7710',
        'teal-1000': '#03ffd9', // Custom color
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        fadeInText: 'fadeInText 1s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
        bounce: 'bounce 1s infinite',
        
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInText: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-50%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        bounce: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

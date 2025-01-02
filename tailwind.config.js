/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Asegúrate de que cubra las rutas correctas donde usas Tailwind
  ],
  theme: {
    extend: {
      animation: {
        trash: 'trash-close 0.5s ease-in-out',
      },
      keyframes: {
        'trash-close': {
          '0%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.8)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
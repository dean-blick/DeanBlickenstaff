/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'backgroundBlue': '#000113'
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: []
};
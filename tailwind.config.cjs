/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        9: 'repeat(9, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

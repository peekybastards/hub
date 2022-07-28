/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        "ozda": ["Ozda", "sans-serif"],
        "tella": ["Mountella Trial", "sans-serif"],
        "bwed": ["Black Wednesday", "sans-serif"]
      }
    },
  },
  plugins: [],
}

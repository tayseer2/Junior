/** @type {import('tailwindcss').Config} */
// import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        'wave': 'polygon(0 50%, 100% 80%, 100% 100%, 0 100%)',
      },
    },
  },
  plugins: [ /** daisyui */],
  // daisyui: {
  //   themes: false,
  // },
}

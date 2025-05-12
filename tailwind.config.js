/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       boxShadow: {
        'extra-thin-right': '1px 0 2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};

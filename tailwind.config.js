/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1a2231",
      },
      fontFamily: {
        cubano: ["cubano", "sans-serif"],
        gothic: ["didact gothic", "sans-serif"],
      },
    },
  },
  plugins: [],
};

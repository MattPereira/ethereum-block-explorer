/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // white: "0px 2px 15px 0px rgba(255, 255, 255, 0.5)",
      },
      fontFamily: {
        cubano: ["cubano", "sans-serif"],
        gothic: ["didact gothic", "sans-serif"],
      },
    },
  },
  plugins: [],
};

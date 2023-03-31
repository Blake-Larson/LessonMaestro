/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   "primary-light": "rgba(102, 204, 138, 0.3)",
    //   "secondary-light": "rgba(56, 135, 199, 0.1)",
    //   "accent-light": "rgba(209, 145, 51, 0.3)",
    // },
    fontFamily: {
      lemon: ["Lemonada"],
      poppins: ["Poppins"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#10b981",

          secondary: "#60a5fa",

          accent: "#f97316",

          neutral: "#333C4D",

          "base-100": "#FFFFFF",

          info: "#3ACFC2",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

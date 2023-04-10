/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
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

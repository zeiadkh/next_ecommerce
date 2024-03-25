/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f400ff",

          secondary: "#7b7900",

          accent: "#007c00",

          neutral: "#362328",

          "base-100": "#2d262f",

          info: "#0095ff",

          success: "#75c808",

          warning: "#c07300",

          error: "#ff005d",
        },
      },
    ],
  },
};

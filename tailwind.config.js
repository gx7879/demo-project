/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "main-black": "#231815",
        "error-msg": "#D60404",
        "bg-gray": "#EEEEEE",
        "logo-gray": "#5F5F5F",
        "notice-gray": "#B1B1B1",
      },
      screens: {
        sm: "576px",
        "2md": "840px",
        lg: "992px",
        "2xl": "1440px",
      },
      fontFamily: {
        sans: ["Noto Sans TC", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    function ({ addUtilities }) {
      addUtilities({
        ".underline-auto": { "text-underline-position": "auto" },
        ".underline-under": { "text-underline-position": "under" },
        ".underline-left": { "text-underline-position": "left" },
        ".underline-right": { "text-underline-position": "right" },
        ".underline-from-font": { "text-underline-position": "from-font" },
      });
    },
  ],
};

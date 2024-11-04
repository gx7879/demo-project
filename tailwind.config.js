/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [require("flowbite/plugin")],
};

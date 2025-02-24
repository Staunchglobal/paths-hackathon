import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F7F7F7",
          100: "#E5E5EA",
          200: "#A8A8B3",
          300: "#808080",
          400: "#666666",
          500: "#4D4D4D",
          600: "#333333",
          700: "#242424",
          800: "#181818",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

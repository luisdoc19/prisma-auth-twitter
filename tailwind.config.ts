import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 5px 20px 0 rgba(255, 255, 255, 0.7)",
        "4xl": "0 0 8px 0 rgba(255, 255, 255, 0.7)",
      },
      gridTemplateColumns: {
        random: "0.6fr 1.7fr 0.7fr",
        "random-2": "0.7fr 1.7fr",
        "random-3": "0.6fr 1fr 1.4fr",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

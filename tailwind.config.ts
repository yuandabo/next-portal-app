import type { Config } from "tailwindcss";
const tailwindConfig: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#0F172A", soft: "#1E293B" } },
      fontFamily: { display: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
};
export default tailwindConfig;

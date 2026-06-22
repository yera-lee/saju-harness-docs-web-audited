import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#26211f",
        paper: "#fbfaf7",
        sage: "#6f8f7c",
        rose: "#c97878",
        mist: "#eef3ef"
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";
import flowbite from "flowbite/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
  ],
};
export default config;

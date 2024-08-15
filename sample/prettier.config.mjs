import baseConfig from "../prettier.config.mjs";

export default {
  ...baseConfig,
  plugins: [require("prettier-plugin-tailwindcss")],
};

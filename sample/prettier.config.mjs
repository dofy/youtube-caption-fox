import baseConfig from '../prettier.config.mjs';
import * as prettierPluginTailwindcss from 'prettier-plugin-tailwindcss';

export default {
  ...baseConfig,
  plugins: [prettierPluginTailwindcss],
};
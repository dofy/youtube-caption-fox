import baseConfig from '../prettier.config.mjs'
import { options as tailwindcssOptions } from 'prettier-plugin-tailwindcss'

export default {
  ...baseConfig,
  plugins: [tailwindcssOptions],
}

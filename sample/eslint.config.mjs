import parentConfig from '../eslint.config.mjs'; 
import nextJsConfig from 'eslint-config-next/core-web-vitals'; 

export default [
  ...parentConfig, 
  nextJsConfig, 
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    ignores: ['sample/**'],
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },
];
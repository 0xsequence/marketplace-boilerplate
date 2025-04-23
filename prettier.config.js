/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  importOrder: [
    '^react(.*)',
    '<THIRD_PARTY_MODULES>',
    '~/(.*)',
    '$.*',
    '^[./]',
  ],
  importOrderSeparation: true,
};

export default config;

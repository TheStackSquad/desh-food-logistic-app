/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-critical-css': {
      outputPath: './public/css/',
    },
    autoprefixer: {},
    cssnano: { preset: 'default' },
  },
};

export default config;

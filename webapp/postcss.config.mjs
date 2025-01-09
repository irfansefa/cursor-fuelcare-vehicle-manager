/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'tailwindcss': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    } : {}),
  },
};

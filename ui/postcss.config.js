module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  theme: {
    container: {
      center: true,
    },
  },
};
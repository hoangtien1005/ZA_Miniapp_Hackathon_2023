module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  },
  theme: {
    extend: {
      colors: {
        'primary': '#F89945',
        'sub': '#742200',
      }
    },
  },
};

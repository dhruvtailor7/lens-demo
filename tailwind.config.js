const plugin = require('tailwindcss/plugin');
const buttons = require('./theme/buttons.json');
const anchors = require('./theme/anchors.json');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents(buttons);
      addComponents(anchors);
    })
  ]
};

/** @type {import('@bacons/apple-targets/app.plugin').ConfigFunction} */
module.exports = (config) => ({
  type: "widget",
  icon: "https://github.com/expo.png",
  entitlements: {
    /* Add entitlements */
  },
  colors: {
    primary: {
      light: "#4A90E2",
      dark: "#2E6AB2",
    },
    secondary: {
      light: "#FFC107",
      dark: "#FF8F00",
    },
  },
});

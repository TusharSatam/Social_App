module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    "react-native/no-inline-styles": 0,
    quotes: [
      "single",
      "double",
      {avoidEscape: true, allowTemplateLiterals: true},
    ],
  },
};

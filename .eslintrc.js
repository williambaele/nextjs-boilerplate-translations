module.exports = {
  env: {
    node: true,
  },
  extends: [
    "molindo/typescript",
    "molindo/react",
    "molindo/tailwind",
    "plugin:@next/next/recommended",
  ],
  rules: {
    quotes: "off",
    singleQuote: "off",
    "prettier/prettier": ["error", { endOfLine: "lf" }],
  },
  overrides: [
    {
      files: ["*.spec.tsx"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        quotes: ["error", "double", { allowTemplateLiterals: true }],
      },
    },
  ],
};

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "molindo/typescript",
    "molindo/react",
    "molindo/tailwind",
    "plugin:@next/next/recommended",
    "plugin:prettier/recommended" // Ensure this is added to extend Prettier's configuration
  ],
  rules: {
    quotes: "off",
    singleQuote: "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "spaced-comment": ["error", "always", { "exceptions": ["///"] }] // Fix for spaced-comment error
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
  ignorePatterns: [".eslintrc.js", "*"]
};

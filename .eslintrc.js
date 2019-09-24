module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalDecorators: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "lodash"],
  rules: {
    "no-undef": 2,
    semi: ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": [1, "always"],
    "operator-linebreak": [
      "error",
      "after",
      { overrides: { "?": "before", ":": "before" } }
    ],
    "no-console": ["warn", { allow: ["warn", "error", "time", "timeEnd"] }],
    "arrow-parens": ["error", "as-needed"],
    "no-mixed-operators": 0,
    "no-unused-vars": 1,
    "prefer-const": 2,
    "no-shadow": "error",
    "react/jsx-no-undef": 2,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "no-redeclare": 2
  },
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  globals: {
    __dirname: true,
    Buffer: true,
    process: true,
    module: true
  }
};

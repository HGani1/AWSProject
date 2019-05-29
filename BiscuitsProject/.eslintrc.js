module.exports = {
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      ecmaFeatures: {
        impliedStrict: true
      }
    },
    parser: "@typescript-eslint/parser",
    env: {
      node: true,
      es6: true,
      jest: true,
      mocha: true
    },
    plugins: [
      "@typescript-eslint"
    ],
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    rules: {
      "no-console": 0,
      "prefer-const": 1,
      "sort-imports": 1,
      "@typescript-eslint/no-unused-vars": 1
    }
  };
  
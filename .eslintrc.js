module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["jest"],
  ignorePatterns: ["**/public/*"],
  rules: {
    "no-console": "error",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
  },
};

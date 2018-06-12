module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react'],
  rules: {
    semi: ['warn', 'always'],
    'no-console': 0,
    'no-unused-vars': 0,
    'no-debugger': 0
  }
};

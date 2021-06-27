module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'import/extensions': ['error', 'never', {
      js: 'never',
      vue: 'never',
    }],
    semi: [
      'error',
      'never',
    ],
    'prefer-destructuring': 0,
    camelcase: 0,
  },
}

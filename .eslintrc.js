module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    quotes: 'off',
    'no-trailing-spaces': 'off',
    'key-spacing': 'off',
    'no-unused-vars': 'off',
    'spaced-comment': 'off',
    'vue/multi-word-component-names': 'off',
    ' semi': 'off'
  }
}

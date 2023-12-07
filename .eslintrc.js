module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 'off',
    'linebreak-style': ['off', 'windows'],
    'react/jsx-props-no-spreading': 'off', // disable "Prop spreading is forbidden"
    'react/function-component-definition': 'off', // disable "Function component is not a function declaration"
    'arrow-parens': 'off', // disable "Expected parentheses around arrow function argument"
    'func-names': 'off', // disable "Function component is not a function declaration"
    'object-curly-newline': 'off', // disable "Expected a line break after this opening brace"
    'implicit-arrow-linebreak': 'off', // disable "Expected linebreaks to be 'LF' but found 'CRLF'"
  },
};

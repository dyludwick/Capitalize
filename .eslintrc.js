module.exports = {
  parser: 'babel-eslint',
  extends: ['standard'],
  plugins: ['import'],
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  rules: {
    'semi': ['error', 'always'],
    'space-before-function-paren': ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    // 'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    // 'implicit-arrow-linebreak': 'off',
    // 'comma-dangle': 'off',
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ]
  }
};
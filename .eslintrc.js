const {
  boundariesSettings,
  boundariesRules,
} = require('./.eslintrc.boundaries');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/eslint-plugin', 'boundaries', 'import'],
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:boundaries/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.*'],
  rules: {
    "@typescript-eslint/no-unused-vars": 'off',
    "no-unused-vars": 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/test/**/*.ts', '**/*.spec.ts', '**/*.int-spec.ts'] },
    ],
    'class-methods-use-this': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/default': 'off',
    ...boundariesRules,
  },
  settings: {
    ...boundariesSettings,
  },
};

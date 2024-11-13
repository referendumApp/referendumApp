module.exports = {
  root: true,
  plugins: ['import', 'jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    curly: ['error', 'multi-line'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@*/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    'import/internal-regex': '^@/',
  },
  extends: ['@react-native', 'plugin:jest/recommended'],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.husky.',
    'ios/',
    'android/',
    '.git/',
    '.expo/',
    '.bundle/',
    '*.test.js',
  ],
};

module.exports = {
  root: true,
  plugins: ['import'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          // {
          //   pattern: 'react',
          //   group: 'external',
          //   position: 'before',
          // },
          // {
          //   pattern: '[a-z]*',
          //   group: 'external',
          //   position: 'before',
          // },
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
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    'import/internal-regex': '^@/',
  },
  extends: '@react-native',
};

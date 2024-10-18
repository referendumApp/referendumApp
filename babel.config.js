module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:@react-native/babel-preset',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@app-state': './src/app-state',
            '@features': './src/features',
            '@styles': './src/styles',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@configs': './src/configs',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@features': './src/features',
            '@styles': './src/styles',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};

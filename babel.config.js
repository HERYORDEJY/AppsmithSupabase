module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          // This has to be mirrored in tsconfig.json
          '^~/(.+)': './src/\\1',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

module.exports = api => {
  api.cache.never()
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'babel-plugin-styled-components',
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            assets: './app/assets',
            components: './app/components',
            config: './app/config',
            lib: './app/lib',
            models: './app/models',
            navigation: './app/navigation',
            screens: './app/screens',
            services: './app/services',
            store: './app/store',
            utils: './app/utils',
          },
        },
      ],
    ],
  }
}

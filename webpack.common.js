const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    main: './app/javascript/rsql/main.js',
  },
  output: {
    path: path.resolve(__dirname, './app/assets/javascripts/rsql'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue'],
  },
  plugins: [new VueLoaderPlugin()],
}

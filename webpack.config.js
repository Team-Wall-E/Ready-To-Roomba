module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      }
    ]
  },
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      assert: require.resolve("assert/"),
      crypto: require.resolve("crypto-browserify"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      zlib: require.resolve("browserify-zlib")
    }
  }
}
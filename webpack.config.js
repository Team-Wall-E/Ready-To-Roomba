const path = require('path');

// module.exports = {
//   entry: ['./client/index.js'],
//   // output: {
//   //   path: __dirname,
//   //   filename: './public/bundle.js',
//   // },
//   // entry: path.resolve(__dirname, 'src/index.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].bundle.js',
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-react'],
//         },
//       },
//     ],
//   },
//   optimization: {
//     splitChunks: {
//       chunks: 'all',
//     },
//   },
// };

module.exports = {
  entry: {
    main: path.resolve(__dirname, './client/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/public',
  devtool: debug ? "inline-sourcemap" : "eval",
  entry: [
    "./index.js"
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: {
            presets: ['react', 'es2015'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
          }
        }
      }
    ]
  },
  output: {
    path: __dirname + "/js",
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};
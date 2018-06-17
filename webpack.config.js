var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals')

var path = require('path');
var libraryName = 'exp2slack';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/index.js',
  devtool: 'source-map',
  target: "node",
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};

module.exports = config;
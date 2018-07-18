const path = require('path');
const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let entry;
let filename;
switch(process.env.page) {
  case 'solar':
    entry = './js/entry/solar-entry.js';
    filename = 'solar.min.js';
    break;
  case 'static':
    entry = './js/entry/static-pages-entry.js';
    filename = 'static-pages.min.js';
    break;
  case 'usenergy':
    entry = './js/entry/us-energy.js';
    filename = 'us-energy.min.js';
    break;
  case 'stateenergy':
    entry = './js/entry/state-energy-profile.js';
    filename = 'state-energy.min.js';
    break;
  case 'footprint':
    entry = './js/entry/footprint-entry.js';
    filename = 'footprint.min.js';
    break;
  case 'results':
    entry = './js/entry/footprint-results-entry.js';
    filename = 'footprint-results.min.js';
    break;
  case 'pages':
    entry = './js/entry/static-pages-entry.js';
    filename = 'static-pages.min.js';
    break;
  case 'costs':
    entry = './js/entry/costs-pages-entry.js';
    filename = 'costs-pages.min.js';
    break;
  default: //defaults to solar
    entry = './js/entry/solar-entry.js';
    filename = 'solar.min.js';
}

module.exports = {
  context: __dirname + "/src",
  devtool: debug ? "inline-sourcemap" : null,
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },
  entry: entry,
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2017', 'env', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: filename //"energy.min.js"  //scripts.min.js for widget // homepage.min.js // energy.min.js
  },
  plugins: debug ? [
    //new BundleAnalyzerPlugin() // default port is 8888
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

require('@babel/polyfill');
const path = require('path');
const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let entry;
let filename;
switch(process.env.page) {
  case 'test':
    entry = './js/entry/test-entry.js';
    filename = 'test.min.js';
    break;
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
  devtool: debug ? "inline-sourcemap" : false,
  mode: debug ? "development" : "prodution",
  entry: entry,
  output: {
    path: __dirname + "/public/",
    filename: filename //"energy.min.js"  //scripts.min.js for widget // homepage.min.js // energy.min.js
  },
  module: {
    rules: [{
      loader: "babel-loader",
      exclude: /(node_modules|bower_components)/,
      options: {
        // Moved to .babelrc where they work better. . . no idea why
        presets: [],
        plugins: []
      },
    }]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', ".json", ".css"]
  },

  optimization: debug ?
    {} : {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  
  // No plugins right now
  // plugins: {}
};

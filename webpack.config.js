const path = require('path');
const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

let entry;
let filename;
switch(process.env.page) {
  case 'solar':
    entry = './js/client.js';
    filename = 'scripts.min.js';
    break;
  case 'home':
    entry = './js/homepage-entry.js';
    filename = 'homepage.min.js';
    break;
  case 'usenergy':
    entry = './js/us-energy.js';
    filename = 'us-energy.min.js';
    break;
  case 'stateenergy':
    entry = './js/state-energy-profile.js';
    filename = 'state-energy.min.js';
    break;
  case 'footprint':
    entry = './js/footprint-entry.js';
    filename = 'footprint.min.js';
    break;
  case 'pages':
    entry = './js/static-pages-entry.js';
    filename = 'static-pages.min.js';
    break;
  default: //defaults to solar
    entry = './js/client.js';
    filename = 'scripts.min.js';
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
  entry: entry, //"./js/state-energy-profile.js", // ./js/client.js for widget  //./js/homepage-entry.js for homepage  // ./js/state-energy-profile.js for state energy profile
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
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

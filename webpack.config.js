
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
  case 'energy':
    entry = './js/state-energy-profile.js';
    filename = 'energy.min.js';
    break;
  default: //defaults to solar
    entry = './js/client.js';
    filename = 'scripts.min.js';
}

module.exports = {
  context: __dirname + "/src",
  devtool: debug ? "inline-sourcemap" : null,
  entry: entry, //"./js/state-energy-profile.js", // ./js/client.js for widget  //./js/homepage-entry.js for homepage  // ./js/state-energy-profile.js for state energy profile
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
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

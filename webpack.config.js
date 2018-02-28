const path = require('path');

module.exports = {
  entry: './js/card.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'card.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  }
};

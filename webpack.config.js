const path = require("path");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./js/card.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "card.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env", "stage-0"]
        }
      }
    ]
  }
};

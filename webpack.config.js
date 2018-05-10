const path = require("path");

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const basicConfig = {
  entry: {
    vendor:'./src/js/vendor.js',
    index: "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets/js/"),
    publicPath: "/dist/assets/",
    filename: "[name].bundle.js"
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

if (!dev) {
  basicConfig.mode = 'production'
} else {
  basicConfig.mode = 'development'
  basicConfig.devtool = "inline-source-map";
}

module.exports = basicConfig;
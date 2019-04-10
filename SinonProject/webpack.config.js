var nodeExternals = require("webpack-node-externals");
var path = require("path");


module.exports = {
  entry: {
  },
  target: "node",
  watch: false,
  externals: [nodeExternals({ modulesFromFile: true })],
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js" // this should match the first part of function handler in serverless.yml
  },
  stats: "minimal",
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-es2015"]
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.twig$/,
        use: {
          loader: "twig-loader"
        }
      }
    ]
  }
};

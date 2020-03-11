const path = require('path');
const webpack = require('webpack');
const InertEntryPlugin = require('inert-entry-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ASSET_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

const manifest_filename = path.join(__dirname, "src", "manifest.json")

module.exports = {
  entry: manifest_filename,
  output: {
    filename: "manifest.json",
    path: path.join(__dirname, "dist", "extension", "maoxian-web-clipper")
  },
  module: {
    rules: [
      {
        test: manifest_filename,
        use: [
          'extract-loader',
          'interpolate-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              attrs: [
                'link:href',
                //'script:src',
                'img:src'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'file-loader',
          'extract-loader',
          'css-loader',
        ]
      },
      {
        test: new RegExp('\.(' + ASSET_EXTENSIONS.join('|') + ')$'),
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }
      },
    ]
  },
  plugins: [
    // This is required to use manifest.json as the entry point.
    new InertEntryPlugin(),
    // Clean dist/extension/maoxian-web-clipper in every build.
    new CleanWebpackPlugin()
  ],
}
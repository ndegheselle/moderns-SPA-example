import path from 'node:path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin  from 'mini-css-extract-plugin'
import {VueLoaderPlugin} from 'vue-loader'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: './front/main.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [  { loader: MiniCssExtractPlugin.loader }, { 
          loader: 'css-loader',
          options: {
            url: false
          }
        }, "sass-loader"]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "styles.css",
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
  },
};
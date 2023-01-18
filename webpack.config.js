import path from 'node:path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin  from 'mini-css-extract-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [  { loader: MiniCssExtractPlugin.loader }, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "styles.css",
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
  },
};
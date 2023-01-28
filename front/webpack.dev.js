import path from 'node:path'
import { fileURLToPath } from 'url'

import { merge } from 'webpack-merge'
import common from'./webpack.common.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(common, {
    mode: 'development',
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        port: 9000,
    },
});
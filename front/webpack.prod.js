import { merge } from 'webpack-merge'
import common from './webpack.common.js'

import glob from 'glob-all'
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin'

export default merge(common, {
  mode: 'production',
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync([`./front/**/*.vue`, `./public/*.html`], { nodir: true }),
      safelist: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/
      ],
    })
  ]
});
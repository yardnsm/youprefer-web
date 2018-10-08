/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';
import merge from 'webpack-merge';
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'production',

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' },
    ]),

    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/sw.js'),
    }),
  ],
});

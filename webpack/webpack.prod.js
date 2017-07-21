/* eslint import/no-extraneous-dependencies: "off" */
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import commonConfig from './webpack.common';

export default merge(commonConfig, {
  // Custom config goes here
  // We're using the `-p` flag so k.

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
  ],
});

/* eslint import/no-extraneous-dependencies: "off" */
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'production',

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' },
    ]),
  ],
});

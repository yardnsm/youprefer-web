/* eslint import/no-extraneous-dependencies: "off" */
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'development',

  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],

  devtool: 'eval-source-map',
});

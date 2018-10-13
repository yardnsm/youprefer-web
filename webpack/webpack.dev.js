/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'development',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'source-maps',

  devServer: {
    contentBase: path.join(__dirname, '../public'),
    hot: true,
    historyApiFallback: true,
  },
});

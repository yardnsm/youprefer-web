/* eslint import/no-extraneous-dependencies: "off" */
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

const httpsCert = fs.readFileSync(path.resolve(__dirname, '../ssl/server.pem'));

export default merge(commonConfig, {

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  devtool: 'source-maps',

  devServer: {
    contentBase: path.join(__dirname, '../public'),
    hot: true,
    historyApiFallback: true,

    https: {
      cert: httpsCert,
      key: httpsCert,
    },
  },
});

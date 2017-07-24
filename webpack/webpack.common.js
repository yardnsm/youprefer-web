/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Shared config (for both production and development)
 */
export default {
  entry: [
    'react-hot-loader/patch',
    './src',
  ],

  output: {
    filename: '[name].bundle.[hash:6].js',
    chunkFilename: '[name].chunk.[hash:6].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', {
              modules: false,
            }],
            'react',
            'stage-3',
          ],
          plugins: ['react-hot-loader/babel'],
        },
      },
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      __DEV__: !isProduction,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../templates/index.ejs'),
      minify: {
        minifyCSS: true,
        minifyJS: true,
      },
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

// Configs
import appConfig from '../src/config/app-config';

const isProduction = process.env.NODE_ENV === 'production';

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
            ['@babel/env', {
              modules: false,
            }],
            '@babel/react',
          ],
          plugins: [
            'react-hot-loader/babel',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    },
    {
      test: /\.ejs$/i,
      loader: 'html-loader',
      options: {
        sources: false,
      },
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      __DEV__: !isProduction,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../templates/index.ejs'),
      minify: {
        minifyCSS: true,
        minifyJS: true,
      },
      templateParameters: {
        // Make the appConfig available in the template
        appConfig,
      },
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,

      cacheGroups: {
        vendor: {
          test: /node_modules/,
          priority: -10,
        },

        default: {
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

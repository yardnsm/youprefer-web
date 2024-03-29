/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Configs
import appConfig from '../src/config/app-config';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Shared config (for both production and development)
 */
export default {
  entry: [
    './src',
  ],

  output: {
    filename: '[name].bundle.[fullhash:6].js',
    chunkFilename: '[name].chunk.[fullhash:6].js',
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
            !isProduction ? require.resolve('react-refresh/babel') : null,
            '@babel/plugin-proposal-class-properties',
          ].filter(Boolean),
        },
      },
    },
    {
      test: /\.html$/i,
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
  ],

  devServer: {
    static: path.join(__dirname, '../public'),
    hot: true,
    historyApiFallback: true,
  },

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

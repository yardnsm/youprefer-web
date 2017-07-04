import path from 'path';
import webpack from 'webpack';

export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Shared config (for both production and development)
 */
const common = {
  entry: [
    './src',
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets',
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
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

/**
 * Development-specific config (HMR and stuff)
 */
const dev = {
  ...common,

  entry: [
    'react-hot-loader/patch',
  ].concat(common.entry),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ].concat(common.plugins),

  devtool: 'source-maps',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    historyApiFallback: true,
  },
};

/**
 * Production-specific config
 */
const prod = {
  ...common,

  // ...
};

// ------------------------------------------

export default isProduction ? prod : dev;

/* eslint import/no-extraneous-dependencies: "off" */
import path from 'path';

export default {
  mode: 'production',

  entry: [
    './index.js',
  ],

  output: {
    filename: 'index.dist.js',
    path: path.resolve(__dirname),
  },

  externalsType: 'commonjs',
  externals: {
    path: 'path',
    fs: 'fs',
    jsdom: 'jsdom',
    'firebase-admin': 'firebase-admin',
    'firebase-functions': 'firebase-functions',
  },

  node: {
    __dirname: false,
  },
};

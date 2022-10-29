/* eslint import/no-extraneous-dependencies: "off" */
import merge from 'webpack-merge';
import WorkboxPlugin from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'production',

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        'public',
      ],
    }),

    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,

      navigateFallback: '/index.html',
    }),
  ],
});

/* eslint global-require: "off", import/no-dynamic-require: "off" */

// Making sure the `app-config.js` file is requireable.
try {
  require('./src/config/app-config');
} catch (e) {
  throw new Error('Unable to resolve `app-config.js`. Make sure it exists and filled properly.');
}


export default env =>
  require(`./webpack/webpack.${env}.js`);

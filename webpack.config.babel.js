/* eslint global-require: "off", import/no-dynamic-require: "off" */
export default env =>
  require(`./webpack/webpack.${env}.js`);

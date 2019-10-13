/**
 * YouPrefer Application Config File
 * app-config.sample.js
 *
 * This is a configuration file for 3rd party services that this application
 * uses.
 *
 * Copy this sample file and change its name to `app-config.js`, retreive the
 * required configuration info and update this file accordingly. Make sure
 * to not track this file in your VCS, as it may contain sensitive
 * information.
 *
 * You can find more "configuration" in the `./strings.jsx` key. I'm too lazy
 * to move some the stuff from there to here.
 *
 * - ԅ(≖‿≖ԅ)
 *
 */

export default {

  // Base config
  appName: 'YouPrefer',
  version: 'v1.0.0',
  rootUrl: 'https://youprefer.co.il',
  serviceWorkerUrl: '/sw.js',
  supportEmail: 'support@youprefer.co.il',
  androidAppUrl: 'https://play.google.com/store/apps/details?id=com.yardnsm.youprefer',

  // Config for Firebase
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
  },

  // Config for Adsense
  adsense: {
    client: 'ca-pub-XXXXXXXXXXXXXXXX',
    slot: 'XXXXXXXXXX',
  },

  // Config for Google Analytics
  analytics: {
    trackingId: 'UA-XXXXXXXX-X',
  },
};

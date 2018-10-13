import React from 'react';
import config from '../config/app-config';
import AdsenseAd from '../components/AdsenseAd';

const adsenseConfig = config.adsense;

const AdsenseAdContainer = () => (
  <AdsenseAd
    client={adsenseConfig.client}
    slot={adsenseConfig.slot}
    format="auto"
  />
);

export default AdsenseAdContainer;

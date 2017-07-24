import React from 'react';
import adsenseConfig from '../config/adsense';
import AdsenseAd from '../components/AdsenseAd';

const AdsenseAdContainer = () => (
  <AdsenseAd
    client={adsenseConfig.client}
    slot={adsenseConfig.slot}
    format="auto"
  />
);

export default AdsenseAdContainer;

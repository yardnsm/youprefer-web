import React from 'react';
import config from '../config/app-config';
import AdsenseAd from '../components/AdsenseAd';

const { client, slot } = config.adsense;

const AdsenseAdContainer = () => (
  <AdsenseAd
    client={client}
    slot={slot}
    format="auto"
  />
);

export default AdsenseAdContainer;

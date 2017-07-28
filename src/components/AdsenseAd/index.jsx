import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AdWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const Ad = styled.ins`
  display: inline-block;
  width: 320px;
  height: 100px;

  @media(min-width: 500px) { width: 468px; height: 60px; }
  @media(min-width: 800px) { width: 728px; height: 90px; }
`;

class AdsenseAd extends React.Component {

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    const { client, slot, format } = this.props;

    return (
      <AdWrapper>
        <Ad
          className="adsbygoogle"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
        />
      </AdWrapper>
    );
  }
}

AdsenseAd.propTypes = {
  client: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
};

export default AdsenseAd;

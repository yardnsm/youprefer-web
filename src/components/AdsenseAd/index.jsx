import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AdWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
`;

const Ad = styled.ins`
  display: inline-block;
  min-width:400px;max-width:970px;width:100%;height:90px
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

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  navigationButtonsPrev,
  navigationButtonsNext,
} from '../../../../config/strings';

import FlatButton from '../../../../components/FlatButton';

const NavigationButtonsWrapper = styled.div`
  padding: 5px 10px;
  margin: 20px 0;
  height: auto;
  box-sizing: border-box;
  display: flex;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavigationButtons = ({ handlePrevClick, showPrev, handleNextClick, showNext }) => (
  <NavigationButtonsWrapper>
    <FlatButton
      text={navigationButtonsPrev}
      handleClick={handlePrevClick}
      fullWidth
      hidden={!showPrev}
    />

    <FlatButton
      text={navigationButtonsNext}
      handleClick={handleNextClick}
      fullWidth
      hidden={!showNext}
    />
  </NavigationButtonsWrapper>
);

NavigationButtons.propTypes = {
  handlePrevClick: PropTypes.func.isRequired,
  showPrev: PropTypes.bool.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  showNext: PropTypes.bool.isRequired,
};

export default NavigationButtons;

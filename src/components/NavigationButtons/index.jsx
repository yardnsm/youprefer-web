import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  navigationButtonsPrev,
  navigationButtonsNext,
} from '../../config/strings';

import Button from '../Button';

const Wrapper = styled.div`
  display: flex;

  padding: 5px 10px;
  margin: 20px 0;

  height: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavigationButtons = ({
  onPrevClick, showPrev, onNextClick, showNext,
}) => (
  <Wrapper>
    <Button
      onClick={onPrevClick}
      fullWidth
      hidden={!showPrev}
    >
      {navigationButtonsPrev}
    </Button>

    <Button
      onClick={onNextClick}
      fullWidth
      hidden={!showNext}
    >
      {navigationButtonsNext}
    </Button>
  </Wrapper>
);

NavigationButtons.propTypes = {
  onPrevClick: PropTypes.func.isRequired,
  showPrev: PropTypes.bool.isRequired,
  onNextClick: PropTypes.func.isRequired,
  showNext: PropTypes.bool.isRequired,
};

export default NavigationButtons;

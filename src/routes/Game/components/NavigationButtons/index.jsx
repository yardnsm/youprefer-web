import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlatButton from '../../../../components/FlatButton';

const NavigationButtonsWrapper = styled.div`
  padding: 5px 20px;
  margin: 20px;
  height: auto;
  box-sizing: border-box;
  display: flex;
`;

const NavigationButtons = ({ handlePrevClick, showPrev, handleNextClick, showNext }) => (
  <NavigationButtonsWrapper>
    <FlatButton
      text={'אחורה'}
      handleClick={handlePrevClick}
      fullWidth
      hidden={!showPrev}
    />

    <FlatButton
      text={'קדימה'}
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

import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';
import FlatButton from '../../../../components/FlatButton';

const NavigationButtons = ({ classes, handlePrevClick, showPrev, handleNextClick, showNext }) =>
  <div className={classes.navigationButtonsWrapper}>
    <FlatButton
      text={'אחורה'}
      handleClick={handlePrevClick}
      fullWidth={true}
      hidden={!showPrev} />

    <FlatButton
      text={'קדימה'}
      handleClick={handleNextClick}
      fullWidth={true}
      hidden={!showNext} />
  </div>;

NavigationButtons.propTypes = {
  handlePrevClick: PropTypes.func,
  showPrev: PropTypes.bool,
  handleNextClick: PropTypes.func,
  showNext: PropTypes.bool,
};

export default injectSheet(styles)(NavigationButtons);
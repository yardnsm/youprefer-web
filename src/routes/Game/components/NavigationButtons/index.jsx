import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';
import FlatButton from '../../../../components/FlatButton';

const NavigationButtons = ({ classes, handlePrevClick, showPrev, handleNextClick, showNext }) => (
  <div className={classes.navigationButtonsWrapper}>
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
  </div>
);

NavigationButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  showPrev: PropTypes.bool.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  showNext: PropTypes.bool.isRequired,
};

export default injectSheet(styles)(NavigationButtons);

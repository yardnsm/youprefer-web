import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const FlatButton = ({ classes, text, fullWidth, hidden, handleClick }) => (
  <button
    className={classNames(classes.flatButton, {
      fullWidth,
      hidden,
    })}
    onClick={handleClick}
  >
    {text}
  </button>
);

FlatButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default injectSheet(styles)(FlatButton);

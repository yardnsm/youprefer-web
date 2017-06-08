import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const FlatButton = ({ classes, text, fullWidth, hidden, handleClick }) =>
  <button
    className={classNames(classes.flatButton, {
      'fullWidth': fullWidth,
      'hidden': hidden,
    })}
    onClick={handleClick}>
    {text}
  </button>;

FlatButton.propTypes = {
  text: PropTypes.string,
  fullWidth: PropTypes.bool,
  hidden: PropTypes.bool,
  handleClick: PropTypes.func
};

export default injectSheet(styles)(FlatButton);
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const MenuItem = ({ classes, iconClassName, text, handleClick }) =>
  <a className={classes.menuItem} onClick={handleClick}>
    <i className="material-icons">{iconClassName}</i>
    <span>{text}</span>
  </a>;

MenuItem.propTypes = {
  iconClassName: PropTypes.string,
  text: PropTypes.string,
  handleClick: PropTypes.func
};

export default injectSheet(styles)(MenuItem);
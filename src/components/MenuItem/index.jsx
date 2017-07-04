import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const MenuItem = ({ classes, iconClassName, text, handleClick }) => (
  <a className={classes.menuItem} onClick={handleClick}>
    <i className="material-icons">{iconClassName}</i>
    <span>{text}</span>
  </a>
);

MenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  iconClassName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default injectSheet(styles)(MenuItem);

import React from 'react';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const Menu = ({ classes, children }) =>
  <nav className={classes.menu}>
    {children}
  </nav>;

export default injectSheet(styles)(Menu);
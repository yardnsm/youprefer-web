import React from 'react';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const Divider = ({ classes }) =>
  <hr className={classes.divider} />;

export default injectSheet(styles)(Divider);
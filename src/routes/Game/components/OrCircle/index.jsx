import React from 'react';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const OrCircle = ({ classes }) =>
  <div className={classes.orCircle}>
    <span>או</span>
  </div>;

export default injectSheet(styles)(OrCircle);
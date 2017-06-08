import React from 'react';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const DrawerHeader = ({ classes, handleDrawerOpen }) =>
  <div className={classes.drawerHeader}>
    <div className={classes.drawerHeaderInner}></div>
    <img src='assets/img/question_circle.png' className={classes.questionCircleImg} />
  </div>;

export default injectSheet(styles)(DrawerHeader);
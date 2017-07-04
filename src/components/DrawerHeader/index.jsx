import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const DrawerHeader = ({ classes }) => (
  <div className={classes.drawerHeader}>
    <div className={classes.drawerHeaderInner} />
    <img
      src="assets/img/question_circle.png"
      alt="logo"
      className={classes.questionCircleImg}
    />
  </div>
);

DrawerHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(DrawerHeader);

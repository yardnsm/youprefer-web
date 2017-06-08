import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const Drawer = ({ classes, children, open, handleDrawerClose }) =>
  <aside className={classNames(classes.drawer, {
    [classes.drawer_open]: open
  })}>

    <div className={classes.drawerOverlay} onClick={handleDrawerClose} />

    <div className={classes.drawerInner}>
      {children}
    </div>
  </aside>;

Drawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func
};

export default injectSheet(styles)(Drawer);
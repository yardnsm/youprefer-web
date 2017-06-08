import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const Toolbar = ({ classes, rightElement, leftElement }) =>
  <header className={classes.toolbar}>
    <div className={classes.toolbarRow}>
      <div className={classes.toolbarRowInner}>
        {rightElement}
        <div className={classes.toolbarRowSeperator} />
        {leftElement}
      </div>
    </div>
  </header>;

Toolbar.propTypes = {
  rightElement: PropTypes.object,
  leftElement: PropTypes.object
};

export default injectSheet(styles)(Toolbar);
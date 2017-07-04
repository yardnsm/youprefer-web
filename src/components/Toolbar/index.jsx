import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const Toolbar = ({ classes, rightElement, leftElement }) => (
  <header className={classes.toolbar}>
    <div className={classes.toolbarRow}>
      <div className={classes.toolbarRowInner}>
        {rightElement}
        <div className={classes.toolbarRowSeperator} />
        {leftElement}
      </div>
    </div>
  </header>
);

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  rightElement: PropTypes.node.isRequired,
  leftElement: PropTypes.node.isRequired,
};

export default injectSheet(styles)(Toolbar);

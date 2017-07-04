import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const Menu = ({ classes, children }) => (
  <nav className={classes.menu}>
    {children}
  </nav>
);

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default injectSheet(styles)(Menu);

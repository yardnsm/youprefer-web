import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const OrCircle = ({ classes }) =>
  (<div className={classes.orCircle}>
    <span>או</span>
  </div>);

OrCircle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(OrCircle);

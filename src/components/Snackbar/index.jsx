import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const Snackbar = ({ classes, message, action }) =>
  <div className={classes.snackbar}>
    <span>{message}</span>
    {action.text && (
      <a
        className={classes.snackbarActionButton}
        onClick={action.callback}>
          {action.text}
      </a>
    )}
  </div>;

Snackbar.propTypes = {
  message: PropTypes.string,
  action: PropTypes.object
};

export default injectSheet(styles)(Snackbar);

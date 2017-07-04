import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const IconButton = ({ classes, iconClassName, handleClick }) => (
  <a
    onClick={handleClick}
    className={classNames(classes.iconButton, 'material-icons')}
  >
    {iconClassName}
  </a>
);

IconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  iconClassName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

IconButton.defaultProps = {
  handleClick: () => {},
};

export default injectSheet(styles)(IconButton);

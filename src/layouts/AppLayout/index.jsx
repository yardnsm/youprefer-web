import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

import ToolbarContainer from '../../containers/ToolbarContainer';
import DrawerContainer from '../../containers/DrawerContainer';
import SnackbarContainer from '../../containers/SnackbarContainer';

const AppLayout = ({ classes, children }) => (
  <div className={classes.main}>

    <ToolbarContainer />
    <DrawerContainer />

    <div className={classes.wrapper}>
      {children}
    </div>

    <SnackbarContainer />
  </div>
);

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default injectSheet(styles)(AppLayout);

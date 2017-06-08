import React from 'react';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

import ToolbarContainer from '../../containers/ToolbarContainer';
import DrawerContainer from '../../containers/DrawerContainer';
import SnackbarContainer from '../../containers/SnackbarContainer';

class AppLayout extends React.Component {
  constructor() {
    super();
  }

  render() {

    const { classes, children } = this.props;

    return (
      <div className={classes.main}>

      <ToolbarContainer />
      <DrawerContainer />

        <div className={classes.wrapper}>
          {children}
        </div>

        <SnackbarContainer />
      </div>
    );
  }
}

export default injectSheet(styles)(AppLayout);

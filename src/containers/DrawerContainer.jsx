import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';

import Drawer from '../components/Drawer';
import DrawerHeader from '../components/DrawerHeader';
import Menu from '../components/Menu';
import MenuItem from '../components/MenuItem';
import Divider from '../components/Divider';

const mapStateToProps = ({ ui: { drawerToggled } }) => ({
  drawerToggled,
});

const mapDispatchToProps = dispatch => ({
  handleDrawerClose: () => { dispatch(uiActions.hideDrawer()); },
  showAboutDialog: () => { dispatch(uiActions.showAboutDialog()); },
});

const DrawerContainer = ({ drawerToggled, handleDrawerClose, showAboutDialog }) => (
  <Drawer open={drawerToggled} handleDrawerClose={handleDrawerClose}>
    <DrawerHeader />

    <Menu>
      <MenuItem
        iconClassName="send"
        text="הצע שאלות"
        handleClick={() => {
          window.open('mailto:support@youprefer.co.il');
        }}
      />

      <MenuItem
        iconClassName="get_app"
        text="הורד את האפליקציה"
        handleClick={() => {
          window.open('https://play.google.com/store/apps/details?id=com.yardnsm.youprefer');
        }}
      />

      <Divider />

      <MenuItem
        iconClassName="info"
        text="אודות"
        handleClick={() => {
          handleDrawerClose();
          showAboutDialog();
        }}
      />
    </Menu>
  </Drawer>
);

DrawerContainer.propTypes = {
  drawerToggled: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';

import {
  sendQuestionsUrl,
  androidAppUrl,
  drawerSendQuestions,
  drawerGetTheApp,
  drawerAbout,
} from '../config/strings';

import Drawer from '../components/Drawer';
import LogoHeader from '../components/LogoHeader';
import Menu from '../components/Menu';
import MenuItem from '../components/MenuItem';
import Divider from '../components/Divider';

const mapStateToProps = ({ ui: { drawerToggled } }) => ({
  drawerToggled,
});

const mapDispatchToProps = dispatch => ({
  onDrawerClose: () => { dispatch(uiActions.hideDrawer()); },
  showAboutDialog: () => { dispatch(uiActions.showAboutDialog()); },
});

const DrawerContainer = ({ drawerToggled, onDrawerClose, showAboutDialog }) => (
  <Drawer open={drawerToggled} onDrawerClose={onDrawerClose}>
    <LogoHeader />

    <Menu>
      <MenuItem
        iconClassName="send"
        onClick={() => {
          window.open(sendQuestionsUrl);
        }}
      >
        {drawerSendQuestions}
      </MenuItem>

      <MenuItem
        iconClassName="get_app"
        onClick={() => {
          window.open(androidAppUrl);
        }}
      >
        {drawerGetTheApp}
      </MenuItem>

      <Divider />

      <MenuItem
        iconClassName="info"
        onClick={() => {
          onDrawerClose();
          showAboutDialog();
        }}
      >
        {drawerAbout}
      </MenuItem>
    </Menu>
  </Drawer>
);

DrawerContainer.propTypes = {
  drawerToggled: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  showAboutDialog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);

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
import Icon from '../components/Icon';
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
        onClick={() => {
          window.open(sendQuestionsUrl);
        }}
      >
        <Icon>send</Icon>
        {drawerSendQuestions}
      </MenuItem>

      <MenuItem
        onClick={() => {
          window.open(androidAppUrl);
        }}
      >
        <Icon>get_app</Icon>
        {drawerGetTheApp}
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={() => {
          onDrawerClose();
          showAboutDialog();
        }}
      >
        <Icon>info</Icon>
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

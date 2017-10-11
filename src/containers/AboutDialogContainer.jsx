import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';

import {
  version,
  dialogClose,
  gameTitle,
  aboutDialogContents,
} from '../config/strings';

import Dialog from '../components/Dialog';
import DrawerHeader from '../components/DrawerHeader';
import DialogTitle from '../components/DialogTitle';
import DialogContent from '../components/DialogContent';
import DialogActions from '../components/DialogActions';
import Button from '../components/Button';

const mapStateToProps = ({ ui: { aboutDialogToggled } }) => ({
  aboutDialogToggled,
});

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => { dispatch(uiActions.hideAboutDialog()); },
});

const AboutDialogContainer = ({ aboutDialogToggled, handleDialogClose }) => (
  <Dialog open={aboutDialogToggled} handleDialogClose={handleDialogClose}>

    <DrawerHeader height="100px" />

    <DialogTitle>{gameTitle}</DialogTitle>

    <DialogContent>
      {aboutDialogContents()}

      <br />
      <em>{version}</em>
    </DialogContent>

    <DialogActions>
      <Button text={dialogClose} compact textColor="#000000" handleClick={handleDialogClose} />
    </DialogActions>

  </Dialog>
);

AboutDialogContainer.propTypes = {
  aboutDialogToggled: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutDialogContainer);

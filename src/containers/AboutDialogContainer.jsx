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
import LogoHeader from '../components/LogoHeader';
import DialogTitle from '../components/DialogTitle';
import DialogContent from '../components/DialogContent';
import DialogActions from '../components/DialogActions';
import Button from '../components/Button';

const mapStateToProps = ({ ui: { aboutDialogToggled } }) => ({
  aboutDialogToggled,
});

const mapDispatchToProps = dispatch => ({
  onDialogClose: () => { dispatch(uiActions.hideAboutDialog()); },
});

const AboutDialogContainer = ({ aboutDialogToggled, onDialogClose }) => (
  <Dialog open={aboutDialogToggled} onDialogClose={onDialogClose}>

    <LogoHeader height="100px" />

    <DialogTitle>{gameTitle}</DialogTitle>

    <DialogContent>
      {aboutDialogContents()}

      <br />
      <em>{version}</em>
    </DialogContent>

    <DialogActions>
      <Button compact textColor="#000000" onClick={onDialogClose}>
        {dialogClose}
      </Button>
    </DialogActions>
  </Dialog>
);

AboutDialogContainer.propTypes = {
  aboutDialogToggled: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutDialogContainer);

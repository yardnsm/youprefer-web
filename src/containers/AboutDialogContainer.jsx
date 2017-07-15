import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';

import Dialog from '../components/Dialog';
import DrawerHeader from '../components/DrawerHeader';
import DialogTitle from '../components/DialogTitle';
import DialogContent from '../components/DialogContent';
import DialogActions from '../components/DialogActions';
import FlatButton from '../components/FlatButton';

const mapStateToProps = ({ ui: { aboutDialogToggled } }) => ({
  aboutDialogToggled,
});

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => { dispatch(uiActions.hideAboutDialog()); },
});

const AboutDialogContainer = ({ aboutDialogToggled, handleDialogClose }) => (
  <Dialog open={aboutDialogToggled} handleDialogClose={handleDialogClose}>

    <DrawerHeader height="100px" />

    <DialogTitle>מה אתה מעדיף?</DialogTitle>

    <DialogContent>
      <p>
        <span>עיצוב, אפיון, קונספט ופיתוח ע"י</span>&nbsp;
        <a href="http://yardnsm.net/" target="_blank">ירדן סוד-מוריה</a>.&nbsp;
        <span>מטרת המשחק היא לבידור בלבד ואין במטרה לפגוע באף אחד.</span>
      </p>
    </DialogContent>

    <DialogActions>
      <FlatButton text="הבנתי" textColor="#000000" handleClick={handleDialogClose} />
    </DialogActions>

  </Dialog>
);

AboutDialogContainer.propTypes = {
  aboutDialogToggled: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutDialogContainer);

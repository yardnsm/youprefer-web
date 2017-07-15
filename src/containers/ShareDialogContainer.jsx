import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as uiActions } from '../actions/ui';

import Dialog from '../components/Dialog';
import DialogTitle from '../components/DialogTitle';
import DialogContent from '../components/DialogContent';
import DialogActions from '../components/DialogActions';
import FlatButton from '../components/FlatButton';

const ShareButtonsIframe = styled.iframe`
  width: 500px;
  height: 100px;

  @media (max-width: 768px) {
    width: 100%;
    height: 35vh;
  }
`;

// TODO: update
const createIframeUrl = (currentQuestion) => {
  if (!currentQuestion) {
    return '';
  }
  console.log(currentQuestion)
  return `/share-buttons.html?questionId=${currentQuestion.id}&text=${currentQuestion.payload.firstOption.value}`;
};

const mapStateToProps = ({ ui: { shareDialogToggled }, game: { questions } }) => ({
  shareDialogToggled,
  currentQuestion: questions.current,
});

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => { dispatch(uiActions.hideShareDialog()); },
});

const ShareDialogContainer = ({ shareDialogToggled, currentQuestion, handleDialogClose }) => (
  <Dialog open={shareDialogToggled} handleDialogClose={handleDialogClose}>

    <DialogTitle>שתף שאלה</DialogTitle>

    <DialogContent>
      <div>
        <ShareButtonsIframe
          src={createIframeUrl(currentQuestion)}
          title="Share Buttons"
          frameborder="0"
          scrolling="no"
        />
      </div>
    </DialogContent>

    <DialogActions>
      <FlatButton text="סגור" textColor="#000000" handleClick={handleDialogClose} />
    </DialogActions>

  </Dialog>
);

ShareDialogContainer.propTypes = {
  shareDialogToggled: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareDialogContainer);

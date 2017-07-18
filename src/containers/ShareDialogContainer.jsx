import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as uiActions } from '../actions/ui';

import {
  blankUrl,
  dialogClose,
  shareDialogTitle,
  shareButtonsUrl,
} from '../config/strings';

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
    height: 38vh;
  }
`;

const mapStateToProps = ({ ui: { shareDialogToggled }, game: { questions } }) => ({
  shareDialogToggled,
  currentQuestion: questions.current,
});

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => { dispatch(uiActions.hideShareDialog()); },
});

class ShareDialogContainer extends React.Component {

  constructor() {
    super();

    this.handleIframeLoad = this.handleIframeLoad.bind(this);
  }

  handleIframeLoad(evt) {
    const { currentQuestion } = this.props;

    if (!currentQuestion) {
      return;
    }

    const { id, payload: { firstOption, secondOption } } = currentQuestion;
    const { location } = evt.target.contentWindow;

    if (location.pathname === blankUrl) {
      location.replace(shareButtonsUrl(id, firstOption.value, secondOption.value));
    }
  }

  render() {
    const { shareDialogToggled, currentQuestion, handleDialogClose } = this.props;

    return (
      <Dialog open={shareDialogToggled} handleDialogClose={handleDialogClose}>

        <DialogTitle>{shareDialogTitle}</DialogTitle>

        <DialogContent>
          <div>
            {currentQuestion && <ShareButtonsIframe
              src={blankUrl}
              title="Share Buttons"
              frameborder="0"
              scrolling="no"
              onLoad={this.handleIframeLoad}
            />}
          </div>
        </DialogContent>

        <DialogActions>
          <FlatButton text={dialogClose} textColor="#000000" handleClick={handleDialogClose} />
        </DialogActions>

      </Dialog>
    );
  }
}

ShareDialogContainer.propTypes = {
  shareDialogToggled: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.object.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareDialogContainer);

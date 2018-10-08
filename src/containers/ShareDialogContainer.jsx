import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';
import { mask } from '../utils/mask';
import LocalPropTypes from '../prop-types';

import {
  singleQuestionUrl,
  dialogClose,
  shareDialogTitle,
  shareText,
  shareDialogButtons,
} from '../config/strings';

import Dialog from '../components/Dialog';
import DialogTitle from '../components/DialogTitle';
import DialogContent from '../components/DialogContent';
import DialogActions from '../components/DialogActions';
import Button from '../components/Button';
import ImageIcon from '../components/ImageIcon';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const mapStateToProps = ({ ui: { shareDialogToggled }, game: { questions } }) => ({
  shareDialogToggled,
  currentQuestion: questions.current,
});

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => { dispatch(uiActions.hideShareDialog()); },
});

class ShareDialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.formatUrl = this.formatUrl.bind(this);
  }

  formatUrl(urlTemplate) {
    const { id, payload: { firstOption, secondOption } } = this.props.currentQuestion;

    return urlTemplate
      .replace(/\$url/, singleQuestionUrl(mask(id)))
      .replace(/\$content/, shareText(firstOption.value, secondOption.value));
  }

  render() {
    const { shareDialogToggled, currentQuestion, handleDialogClose } = this.props;

    return (
      <Dialog open={shareDialogToggled} handleDialogClose={handleDialogClose}>

        <DialogTitle>{shareDialogTitle}</DialogTitle>

        <DialogContent>
          <div>
            {currentQuestion && (
              <ButtonsWrapper>
                {shareDialogButtons.map(e => (
                  <Button
                    raised
                    key={e.name}
                    bgColor={e.bgColor}
                    text={e.text}
                    icon={e.iconUrl ? (
                      <ImageIcon src={e.iconUrl} />
                    ) : null}
                    handleClick={() => {
                      window.open(this.formatUrl(e.urlTemplate), '_blank');
                    }}
                  />
                ))}
              </ButtonsWrapper>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button text={dialogClose} compact textColor="#000000" handleClick={handleDialogClose} />
        </DialogActions>

      </Dialog>
    );
  }
}

ShareDialogContainer.propTypes = {
  shareDialogToggled: PropTypes.bool.isRequired,
  currentQuestion: LocalPropTypes.question,
  handleDialogClose: PropTypes.func.isRequired,
};

ShareDialogContainer.defaultProps = {
  currentQuestion: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareDialogContainer);

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

import Drawer from '../components/Drawer';
import IconButton from '../components/IconButton';
import ShareButton from '../components/ShareButton';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding: 10px 0;

  & > * {
    width: 25%;
  }
`;

const ShareDialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  padding-left: 6px;
`;

const Title = styled.h3`
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
`;

const mapStateToProps = ({ ui: { shareDialogToggled }, game: { questions } }) => ({
  shareDialogToggled,
  currentQuestion: questions.current,
});

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => { dispatch(uiActions.hideShareDialog()); },
});

class ShareDrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.formatUrl = this.formatUrl.bind(this);
  }

  formatUrl(urlTemplate) {
    const { currentQuestion } = this.props;
    const { id, payload: { firstOption, secondOption } } = currentQuestion;

    return urlTemplate
      .replace(/\$url/, singleQuestionUrl(mask(id)))
      .replace(/\$content/, shareText(firstOption.value, secondOption.value));
  }

  render() {
    const { shareDialogToggled, currentQuestion, handleDialogClose } = this.props;

    return (
      <Drawer open={shareDialogToggled} handleDrawerClose={handleDialogClose} position="bottom">

        <ShareDialogHeader>
          <Title>{shareDialogTitle}</Title>
          <IconButton iconClassName="close" handleClick={handleDialogClose} color="rgba(0, 0, 0, 0.45)" />
        </ShareDialogHeader>

        {currentQuestion && (
          <ButtonsWrapper>
            {shareDialogButtons.map(button => (
              <div key={button.name}>
                <ShareButton
                  color={button.color}
                  text={button.name}
                  iconUrl={button.iconUrl}
                  handleClick={() => {
                    window.open(this.formatUrl(button.urlTemplate), '_blank');
                  }}
                />
              </div>
            ))}
          </ButtonsWrapper>
        )}
      </Drawer>
    );
  }
}

ShareDrawerContainer.propTypes = {
  shareDialogToggled: PropTypes.bool.isRequired,
  currentQuestion: LocalPropTypes.question,
  handleDialogClose: PropTypes.func.isRequired,
};

ShareDrawerContainer.defaultProps = {
  currentQuestion: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareDrawerContainer);

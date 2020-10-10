import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';
import { mask } from '../utils/mask';
import LocalPropTypes from '../prop-types';

import {
  singleQuestionUrl,
  shareDialogTitle,
  shareText,
  shareDialogButtons,
  shareTitle,
} from '../config/strings';

import Drawer from '../components/Drawer';
import IconButton from '../components/IconButton';
import ShareButton from '../components/ShareButton';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ShareDialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px 20px 0;
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
  onShareMenuClose: () => { dispatch(uiActions.hideShareDialog()); },
});

class ShareMenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      useNativeShareApi: !!navigator.share,
    };

    this.formatUrl = this.formatUrl.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { useNativeShareApi } = this.state;
    const { shareDialogToggled, onShareMenuClose } = this.props;

    if (useNativeShareApi && !shareDialogToggled && nextProps.shareDialogToggled) {
      navigator.share({
        title: shareTitle,
        text: this.formatUrl('$content'),
        url: this.formatUrl('$url'),
      });

      onShareMenuClose();
    }
  }

  formatUrl(urlTemplate) {
    const { currentQuestion } = this.props;
    const { id, payload: { firstOption, secondOption } } = currentQuestion;

    return urlTemplate
      .replace(/\$url/, singleQuestionUrl(mask(id)))
      .replace(/\$content/, shareText(firstOption.value, secondOption.value));
  }

  render() {
    const { useNativeShareApi } = this.state;
    const { shareDialogToggled, currentQuestion, onShareMenuClose } = this.props;

    // Do not render if the native Web Share API can be used
    if (useNativeShareApi) {
      return null;
    }

    return (
      <Drawer
        open={shareDialogToggled}
        onDrawerClose={onShareMenuClose}
        position="bottom"
        zIndex={99}
      >

        <ShareDialogHeader>
          <Title>{shareDialogTitle}</Title>
          <IconButton iconClassName="close" onClick={onShareMenuClose} color="rgba(0, 0, 0, 0.45)" />
        </ShareDialogHeader>

        {currentQuestion && (
          <ButtonsWrapper>
            {shareDialogButtons.map(button => (
              <div key={button.name}>
                <ShareButton
                  color={button.color}
                  text={button.name}
                  icon={button.icon}
                  onClick={() => {
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

ShareMenuContainer.propTypes = {
  shareDialogToggled: PropTypes.bool.isRequired,
  currentQuestion: LocalPropTypes.question,
  onShareMenuClose: PropTypes.func.isRequired,
};

ShareMenuContainer.defaultProps = {
  currentQuestion: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareMenuContainer);

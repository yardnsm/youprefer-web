import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Tooltip from '../../../../components/Tooltip';

import {
  rootUrl,
  questionStatsVotes,
  clickToCopy,
  copiedToClipboard,
} from '../../../../config/strings';

const QuestionStatsWrapper = styled.div`
  padding: 25px 40px;
  margin: 20px;
  height: auto;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  font-size: 18px;
  color: #000000;
  background-color: #eeeeee;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Stat = styled.div`
  outline: none;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & i.material-icons {
    width: 24px;
    height: 24px;
    margin-left: 7px;
    margin-right: 0;
    color: rgba(0, 0, 0, 0.55);
  }
`;

const Clickable = styled.div`
  cursor: pointer;
`;

class QuestionStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.timeout = null;

    this.getQuestionUrl = this.getQuestionUrl.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getQuestionUrl() {
    const { questionId } = this.props;

    return `${rootUrl}/${questionId}`;
  }

  handleCopyClick() {
    this.setState({
      copied: true,
    });

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 3000);
  }

  render() {
    const { totalVotes } = this.props;
    const { copied } = this.state;

    return (
      <QuestionStatsWrapper>
        <Stat>
          <i className="material-icons">poll</i>
          <span>{`${totalVotes} ${questionStatsVotes}`}</span>
        </Stat>

        <CopyToClipboard
          text={this.getQuestionUrl()}
          onCopy={this.handleCopyClick}
        >
          <Clickable>
            <Tooltip text={copied ? copiedToClipboard : clickToCopy}>
              <Stat>
                <i className="material-icons">link</i>
                <span>{this.getQuestionUrl()}</span>
              </Stat>
            </Tooltip>
          </Clickable>
        </CopyToClipboard>
      </QuestionStatsWrapper>
    );
  }
}

QuestionStats.propTypes = {
  questionId: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
};

export default QuestionStats;

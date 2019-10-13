import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Icon from '../Icon';
import Tooltip from '../Tooltip';

import {
  questionStatsVotes,
  questionStatsLoadingVotes,
  singleQuestionUrl,
  clickToCopy,
  copiedToClipboard,
} from '../../config/strings';

const Wrapper = styled.div`
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

  /* Hide on mobile */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  outline: none;
  color: rgba(0, 0, 0, 0.87);

  & ${Icon} {
    margin-left: 7px;
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

    this.tooltipTimeout = null;

    this.getQuestionUrl = this.getQuestionUrl.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.tooltipTimeout);
  }

  getQuestionUrl() {
    const { questionId } = this.props;
    return singleQuestionUrl(questionId);
  }

  handleCopyClick() {
    this.setState({
      copied: true,
    });

    clearTimeout(this.tooltipTimeout);

    this.tooltipTimeout = setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 3000);
  }

  render() {
    const { totalVotes } = this.props;
    const { copied } = this.state;

    return (
      <Wrapper>
        <Stat>
          <Icon>poll</Icon>
          <span>
            {(
              (typeof totalVotes === 'number' && totalVotes) ?
                `${totalVotes} ${questionStatsVotes}` :
                questionStatsLoadingVotes
            )}
          </span>
        </Stat>

        <CopyToClipboard
          text={this.getQuestionUrl()}
          onCopy={this.handleCopyClick}
        >
          <Clickable>
            <Tooltip text={copied ? copiedToClipboard : clickToCopy}>
              <Stat>
                <Icon>link</Icon>
                <span>{this.getQuestionUrl()}</span>
              </Stat>
            </Tooltip>
          </Clickable>
        </CopyToClipboard>
      </Wrapper>
    );
  }
}

QuestionStats.propTypes = {
  questionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  totalVotes: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

QuestionStats.defaultProps = {
  questionId: 0,
  totalVotes: null,
};

export default QuestionStats;

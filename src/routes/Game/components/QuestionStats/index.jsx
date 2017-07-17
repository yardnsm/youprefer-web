import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  rootUrl,
  questionStatsVotes,
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
  box-shadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12)';

  @media (max-width: 768px) {
    margin: 5px 20px;
  }
`;

const Stat = styled.div`
  outline: none;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${props => props.hideOnMobile && `
      @media (max-width: 768px) {
        display: none;
      }
  `}

  & i.material-icons {
    width: 24px;
    height: 24px;
    margin-left: 7px;
    margin-right: 0;
    color: rgba(0, 0, 0, 0.55);
  }
`;

const QuestionStats = ({ questionId, totalVotes }) => (
  <QuestionStatsWrapper>
    <Stat>
      <i className="material-icons">poll</i>
      <span>{`${totalVotes} ${questionStatsVotes}`}</span>
    </Stat>

    <Stat hideOnMobile>
      <i className="material-icons">link</i>
      <span>{`${rootUrl}/${questionId}`}</span>
    </Stat>
  </QuestionStatsWrapper>
);

QuestionStats.propTypes = {
  questionId: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
};

export default QuestionStats;
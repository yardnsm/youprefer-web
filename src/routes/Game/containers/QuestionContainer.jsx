import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocalPropTypes from '../../../prop-types';

import OptionCard from '../../../components/OptionCard';
import OrCircle from '../../../components/OrCircle';
import QuestionStats from '../../../components/QuestionStats';

const OptionsContainer = styled.div`
  display: flex;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const calculateVotesPercentage = (votes, totalVotes, floorFunc) =>
  floorFunc(100 * (votes / totalVotes));

const QuestionContainer = ({
  loading,
  question,
  maskedQuestionId,
  onFirstOptionSelect,
  onSecondOptionSelect,
}) => {
  const { payload, selected } = question || {};
  const { firstOption, secondOption } = payload || {};

  const firstOptionVotes = firstOption ? firstOption.votes : 0;
  const secondOptionVotes = secondOption ? secondOption.votes : 0;
  const totalVotes = firstOptionVotes + secondOptionVotes;

  const firstOptionPercentage =
    calculateVotesPercentage(firstOptionVotes, totalVotes, Math.ceil);

  const secondOptionPercentage =
    calculateVotesPercentage(secondOptionVotes, totalVotes, Math.floor);

  return (
    <div>
      <OptionsContainer>

        <OptionCard
          type="first"
          enabled={!loading}
          showBack={!!selected}
          selected={selected === 'first'}
          value={firstOption.value}
          votes={firstOption.votes}
          percentage={firstOptionPercentage}
          onClick={onFirstOptionSelect}
        />

        <OrCircle loading={loading} />

        <OptionCard
          type="second"
          enabled={!loading}
          showBack={!!selected}
          selected={selected === 'second'}
          value={secondOption.value}
          votes={secondOption.votes}
          percentage={secondOptionPercentage}
          onClick={onSecondOptionSelect}
        />
      </OptionsContainer>

      <QuestionStats
        questionId={maskedQuestionId}
        totalVotes={totalVotes}
      />
    </div>
  );
};

QuestionContainer.propTypes = {
  loading: PropTypes.bool,
  question: LocalPropTypes.question,
  maskedQuestionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onFirstOptionSelect: PropTypes.func.isRequired,
  onSecondOptionSelect: PropTypes.func.isRequired,
};

QuestionContainer.defaultProps = {
  loading: false,
  maskedQuestionId: 0,
  question: {
    payload: {
      firstOption: {},
      secondOption: {},
    },
  },
};

export default QuestionContainer;

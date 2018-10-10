import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { mask } from '../../../utils/mask';
import LocalPropTypes from '../../../prop-types';

import OptionCard from '../components/OptionCard';
import OrCircle from '../components/OrCircle';
import QuestionStats from '../components/QuestionStats';

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
  question,
  handleFirstOptionSelect,
  handleSecondOptionSelect,
}) => {
  const { payload, selected, id } = question;
  const { firstOption, secondOption } = payload;

  const firstOptionVotes = firstOption.votes;
  const secondOptionVotes = secondOption.votes;
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
          showBack={!!selected}
          selected={selected === 'first'}
          value={firstOption.value}
          votes={firstOption.votes}
          percentage={firstOptionPercentage}
          handleOptionSelect={handleFirstOptionSelect}
        />

        <OrCircle />

        <OptionCard
          type="second"
          showBack={!!selected}
          selected={selected === 'second'}
          value={secondOption.value}
          votes={secondOption.votes}
          percentage={secondOptionPercentage}
          handleOptionSelect={handleSecondOptionSelect}
        />
      </OptionsContainer>

      <QuestionStats
        questionId={mask(id)}
        totalVotes={totalVotes}
      />
    </div>
  );
};

QuestionContainer.propTypes = {
  question: LocalPropTypes.question,
  handleFirstOptionSelect: PropTypes.func.isRequired,
  handleSecondOptionSelect: PropTypes.func.isRequired,
};

QuestionContainer.defaultProps = {
  question: null,
};

export default QuestionContainer;

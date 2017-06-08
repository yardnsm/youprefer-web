import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';

import OptionCard from '../components/OptionCard';
import OrCircle from '../components/OrCircle';
import QuestionStats from '../components/QuestionStats';

const styles = {
  optionsContainer: {
    display: 'flex',
    position: 'relative',

    '@media (max-width : 768px)': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
};

const calculateVotesPercentage = (votes, totalVotes, floorFunc) =>
  floorFunc(100 * votes / totalVotes);

const QuestionContainer = ({
  classes,
  question,
  handleFirstOptionSelect,
  handleSecondOptionSelect
}) => {
  const { payload, selected, id } = question;
  const { firstOption, secondOption } = payload;

  const firstOptionVotes = firstOption.votes;
  const secondOptionVotes = secondOption.votes;
  const totalVotes = firstOptionVotes + secondOptionVotes;

  const firstOptionPercentage = calculateVotesPercentage(firstOptionVotes, totalVotes, Math.ceil);
  const secondOptionPercentage = calculateVotesPercentage(secondOptionVotes, totalVotes, Math.floor);

  return (
    <div>
      <div className={classes.optionsContainer}>

        <OptionCard
          type='first'
          showBack={!!selected}
          selected={selected === 'first'}
          value={firstOption.value}
          votes={firstOption.votes}
          percentage={firstOptionPercentage}
          handleOptionSelect={handleFirstOptionSelect} />

        <OrCircle />

        <OptionCard
          type='second'
          showBack={!!selected}
          selected={selected === 'second'}
          value={secondOption.value}
          votes={secondOption.votes}
          percentage={secondOptionPercentage}
          handleOptionSelect={handleSecondOptionSelect} />
      </div>

      <QuestionStats
        questionId={id}
        totalVotes={totalVotes} />
    </div>
  );
};

QuestionContainer.propTypes = {
  question: PropTypes.object,
  handleFirstOptionSelect: PropTypes.func,
  handleSecondOptionSelect: PropTypes.func
};

export default injectSheet(styles)(QuestionContainer);
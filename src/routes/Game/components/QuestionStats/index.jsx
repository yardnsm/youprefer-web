import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const QuestionStats = ({ classes, questionId, totalVotes }) =>
  <div className={classes.questionStatsCard}>
    <div className={classes.stat}>
      <i className="material-icons">poll</i>
      <span>{`${totalVotes} הצבעות`}</span>
    </div>

    <div className={classes.stat}>
      <i className="material-icons">link</i>
      <span>{`http://ypfr.co/q/${questionId}`}</span>
    </div>
  </div>;

QuestionStats.propTypes = {
  questionId: PropTypes.number,
  totalVotes: PropTypes.number,
};

export default injectSheet(styles)(QuestionStats);
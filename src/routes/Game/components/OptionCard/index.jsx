import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const OptionCard = ({
  classes,
  type,
  showBack,
  selected,
  value,
  votes,
  percentage,
  handleOptionSelect,
}) => (
  <div
    className={classNames(classes.optionCard, type, { selected })}
    onClick={!showBack && (() => { handleOptionSelect(type); })}
  >
    <div className={classes.optionCardInner}>
      {!showBack ?
        <span>{value}</span> :
        <div>
          <div className={classes.backPercentage}>{`${percentage}%`}</div>
          <div className={classes.backVotes}>{`${votes} הצבעות`}</div>
          <div className={classes.backValue}>{value}</div>
        </div>}
    </div>
  </div>
);

OptionCard.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  showBack: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
};

export default injectSheet(styles)(OptionCard);

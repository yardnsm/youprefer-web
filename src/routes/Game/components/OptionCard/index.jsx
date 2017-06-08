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
  handleOptionSelect
}) =>
  <div
    className={classNames(classes.optionCard, type, { selected })}
    onClick={!showBack && (() => { handleOptionSelect(type) })}>
    <div className={classes.optionCardInner}>
      {!showBack ?
        <span>{value}</span> :
        <div>
          <div className={classes.backPercentage}>{`${percentage}%`}</div>
          <div className={classes.backVotes}>{`${votes} הצבעות`}</div>
          <div className={classes.backValue}>{value}</div>
         </div>}
    </div>
  </div>;

OptionCard.propTypes = {
  type: PropTypes.string,
  showBack: PropTypes.bool,
  selected: PropTypes.bool,
  value: PropTypes.string,
  votes: PropTypes.number,
  percentage: PropTypes.number,
  handleOptionSelect: PropTypes.func,
};

export default injectSheet(styles)(OptionCard);
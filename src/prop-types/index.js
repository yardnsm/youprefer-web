import PropTypes from 'prop-types';

const questionOption = PropTypes.shape({
  initialVotesValue: PropTypes.number,
  votes: PropTypes.number,
  value: PropTypes.string,
});

const question = PropTypes.shape({
  id: PropTypes.number,
  selected: PropTypes.bool,
  payload: PropTypes.shape({
    isAvailable: PropTypes.bool,
    isSkippable: PropTypes.bool,
    totalSkips: PropTypes.number,
    firstQuestion: questionOption,
    secondOption: questionOption,
  }),
});

const snackbar = PropTypes.shape({
  id: PropTypes.number,
  message: PropTypes.string,
  action: PropTypes.shape({
    text: PropTypes.string,
    callback: PropTypes.func,
  }),
});

export default {
  questionOption,
  question,
  snackbar,
};

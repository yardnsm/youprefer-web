import {
  fetchSingleQuestion,
  incrementQuestionVotes
} from '../utils/database';

const types = {
  REQUEST_QUESTION: 'REQUEST_QUESTION',
  RECEIVE_QUESTION: 'RECEIVE_QUESTION',

  SELECT_FIRST_OPTION: 'SELECT_FIRST_OPTION',
  SELECT_SECOND_OPTION: 'SELECT_SECOND_OPTION',

  NEXT_QUESTION: 'NEXT_QUESTION',
  PREV_QUESTION: 'PREV_QUESTION',
};

const actions = {
  requestQuestion: () => ({ type: types.REQUEST_QUESTION }),
  receiveQuestion: (id, question) => ({ type: types.RECEIVE_QUESTION, payload: { id, question } }),

  fetchQuestion: id => dispatch => {
    dispatch(actions.requestQuestion());
    return fetchSingleQuestion(id)
      .then((question) => { dispatch(actions.receiveQuestion(id, question)) })
  },

  selectFirstOption: () => ({ type: types.SELECT_FIRST_OPTION }),
  selectSecondOption: () => ({ type: types.SELECT_SECOND_OPTION }),

  incrementOptionVotes: (option, question) => dispatch => {
    const field = option === 'first' ?
      'firstOption' :
      'secondOption';

    switch (option) {
      case 'first':
        dispatch(actions.selectFirstOption());
        break;
      case 'second':
        dispatch(actions.selectSecondOption());
        break;
    }

    return incrementQuestionVotes(question, field);
  },

  nextQuestion: () => ({ type: types.NEXT_QUESTION }),
  prevQuestion: () => ({ type: types.PREV_QUESTION }),
};

export { types, actions }

import {
  fetchQuestionCount,
  fetchSingleQuestion,
  incrementQuestionVotes,
} from '../utils/database';

const types = {
  REQUEST_QUESTION_COUNT: 'REQUEST_QUESTION_COUNT',
  RECEIVE_QUESTION_COUNT: 'RECEIVE_QUESTION_COUNT',

  REQUEST_QUESTION: 'REQUEST_QUESTION',
  RECEIVE_QUESTION: 'RECEIVE_QUESTION',

  SELECT_FIRST_OPTION: 'SELECT_FIRST_OPTION',
  SELECT_SECOND_OPTION: 'SELECT_SECOND_OPTION',

  NEXT_QUESTION: 'NEXT_QUESTION',
  PREV_QUESTION: 'PREV_QUESTION',
};

const actions = {
  requestQuestionCount: () => ({ type: types.REQUEST_QUESTION_COUNT }),
  receiveQuestionCount: count => ({ type: types.RECEIVE_QUESTION_COUNT, payload: { count } }),

  fetchQuestionCount: () => (dispatch) => {
    dispatch(actions.requestQuestionCount());
    return fetchQuestionCount()
      .then((count) => { dispatch(actions.receiveQuestionCount(count)); });
  },

  requestQuestion: () => ({ type: types.REQUEST_QUESTION }),
  receiveQuestion: (id, question) => ({ type: types.RECEIVE_QUESTION, payload: { id, question } }),

  fetchQuestion: id => (dispatch) => {
    dispatch(actions.requestQuestion());
    return fetchSingleQuestion(id)
      .then((question) => { dispatch(actions.receiveQuestion(id, question)); });
  },

  selectFirstOption: () => ({ type: types.SELECT_FIRST_OPTION }),
  selectSecondOption: () => ({ type: types.SELECT_SECOND_OPTION }),

  incrementFirstOption: question => (dispatch) => {
    dispatch(actions.selectFirstOption());
    incrementQuestionVotes(question, 'firstOption');
  },

  incrementSecondOption: question => (dispatch) => {
    dispatch(actions.selectSecondOption());
    incrementQuestionVotes(question, 'secondOption');
  },

  nextQuestion: () => ({ type: types.NEXT_QUESTION }),
  prevQuestion: () => ({ type: types.PREV_QUESTION }),
};

export { types, actions };

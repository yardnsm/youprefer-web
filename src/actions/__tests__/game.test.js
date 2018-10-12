import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { actions, types } from '../game';

jest.mock('../../utils/database.js');

const mockStore = configureMockStore([
  thunkMiddleware,
]);

test('requestQuestionCount', () => {
  expect(
    actions.requestQuestionCount(),
  ).toEqual({
    type: types.REQUEST_QUESTION_COUNT,
  });
});

test('receiveQuestionCount', () => {
  expect(
    actions.receiveQuestionCount(100),
  ).toEqual({
    type: types.RECEIVE_QUESTION_COUNT,
    payload: { count: 100 },
  });
});

test('fecthQuestionCount', () => {
  const store = mockStore();

  return store.dispatch(
    actions.fetchQuestionCount(),
  ).then(() => {
    expect(store.getActions()).toEqual(
      [{
        type: types.REQUEST_QUESTION_COUNT,
      }, {
        type: types.RECEIVE_QUESTION_COUNT,
        payload: { count: 100 },
      }],
    );
  });
});

test('requestQuestion', () => {
  expect(
    actions.requestQuestion(),
  ).toEqual({
    type: types.REQUEST_QUESTION,
  });
});

test('receiveQuestion', () => {
  expect(
    actions.receiveQuestion(100, { isAvailable: true }),
  ).toEqual({
    type: types.RECEIVE_QUESTION,
    payload: {
      id: 100,
      question: { isAvailable: true },
    },
  });
});

test('fetchQuestion', () => {
  const store = mockStore();

  return store.dispatch(
    actions.fetchQuestion(100),
  ).then(() => {
    expect(store.getActions()).toEqual(
      [{
        type: types.REQUEST_QUESTION,
      }, {
        type: types.RECEIVE_QUESTION,
        payload: {
          id: 100,

          // This data comes from `../../utils/__mocks__/database.js`
          question: {
            firstOption: {
              value: 'First option',
              votes: 100,
              initialVotesValue: 50,
            },
            secondOption: {
              value: 'Second option',
              votes: 100,
              initialVotesValue: 50,
            },
            isAvailable: true,
            isSkippable: false,
            totalSkips: 25,
          },
        },
      }],
    );
  });
});

test('selectFirstOption', () => {
  expect(
    actions.selectFirstOption(),
  ).toEqual({
    type: types.SELECT_FIRST_OPTION,
  });
});

test('selectSecondOption', () => {
  expect(
    actions.selectSecondOption(),
  ).toEqual({
    type: types.SELECT_SECOND_OPTION,
  });
});

test('incrementFirstOption', () => {
  const store = mockStore();

  return store.dispatch(actions.incrementFirstOption()).then(() => {
    expect(store.getActions()).toEqual(
      [{ type: types.SELECT_FIRST_OPTION }],
    );
  });
});

test('incrementSecondOption', () => {
  const store = mockStore();

  return store.dispatch(actions.incrementSecondOption()).then(() => {
    expect(store.getActions()).toEqual(
      [{ type: types.SELECT_SECOND_OPTION }],
    );
  });
});

test('nextQuestion', () => {
  expect(
    actions.nextQuestion(),
  ).toEqual({
    type: types.NEXT_QUESTION,
  });
});

test('prevQuestion', () => {
  expect(
    actions.prevQuestion(),
  ).toEqual({
    type: types.PREV_QUESTION,
  });
});

test('removeCurrentQuestion', () => {
  expect(
    actions.removeCurrentQuestion(),
  ).toEqual({
    type: types.REMOVE_CURRENT_QUESTION,
  });
});

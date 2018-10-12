import reducer from './game';
import { types } from '../actions/game';

test('initial state', () => {
  expect(
    reducer(undefined, {}),
  ).toEqual({
    questions: {
      count: null,
      prev: [],
      next: [],
      current: null,
    },
  });
});

test('handle REQUEST_QUESTION_COUNT', () => {
  const action = {
    type: types.REQUEST_QUESTION_COUNT,
  };

  expect(
    reducer({
      questions: {
        count: 100,
      },
    }, action),
  ).toEqual({
    questions: {
      count: null,
    },
  });
});

test('handle RECEIVE_QUESTION_COUNT', () => {
  const action = {
    type: types.RECEIVE_QUESTION_COUNT,
    payload: {
      count: 42,
    },
  };

  expect(
    reducer({
      questions: {
        count: null,
      },
    }, action),
  ).toEqual({
    questions: {
      count: 42,
    },
  });
});

test('handle REQUEST_QUESTION', () => {
  const action = {
    type: types.REQUEST_QUESTION,
  };

  expect(
    reducer({
      questions: {
        prev: [1, 2, 3],
        current: null,
      },
    }, action),
  ).toEqual({
    questions: {
      prev: [1, 2, 3],
      current: null,
    },
  });

  expect(
    reducer({
      questions: {
        prev: [1, 2, 3],
        current: 4,
        next: [5, 6, 7],
      },
    }, action),
  ).toEqual({
    questions: {
      prev: [1, 2, 3, 4],
      current: null,
      next: [5, 6, 7],
    },
  });
});

test('handle RECEIVE_QUESTION', () => {
  const action = {
    type: types.RECEIVE_QUESTION,
    payload: {
      id: 0,
      selected: false,

      // Should contain for than just a string, but it's okay for this case
      question: 'Is your refrigerator running?',
    },
  };

  expect(
    reducer({
      questions: {
        current: null,
      },
    }, action),
  ).toEqual({
    questions: {
      current: {
        id: 0,
        payload: 'Is your refrigerator running?',
        selected: false,
      },
    },
  });
});

test('handle SELECT_FIRST_OPTION', () => {
  const action = {
    type: types.SELECT_FIRST_OPTION,
  };

  expect(
    reducer({
      questions: {
        current: {
          selected: false,
        },
      },
    }, action),
  ).toEqual({
    questions: {
      current: {
        selected: 'first',
      },
    },
  });
});

test('handle SELECT_SECOND_OPTION', () => {
  const action = {
    type: types.SELECT_SECOND_OPTION,
  };

  expect(
    reducer({
      questions: {
        current: {
          selected: false,
        },
      },
    }, action),
  ).toEqual({
    questions: {
      current: {
        selected: 'second',
      },
    },
  });
});

test('handle NEXT_QUESTION', () => {
  const action = {
    type: types.NEXT_QUESTION,
  };

  expect(
    reducer({
      questions: {
        prev: [1, 2, 3],
        current: 4,
        next: [5, 6, 7],
      },
    }, action),
  ).toEqual({
    questions: {
      prev: [1, 2, 3, 4],
      current: 5,
      next: [6, 7],
    },
  });
});

test('handle PREV_QUESTION', () => {
  const action = {
    type: types.PREV_QUESTION,
  };

  expect(
    reducer({
      questions: {
        prev: [1, 2, 3],
        current: 4,
        next: [5, 6, 7],
      },
    }, action),
  ).toEqual({
    questions: {
      prev: [1, 2],
      current: 3,
      next: [4, 5, 6, 7],
    },
  });
});

test('handle REMOVE_CURRENT_QUESTION', () => {
  const action = {
    type: types.REMOVE_CURRENT_QUESTION,
  };

  expect(
    reducer({
      questions: {
        prev: [1, 2, 3],
        current: 4,
        next: [5, 6, 7],
      },
    }, action),
  ).toEqual({
    questions: {
      prev: [1, 2, 3],
      current: null,
      next: [5, 6, 7],
    },
  });
});

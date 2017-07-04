import { types } from '../actions/game';

const initialState = {
  questions: {
    count: null,
    prev: [],
    next: [],
    current: null,
  },
};

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.REQUEST_QUESTION_COUNT:
      return {
        ...state,
        questions: {
          ...state.questions,
          count: null,
        },
      };

    case types.RECEIVE_QUESTION_COUNT:
      return {
        ...state,
        questions: {
          ...state.questions,
          count: payload.count,
        },
      };

    case types.REQUEST_QUESTION:
      // prev[1,2,3] current(4) next[5,6,7] -->
      // prev[1,2,3,4] current(null) next[5,6,7]
      return {
        ...state,
        questions: {
          ...state.questions,
          prev: [...state.questions.prev, state.questions.current].filter(Boolean),
          current: null,
        },
      };

    case types.RECEIVE_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          current: {
            id: payload.id,
            payload: payload.question,
            selected: false,
          },
        },
      };

    case types.SELECT_FIRST_OPTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          current: {
            ...state.questions.current,
            selected: 'first',
          },
        },
      };

    case types.SELECT_SECOND_OPTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          current: {
            ...state.questions.current,
            selected: 'second',
          },
        },
      };

    case types.NEXT_QUESTION:
      // prev[1,2,3] current(4) next[5,6,7] -->
      // prev[1,2,3,4] current(5) next[6,7]
      return {
        ...state,
        questions: {
          ...state.questions,
          prev: [...state.questions.prev, state.questions.current].filter(Boolean),
          current: state.questions.next[0],
          next: state.questions.next.slice(1).filter(Boolean),
        },
      };

    case types.PREV_QUESTION:
      // prev[1,2,3] current(4) next[5,6,7] -->
      // prev[1,2] current(3) next[4,5,6,7]
      return {
        ...state,
        questions: {
          ...state.questions,
          prev: state.questions.prev.slice(0, -1).filter(Boolean),
          current: state.questions.prev.slice(-1)[0],
          next: [state.questions.current, ...state.questions.next].filter(Boolean),
        },
      };

    default:
      return state;
  }
};

export { initialState };

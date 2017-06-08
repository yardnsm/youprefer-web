import { types } from '../actions/ui';

const initialState = {
  drawerToggled: false,
  snackbars: []
};

export default (state = initialState, action) => {

  const { payload } = action;

  switch (action.type) {
    case types.SHOW_DRAWER:
      return { ...state, drawerToggled: true };

    case types.HIDE_DRAWER:
      return { ...state, drawerToggled: false };

    case types.TOGGLE_DRAWER:
      return { ...state, drawerToggled: !state.drawerToggled };

    case types.ADD_SNACKBAR:
      return {
        ...state,
        snackbars: [{
          id: payload.id,
          text: payload.text,
          action: payload.action
        }, ...state.snackbars]
      };

    case types.REMOVE_SNACKBAR:
      return {
        ...state,
        snackbars: state.snackbars.filter(e => e.id !== payload.id)
      };

    default:
      return state;
  };
};

export { initialState }

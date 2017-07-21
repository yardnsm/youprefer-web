import { types } from '../actions/ui';

const initialState = {
  drawerToggled: false,
  aboutDialogToggled: false,
  shareDialogToggled: false,
  snackbars: [],
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

    case types.SHOW_ABOUT_DIALOG:
      return { ...state, aboutDialogToggled: true };

    case types.HIDE_ABOUT_DIALOG:
      return { ...state, aboutDialogToggled: false };

    case types.SHOW_SHARE_DIALOG:
      return { ...state, shareDialogToggled: true };

    case types.HIDE_SHARE_DIALOG:
      return { ...state, shareDialogToggled: false };

    case types.ADD_SNACKBAR:
      return {
        ...state,
        snackbars: [{
          id: payload.id,
          message: payload.message,
          action: payload.action,
        }, ...state.snackbars],
      };

    case types.REMOVE_SNACKBAR:
      return {
        ...state,
        snackbars: state.snackbars.filter(e => e.id !== payload.id),
      };

    default:
      return state;
  }
};

export { initialState };

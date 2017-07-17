const types = {
  SHOW_DRAWER: 'SHOW_DRAWER',
  HIDE_DRAWER: 'HIDE_DRAWER',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',

  SHOW_ABOUT_DIALOG: 'SHOW_ABOUT_DIALOG',
  HIDE_ABOUT_DIALOG: 'HIDE_ABOUT_DIALOG',

  SHOW_SHARE_DIALOG: 'SHOW_SHARE_DIALOG',
  HIDE_SHARE_DIALOG: 'HIDE_SHARE_DIALOG',

  ADD_SNACKBAR: 'ADD_SNACKBAR',
  REMOVE_SNACKBAR: 'REMOVE_SNACKBAR',
};

const actions = {
  showDrawer: () => ({ type: types.SHOW_DRAWER }),
  hideDrawer: () => ({ type: types.HIDE_DRAWER }),
  toggleDrawer: () => ({ type: types.TOGGLE_DRAWER }),

  showAboutDialog: () => ({ type: types.SHOW_ABOUT_DIALOG }),
  hideAboutDialog: () => ({ type: types.HIDE_ABOUT_DIALOG }),

  showShareDialog: () => ({ type: types.SHOW_SHARE_DIALOG }),
  hideShareDialog: () => ({ type: types.HIDE_SHARE_DIALOG }),

  addSnackbar: (id, message, actionText, actionCallback) => ({
    type: types.ADD_SNACKBAR,
    payload: {
      id,
      message,
      action: { text: actionText, callback: actionCallback },
    },
  }),

  removeSnackbar: id => ({ type: types.REMOVE_SNACKBAR, payload: { id } }),

  createSnackbar: ({ message, duration, actionText, actionCallback }) => (dispatch) => {
    const id = +new Date();

    dispatch(actions.addSnackbar(id, message, actionText, actionCallback));

    setTimeout(() => {
      dispatch(actions.removeSnackbar(id));
    }, duration);
  },
};

export { types, actions };
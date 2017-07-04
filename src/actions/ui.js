const types = {
  SHOW_DRAWER: 'SHOW_DRAWER',
  HIDE_DRAWER: 'HIDE_DRAWER',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',

  ADD_SNACKBAR: 'ADD_SNACKBAR',
  REMOVE_SNACKBAR: 'REMOVE_SNACKBAR',
};

const actions = {
  showDrawer: () => ({ type: types.SHOW_DRAWER }),
  hideDrawer: () => ({ type: types.HIDE_DRAWER }),
  toggleDrawer: () => ({ type: types.TOGGLE_DRAWER }),

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

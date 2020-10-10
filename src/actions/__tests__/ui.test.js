import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { actions, types } from '../ui';

const mockStore = configureMockStore([
  thunkMiddleware,
]);

test('showDrawer', () => {
  expect(
    actions.showDrawer(),
  ).toEqual({
    type: types.SHOW_DRAWER,
  });
});

test('hideDrawer', () => {
  expect(
    actions.hideDrawer(),
  ).toEqual({
    type: types.HIDE_DRAWER,
  });
});

test('toggleDrawer', () => {
  expect(
    actions.toggleDrawer(),
  ).toEqual({
    type: types.TOGGLE_DRAWER,
  });
});

test('showAboutDialog', () => {
  expect(
    actions.showAboutDialog(),
  ).toEqual({
    type: types.SHOW_ABOUT_DIALOG,
  });
});

test('hideAboutDialog', () => {
  expect(
    actions.hideAboutDialog(),
  ).toEqual({
    type: types.HIDE_ABOUT_DIALOG,
  });
});

test('showShareDialog', () => {
  expect(
    actions.showShareDialog(),
  ).toEqual({
    type: types.SHOW_SHARE_DIALOG,
  });
});

test('hideAboutDialog', () => {
  expect(
    actions.hideAboutDialog(),
  ).toEqual({
    type: types.HIDE_ABOUT_DIALOG,
  });
});

test('addSnackbar', () => {
  const id = 0;
  const message = 'aye';
  const actionText = 'F';
  const actionCallback = jest.fn();

  expect(
    actions.addSnackbar(id, message, actionText, actionCallback),
  ).toEqual({
    type: types.ADD_SNACKBAR,
    payload: {
      id,
      message,
      action: {
        text: actionText,
        callback: actionCallback,
      },
    },
  });
});

test('removeSnackbar', () => {
  expect(
    actions.removeSnackbar(0),
  ).toEqual({
    type: types.REMOVE_SNACKBAR,
    payload: {
      id: 0,
    },
  });
});

test('createSnackbar', () => {
  const message = 'aye';
  const duration = 100;
  const actionText = 'F';
  const actionCallback = jest.fn();

  const store = mockStore({});

  return store.dispatch(
    actions.createSnackbar({
      message, duration, actionText, actionCallback,
    }),
  ).then(() => {
    expect(store.getActions()).toEqual(
      [{
        type: types.ADD_SNACKBAR,
        payload: {
          id: expect.any(Number),
          message,
          action: {
            text: actionText,
            callback: actionCallback,
          },
        },
      }, {
        type: types.UNLOAD_SNACKBAR,
        payload: {
          id: expect.any(Number),
        },
      }, {
        type: types.REMOVE_SNACKBAR,
        payload: {
          id: expect.any(Number),
        },
      }],
    );
  });
});

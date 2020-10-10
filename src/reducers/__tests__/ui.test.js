import reducer from '../ui';
import { types } from '../../actions/ui';

test('initial state', () => {
  expect(
    reducer(undefined, {}),
  ).toEqual({
    drawerToggled: false,
    aboutDialogToggled: false,
    shareDialogToggled: false,
    snackbars: [],
  });
});

test('handle SHOW_DRAWER', () => {
  const action = {
    type: types.SHOW_DRAWER,
  };

  expect(
    reducer({}, action),
  ).toEqual({
    drawerToggled: true,
  });
});

test('handle HIDE_DRAWER', () => {
  const action = {
    type: types.HIDE_DRAWER,
  };

  expect(
    reducer({}, action),
  ).toEqual({
    drawerToggled: false,
  });
});

test('handle TOGGLE_DRAWER', () => {
  const action = {
    type: types.TOGGLE_DRAWER,
  };

  expect(
    reducer({ drawerToggled: false }, action),
  ).toEqual({
    drawerToggled: true,
  });

  expect(
    reducer({ drawerToggled: true }, action),
  ).toEqual({
    drawerToggled: false,
  });
});

test('handle SHOW_ABOUT_DIALOG', () => {
  const action = {
    type: types.SHOW_ABOUT_DIALOG,
  };

  expect(
    reducer({}, action),
  ).toEqual({
    aboutDialogToggled: true,
  });
});

test('handle HIDE_ABOUT_DIALOG', () => {
  const action = {
    type: types.HIDE_ABOUT_DIALOG,
  };

  expect(
    reducer({}, action),
  ).toEqual({
    aboutDialogToggled: false,
  });
});

test('handle SHOW_SHARE_DIALOG', () => {
  const action = {
    type: types.SHOW_SHARE_DIALOG,
  };

  expect(
    reducer({}, action),
  ).toEqual({
    shareDialogToggled: true,
  });
});

test('handle HIDE_SHARE_DIALOG', () => {
  const action = {
    type: types.HIDE_SHARE_DIALOG,
  };

  expect(
    reducer({}, action),
  ).toEqual({
    shareDialogToggled: false,
  });
});

test('handle ADD_SNACKBAR', () => {
  const fn = jest.fn();

  const action = {
    type: types.ADD_SNACKBAR,
    payload: {
      id: 0,
      message: 'yo dis is a snackbar',
      action: fn,
    },
  };

  expect(
    reducer({ snackbars: [] }, action),
  ).toEqual({
    snackbars: [{
      id: 0,
      loaded: true,
      message: 'yo dis is a snackbar',
      action: fn,
    }],
  });
});

test('handle UNLOAD_SNACKBAR', () => {
  const action = {
    type: types.UNLOAD_SNACKBAR,
    payload: {
      id: 1,
    },
  };

  expect(
    reducer({
      snackbars: [
        { id: 0, loaded: true },
        { id: 1, loaded: true },
        { id: 2, loaded: true },
      ],
    }, action),
  ).toEqual({
    snackbars: [
      { id: 0, loaded: true },
      { id: 1, loaded: false },
      { id: 2, loaded: true },
    ],
  });
});

test('handle REMOVE_SNACKBAR', () => {
  const action = {
    type: types.REMOVE_SNACKBAR,
    payload: {
      id: 1,
    },
  };

  expect(
    reducer({
      snackbars: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
      ],
    }, action),
  ).toEqual({
    snackbars: [
      { id: 0 },
      { id: 2 },
    ],
  });
});

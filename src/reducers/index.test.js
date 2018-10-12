import reducer from './index';

test('initial state', () => {
  expect(
    reducer(undefined, {}),
  ).toEqual({
    ui: {
      drawerToggled: false,
      aboutDialogToggled: false,
      shareDialogToggled: false,
      snackbars: [],
    },
    game: {
      questions: {
        count: null,
        prev: [],
        next: [],
        current: null,
      },
    },
  });
});

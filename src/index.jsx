import 'regenerator-runtime/runtime';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader';

import theme from './theme';
import store from './store';
import App from './app';

const root = createRoot(document.getElementById('root'));

const render = (Component) => {
  root.render(
    <Component />,
  );
};

render(
  hot(module)(
    () => (
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    ),
  ),
);

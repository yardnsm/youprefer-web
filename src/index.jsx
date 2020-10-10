import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader';

import theme from './theme';
import store from './store';
import App from './app';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
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

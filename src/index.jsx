import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

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
      <Provider store={store}>
        <App />
      </Provider>
    ),
  ),
);

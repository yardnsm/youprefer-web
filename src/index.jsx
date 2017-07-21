import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { register as registerServiceWorker } from './registerServiceWorker';
import store from './store';
import App from './app';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);
registerServiceWorker();

// Support for HMR
if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}
